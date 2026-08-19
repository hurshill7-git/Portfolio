"use client";

// Particle Sphere — Originkit, ported from a Framer component to plain
// Three.js + Next.js: dropped the `RenderTarget`/canvas-preview branch (dead
// in a Next.js runtime — it only ever ran inside Framer's editor canvas) and
// the square/"cube" particle branch (unreachable — shape is hardcoded to
// "sphere" below, so that path could never execute). Added `onReady` (to
// match the cross-fade this replaces in Hero.tsx) and prefers-reduced-motion
// handling (auto-rotation, drag-throw, and cursor/click interaction all
// disabled — mirrors how CustomCursor/MouseEffects behave elsewhere on this
// site: settle to a static frame rather than a slowed one).

import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  InstancedBufferAttribute,
  SphereGeometry,
  MeshBasicMaterial,
  InstancedMesh,
  Matrix4,
  Group,
  Vector3,
  AdditiveBlending,
} from "three";

interface ParticleSphereProps {
  particlesCount?: number;
  particleScale?: number;
  speed?: number;
  smoothing?: number;
  scale?: number;
  stopOnHover?: boolean;
  rotationDirection?: "clockwise" | "anticlockwise";
  dragSpeed?: number;
  drag?: boolean;
  cursorOn?: boolean;
  cursorRadiusUI?: number;
  cursorStrengthUI?: number;
  clickForce?: number;
  sphereColor?: string;
  style?: CSSProperties;
  onReady?: () => void;
}

// CSS variable token and color parsing (hex/rgba/var())
const cssVariableRegex =
  /var\s*\(\s*(--[\w-]+)(?:\s*,\s*((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*))?\s*\)/;

function extractDefaultValue(cssVar: string): string {
  if (!cssVar || !cssVar.startsWith("var(")) return cssVar;
  const match = cssVariableRegex.exec(cssVar);
  if (!match) return cssVar;
  const fallback = (match[2] || "").trim();
  if (fallback.startsWith("var(")) return extractDefaultValue(fallback);
  return fallback || cssVar;
}

function resolveTokenColor(input: unknown): string | undefined {
  if (typeof input !== "string") return input as undefined;
  if (!input.startsWith("var(")) return input;
  return extractDefaultValue(input);
}

// Parse color string to RGBA values (0-1 range)
function parseColorToRgba(input: string | undefined): {
  r: number;
  g: number;
  b: number;
  a: number;
} {
  if (!input || input.trim() === "") return { r: 0, g: 0, b: 0, a: 0 };
  const str = input.trim();

  const rgbaMatch = str.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/i
  );
  if (rgbaMatch) {
    const r = Math.max(0, Math.min(255, parseFloat(rgbaMatch[1]))) / 255;
    const g = Math.max(0, Math.min(255, parseFloat(rgbaMatch[2]))) / 255;
    const b = Math.max(0, Math.min(255, parseFloat(rgbaMatch[3]))) / 255;
    const a =
      rgbaMatch[4] !== undefined
        ? Math.max(0, Math.min(1, parseFloat(rgbaMatch[4])))
        : 1;
    return { r, g, b, a };
  }

  const hex = str.replace(/^#/, "");
  if (hex.length === 8) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: parseInt(hex.slice(6, 8), 16) / 255,
    };
  }
  if (hex.length === 6) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: 1,
    };
  }
  if (hex.length === 4) {
    return {
      r: parseInt(hex[0] + hex[0], 16) / 255,
      g: parseInt(hex[1] + hex[1], 16) / 255,
      b: parseInt(hex[2] + hex[2], 16) / 255,
      a: parseInt(hex[3] + hex[3], 16) / 255,
    };
  }
  if (hex.length === 3) {
    return {
      r: parseInt(hex[0] + hex[0], 16) / 255,
      g: parseInt(hex[1] + hex[1], 16) / 255,
      b: parseInt(hex[2] + hex[2], 16) / 255,
      a: 1,
    };
  }
  return { r: 0, g: 0, b: 0, a: 1 };
}

function mapLinear(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  if (inMax === inMin) return outMin;
  const t = (value - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
}

// Speed: UI [0.1..1] → internal [0.01..0.05] (rotation speed multiplier)
function mapSpeedUiToInternal(ui: number): number {
  return mapLinear(ui, 0.1, 1.0, 0.01, 0.05);
}

// Scale: UI [0..1] → scale multiplier [0.25..1.25] (overall sphere size multiplier)
function mapScaleUiToMultiplier(ui: number): number {
  const clamped = Math.max(0, Math.min(1, ui));
  return mapLinear(clamped, 0, 1.0, 0.25, 1.25);
}

// Particle size: UI [0.1..1] → size [0.01..0.1] (individual particle size)
function mapParticleSizeUiToInternal(ui: number): number {
  const clamped = Math.max(0.1, Math.min(1, ui));
  return mapLinear(clamped, 0.1, 1.0, 0.01, 0.1);
}

// Cursor strength: UI [0..1] → force multiplier [0..15]
function mapCursorStrengthUiToMultiplier(ui: number): number {
  const clamped = Math.max(0, Math.min(1, ui));
  return mapLinear(clamped, 0, 1.0, 0, 15);
}

const CURSOR_PHYSICS = {
  RETURN_FORCE: 0.015, // Balanced for smooth return after click scatter
  FRICTION: 0.94, // Slightly higher friction for smoother decay
} as const;

const CANVAS_OVERFLOW = 2.5; // canvas is rendered larger than the container to avoid clipping during rotation

export default function ParticleSphere({
  particlesCount = 10000,
  speed: speedProp = 20,
  smoothing = 7,
  scale = 10,
  stopOnHover = false,
  rotationDirection = "clockwise",
  dragSpeed = 5,
  drag: dragProp = true,
  particleScale = 4,
  cursorOn: cursorOnProp = true,
  cursorRadiusUI = 75,
  cursorStrengthUI = 10,
  clickForce = 5,
  sphereColor = "#ffffff",
  style,
  onReady,
}: ParticleSphereProps) {
  const reduceMotion = useReducedMotion();
  // Reduced motion: no auto-rotation, no drag/throw, no cursor or click
  // reaction — settles to a single static frame instead of a slowed one.
  const speed = reduceMotion ? 0 : speedProp;
  const drag = reduceMotion ? false : dragProp;
  const cursorOn = reduceMotion ? false : cursorOnProp;

  const cursorConfig = {
    enabled: cursorOn,
    radius: cursorRadiusUI,
    strength: cursorStrengthUI,
    clickForce,
  };

  // Whole-number sliders (1–10 etc.) → the engine's internal 0–1 ranges.
  const speedN = speed / 10;
  const smoothingN = smoothing / 10;
  const scaleN = scale / 10;
  const dragN = dragSpeed / 10;
  const sizeN = particleScale / 10;
  const strengthN = cursorConfig.strength / 10;

  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sceneRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cameraRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rendererRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const particlesRef = useRef<any>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const baseParticlePositionsRef = useRef<Vector3[]>([]);
  const particleDisplacementsRef = useRef<Vector3[]>([]);
  const particleScatterVelocitiesRef = useRef<Vector3[]>([]);
  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  const rotationSpeed = useMemo(() => {
    const baseSpeed = mapSpeedUiToInternal(speedN);
    return rotationDirection === "anticlockwise" ? -baseSpeed : baseSpeed;
  }, [speedN, rotationDirection]);

  const scaleMultiplier = useMemo(
    () => mapScaleUiToMultiplier(scaleN),
    [scaleN]
  );
  const particleSize = useMemo(
    () => mapParticleSizeUiToInternal(sizeN),
    [sizeN]
  );
  const cursorRadius = useMemo(
    () => Math.max(0, Math.min(600, cursorConfig.radius)),
    [cursorConfig.radius]
  );
  const cursorStrength = useMemo(
    () => mapCursorStrengthUiToMultiplier(strengthN),
    [strengthN]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth =
      container.clientWidth || container.offsetWidth || 400;
    const containerHeight =
      container.clientHeight || container.offsetHeight || 400;

    const canvasWidth = containerWidth * CANVAS_OVERFLOW;
    const canvasHeight = containerHeight * CANVAS_OVERFLOW;

    const scene = new Scene();
    sceneRef.current = scene;

    // Wider FOV to compensate for the oversized canvas, so the sphere reads
    // at the same apparent size as it would on an exact-fit canvas.
    const baseFOV = 50;
    const adjustedFOV =
      2 *
      Math.atan(Math.tan((baseFOV * Math.PI) / 180 / 2) * CANVAS_OVERFLOW) *
      (180 / Math.PI);

    const camera = new PerspectiveCamera(
      adjustedFOV,
      canvasWidth / canvasHeight,
      0.1,
      1000
    );
    const baseCameraDistance = 3.0;
    const currentSphereRadius = 1.0 * scaleMultiplier;
    const cameraDistance = Math.max(
      baseCameraDistance,
      currentSphereRadius + 1.0
    );
    camera.position.z = cameraDistance;
    cameraRef.current = camera;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = "srgb";
    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    const offsetX = (canvasWidth - containerWidth) / 2;
    const offsetY = (canvasHeight - containerHeight) / 2;
    canvas.style.left = `-${offsetX}px`;
    canvas.style.top = `-${offsetY}px`;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    canvas.style.display = "block";
    container.appendChild(canvas);
    rendererRef.current = renderer;

    // Fibonacci sphere distribution for even spacing on the sphere surface.
    const vertices: number[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const sphereRadius = 1.0 * scaleMultiplier;

    baseParticlePositionsRef.current = [];
    particleDisplacementsRef.current = [];
    particleScatterVelocitiesRef.current = [];

    const resolvedSphereColor = resolveTokenColor(sphereColor);
    const sphereRgba = parseColorToRgba(resolvedSphereColor || sphereColor);
    const baseColorObj = resolvedSphereColor
      ? new Color(resolvedSphereColor)
      : new Color(sphereRgba.r, sphereRgba.g, sphereRgba.b);
    const particleOpacity = sphereRgba.a;

    for (let i = 0; i < particlesCount; i++) {
      const y = 1 - (i / (particlesCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      const posX = x * sphereRadius;
      const posY = y * sphereRadius;
      const posZ = z * sphereRadius;
      vertices.push(posX, posY, posZ);

      baseParticlePositionsRef.current.push(new Vector3(posX, posY, posZ));
      particleDisplacementsRef.current.push(new Vector3(0, 0, 0));
      particleScatterVelocitiesRef.current.push(new Vector3(0, 0, 0));
    }

    // Round particles via InstancedMesh (one draw call for all instances).
    const instanceRadius = particleSize * 0.15;
    const sphereGeometry = new SphereGeometry(instanceRadius, 8, 8);
    const sphereMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      blending: AdditiveBlending,
      transparent: particleOpacity < 1,
      opacity: particleOpacity,
    });

    const particles = new InstancedMesh(
      sphereGeometry,
      sphereMaterial,
      particlesCount
    );

    const matrix = new Matrix4();
    for (let i = 0; i < particlesCount; i++) {
      const idx = i * 3;
      matrix.setPosition(vertices[idx], vertices[idx + 1], vertices[idx + 2]);
      particles.setMatrixAt(i, matrix);
    }
    particles.instanceMatrix.needsUpdate = true;

    const instanceColors = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const idx = i * 3;
      instanceColors[idx] = baseColorObj.r;
      instanceColors[idx + 1] = baseColorObj.g;
      instanceColors[idx + 2] = baseColorObj.b;
    }
    particles.instanceColor = new InstancedBufferAttribute(instanceColors, 3);
    particles.instanceColor.needsUpdate = true;

    particlesRef.current = particles;

    const particlesGroup = new Group();
    particlesGroup.add(particles);
    scene.add(particlesGroup);

    const rotation = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    let isDragging = false;
    let isHovering = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let lastDragTime = 0;
    let animationFrameId: number | null = null;

    let lastFrameTime = performance.now();
    const targetDeltaTime = 1000 / 60;

    const lerpFactor =
      smoothingN === 0 ? 1 : mapLinear(smoothingN, 0, 1, 0.4, 0.03);
    const velocityDecay = mapLinear(smoothingN, 0, 1, 0.7, 0.96);

    const animateCore = () => {
      const now = performance.now();
      const deltaTime = now - lastFrameTime;
      lastFrameTime = now;
      const deltaFactor = deltaTime / targetDeltaTime;

      const threshold = 0.01;

      if (
        !isDragging &&
        rotationSpeed !== 0 &&
        (!stopOnHover || !isHovering)
      ) {
        targetRotation.x += rotationSpeed * 0.1 * deltaFactor;
      }

      if (!isDragging && smoothingN > 0) {
        if (
          Math.abs(velocity.x) > threshold ||
          Math.abs(velocity.y) > threshold
        ) {
          targetRotation.x += velocity.x * deltaFactor;
          targetRotation.y += velocity.y * deltaFactor;
          targetRotation.y = Math.max(
            -Math.PI / 2,
            Math.min(Math.PI / 2, targetRotation.y)
          );
          const decayFactor = Math.pow(velocityDecay, deltaFactor);
          velocity.x *= decayFactor;
          velocity.y *= decayFactor;
        } else {
          velocity.x = 0;
          velocity.y = 0;
        }
      }

      const dx = targetRotation.x - rotation.x;
      const dy = targetRotation.y - rotation.y;

      if (
        Math.abs(dx) > threshold ||
        Math.abs(dy) > threshold ||
        rotationSpeed !== 0 ||
        isDragging
      ) {
        const timeLerpFactor = 1 - Math.pow(1 - lerpFactor, deltaFactor);
        rotation.x += dx * timeLerpFactor;
        rotation.y += dy * timeLerpFactor;
        rotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.y));
      }

      particlesGroup.rotation.y = rotation.x;
      particlesGroup.rotation.x = rotation.y;
      particlesGroup.updateMatrixWorld(true);

      const currentContainerWidth = containerRef.current?.clientWidth || 400;
      const currentContainerHeight =
        containerRef.current?.clientHeight || 400;
      const currentCanvasWidth = currentContainerWidth * CANVAS_OVERFLOW;
      const currentCanvasHeight = currentContainerHeight * CANVAS_OVERFLOW;
      const currentCamera = cameraRef.current;
      const cursorRadiusSquared = cursorRadius * cursorRadius;

      if (cursorConfig.enabled && baseParticlePositionsRef.current.length > 0) {
        for (let i = 0; i < baseParticlePositionsRef.current.length; i++) {
          const basePos = baseParticlePositionsRef.current[i];
          const displacement = particleDisplacementsRef.current[i];

          if (mouseRef.current) {
            const mouse = mouseRef.current;

            const currentLocalPos = new Vector3();
            currentLocalPos.copy(basePos);
            currentLocalPos.add(displacement);

            const worldPos = new Vector3();
            worldPos.copy(currentLocalPos);
            worldPos.applyMatrix4(particlesGroup.matrixWorld);

            const projected = worldPos.clone().project(currentCamera);
            const screenX = (projected.x * 0.5 + 0.5) * currentCanvasWidth;
            const screenY = (-projected.y * 0.5 + 0.5) * currentCanvasHeight;

            const ddx = mouse.x - screenX;
            const ddy = mouse.y - screenY;
            const distanceSquared = ddx * ddx + ddy * ddy;

            // Only the front layer (facing the camera) reacts — the back
            // layer keeps rotating untouched.
            if (
              distanceSquared < cursorRadiusSquared &&
              distanceSquared > 0 &&
              worldPos.z > 0
            ) {
              const distance = Math.sqrt(distanceSquared);
              const force = (cursorRadius - distance) / cursorRadius;
              const angle = Math.atan2(ddy, ddx);

              const cameraRight = new Vector3();
              const cameraUp = new Vector3();
              cameraRight
                .setFromMatrixColumn(currentCamera.matrixWorld, 0)
                .normalize();
              cameraUp
                .setFromMatrixColumn(currentCamera.matrixWorld, 1)
                .normalize();

              const repulsion2D = force * cursorStrength * speedN * deltaFactor;
              const repulsionX = -Math.cos(angle) * repulsion2D * 0.01;
              const repulsionY = Math.sin(angle) * repulsion2D * 0.01;

              const worldRepulsion = new Vector3();
              worldRepulsion.addScaledVector(cameraRight, repulsionX);
              worldRepulsion.addScaledVector(cameraUp, repulsionY);

              const localRepulsion = new Vector3();
              localRepulsion.copy(worldRepulsion);
              const inverseGroupMatrix = new Matrix4();
              inverseGroupMatrix.copy(particlesGroup.matrixWorld).invert();
              localRepulsion.applyMatrix4(inverseGroupMatrix);

              displacement.add(localRepulsion);
            }
          }

          const frictionFactor = Math.pow(CURSOR_PHYSICS.FRICTION, deltaFactor);
          const returnForce =
            CURSOR_PHYSICS.RETURN_FORCE * speedN * deltaFactor;
          displacement.multiplyScalar(frictionFactor);
          displacement.multiplyScalar(1 - returnForce);
        }
      }

      if (particleScatterVelocitiesRef.current.length > 0) {
        for (let i = 0; i < particleScatterVelocitiesRef.current.length; i++) {
          const scatterVelocity = particleScatterVelocitiesRef.current[i];
          const displacement = particleDisplacementsRef.current[i];

          displacement.addScaledVector(scatterVelocity, deltaFactor * 0.1);

          const scatterFriction = Math.pow(0.95, deltaFactor);
          scatterVelocity.multiplyScalar(scatterFriction);

          const scatterReturnForce =
            CURSOR_PHYSICS.RETURN_FORCE * speedN * deltaFactor;
          scatterVelocity.multiplyScalar(1 - scatterReturnForce);
        }
      }

      // Update instance positions (always, so displacement/scatter settle
      // back to rest even after the cursor leaves).
      const updateMatrix = new Matrix4();
      for (let i = 0; i < baseParticlePositionsRef.current.length; i++) {
        const basePos = baseParticlePositionsRef.current[i];
        const displacement = particleDisplacementsRef.current[i];
        const finalPos = new Vector3();
        finalPos.copy(basePos);
        finalPos.add(displacement);
        updateMatrix.setPosition(finalPos.x, finalPos.y, finalPos.z);
        particlesRef.current.setMatrixAt(i, updateMatrix);
      }
      particlesRef.current.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);

      const hasVelocity =
        Math.abs(velocity.x) > threshold || Math.abs(velocity.y) > threshold;
      const hasLerpDelta = Math.abs(dx) > threshold || Math.abs(dy) > threshold;
      const hasCursorInteraction =
        cursorConfig.enabled &&
        particleDisplacementsRef.current.some(
          (disp) =>
            Math.abs(disp.x) > threshold ||
            Math.abs(disp.y) > threshold ||
            Math.abs(disp.z) > threshold
        );
      const needsContinue =
        isDragging ||
        rotationSpeed !== 0 ||
        hasVelocity ||
        hasLerpDelta ||
        hasCursorInteraction;

      if (needsContinue) {
        animationFrameId = requestAnimationFrame(animateCore);
      } else {
        animationFrameId = null;
      }
    };

    const startAnimation = () => {
      if (animationFrameId === null) {
        lastFrameTime = performance.now();
        animationFrameId = requestAnimationFrame(animateCore);
      }
    };

    startAnimation();
    onReadyRef.current?.();

    const handleMouseDown = (event: MouseEvent) => {
      if (!drag) return;
      isDragging = true;
      velocity.x = 0;
      velocity.y = 0;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
      lastDragTime = performance.now();
      startAnimation();

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const currentTime = performance.now();
        const timeSinceLastMove = currentTime - lastDragTime;

        const sensitivity = mapLinear(dragN, 0, 1, 0.001, 0.02);
        const ddx = moveEvent.clientX - lastMouseX;
        const ddy = moveEvent.clientY - lastMouseY;

        targetRotation.x += ddx * sensitivity;
        targetRotation.y += ddy * sensitivity;
        targetRotation.y = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, targetRotation.y)
        );

        if (timeSinceLastMove > 0) {
          const timeNormalization = targetDeltaTime / timeSinceLastMove;
          velocity.x = ddx * sensitivity * 0.3 * timeNormalization;
          velocity.y = ddy * sensitivity * 0.3 * timeNormalization;
        }

        lastMouseX = moveEvent.clientX;
        lastMouseY = moveEvent.clientY;
        lastDragTime = currentTime;
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        isDragging = false;
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    if (drag) {
      canvas.addEventListener("mousedown", handleMouseDown);
    }

    const handleMouseMoveHover = (event: MouseEvent) => {
      if (!stopOnHover) return
      const containerRect = container.getBoundingClientRect();
      const mouseX = event.clientX - containerRect.left;
      const mouseY = event.clientY - containerRect.top;
      isHovering =
        mouseX >= 0 &&
        mouseX <= containerRect.width &&
        mouseY >= 0 &&
        mouseY <= containerRect.height;
    };

    if (stopOnHover) {
      canvas.addEventListener("mousemove", handleMouseMoveHover);
    }

    const handleMouseMoveCursor = (event: MouseEvent) => {
      const containerRect = container.getBoundingClientRect();
      const mouseXInContainer = event.clientX - containerRect.left;
      const mouseYInContainer = event.clientY - containerRect.top;
      if (
        mouseXInContainer >= 0 &&
        mouseXInContainer <= containerRect.width &&
        mouseYInContainer >= 0 &&
        mouseYInContainer <= containerRect.height
      ) {
        mouseRef.current = {
          x: mouseXInContainer + offsetX,
          y: mouseYInContainer + offsetY,
        };
        startAnimation();
      } else {
        mouseRef.current = null;
      }
    };

    const handleMouseLeaveCursor = () => {
      mouseRef.current = null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const containerRect = container.getBoundingClientRect();
      const touch = event.touches[0];
      if (touch) {
        const touchXInContainer = touch.clientX - containerRect.left;
        const touchYInContainer = touch.clientY - containerRect.top;
        if (
          touchXInContainer >= 0 &&
          touchXInContainer <= containerRect.width &&
          touchYInContainer >= 0 &&
          touchYInContainer <= containerRect.height
        ) {
          mouseRef.current = {
            x: touchXInContainer + offsetX,
            y: touchYInContainer + offsetY,
          };
          startAnimation();
        } else {
          mouseRef.current = null;
        }
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current = null;
    };

    // Radial scatter shared by click and touch-start — pushes particles
    // within `cursorRadius` screen-pixels of the point outward in 3D, along
    // the ray from an estimated world-space hit point through each particle.
    const scatterAt = (
      pointerX: number,
      pointerY: number,
      canvasW: number,
      canvasH: number
    ) => {
      const currentCamera = cameraRef.current;
      const cursorRadiusSquared = cursorRadius * cursorRadius;
      const force = cursorConfig.clickForce || 10;

      const ndcX = (pointerX / canvasW) * 2 - 1;
      const ndcY = 1 - (pointerY / canvasH) * 2;

      const ray = new Vector3(ndcX, ndcY, 0.5);
      ray.unproject(currentCamera);

      const cameraWorldPos = new Vector3();
      cameraWorldPos.setFromMatrixPosition(currentCamera.matrixWorld);

      const direction = new Vector3();
      direction.subVectors(ray, cameraWorldPos).normalize();

      const sphereCenter = new Vector3(0, 0, 0);
      const cameraToCenter = new Vector3();
      cameraToCenter.subVectors(sphereCenter, cameraWorldPos);
      const sphereDistance = cameraToCenter.length();
      const pointerWorldPos = new Vector3();
      pointerWorldPos.copy(cameraWorldPos);
      pointerWorldPos.addScaledVector(direction, sphereDistance);

      for (let i = 0; i < baseParticlePositionsRef.current.length; i++) {
        const basePos = baseParticlePositionsRef.current[i];
        const displacement = particleDisplacementsRef.current[i];
        const scatterVelocity = particleScatterVelocitiesRef.current[i];

        const currentLocalPos = new Vector3();
        currentLocalPos.copy(basePos);
        currentLocalPos.add(displacement);

        const worldPos = new Vector3();
        worldPos.copy(currentLocalPos);
        worldPos.applyMatrix4(particlesGroup.matrixWorld);

        const projected = worldPos.clone().project(currentCamera);
        const screenX = (projected.x * 0.5 + 0.5) * canvasW;
        const screenY = (-projected.y * 0.5 + 0.5) * canvasH;

        const ddx = pointerX - screenX;
        const ddy = pointerY - screenY;
        const distanceSquared = ddx * ddx + ddy * ddy;

        if (distanceSquared < cursorRadiusSquared && distanceSquared > 0) {
          const screenDistance = Math.sqrt(distanceSquared);
          const scatterForce =
            ((cursorRadius - screenDistance) / cursorRadius) * force;

          const radialDirection = new Vector3();
          radialDirection.subVectors(worldPos, pointerWorldPos);
          const radialDistance = radialDirection.length();

          if (radialDistance > 0.001) {
            radialDirection.normalize();

            const scatterMagnitude = scatterForce * 0.5;
            const worldScatter = new Vector3();
            worldScatter.copy(radialDirection);
            worldScatter.multiplyScalar(scatterMagnitude);

            const localScatter = new Vector3();
            localScatter.copy(worldScatter);
            const inverseGroupMatrix = new Matrix4();
            inverseGroupMatrix.copy(particlesGroup.matrixWorld).invert();
            localScatter.applyMatrix4(inverseGroupMatrix);

            scatterVelocity.add(localScatter);
          }
        }
      }

      startAnimation();
    };

    const handleClick = (event: MouseEvent) => {
      if (!cursorConfig.enabled || !cursorConfig.clickForce) return;
      particlesGroup.updateMatrixWorld(true);

      const containerRect = container.getBoundingClientRect();
      const clickX = event.clientX - containerRect.left + offsetX;
      const clickY = event.clientY - containerRect.top + offsetY;
      const clickContainerWidth = containerRef.current?.clientWidth || 400;
      const clickContainerHeight = containerRef.current?.clientHeight || 400;
      scatterAt(
        clickX,
        clickY,
        clickContainerWidth * CANVAS_OVERFLOW,
        clickContainerHeight * CANVAS_OVERFLOW
      );
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (!cursorConfig.enabled || !cursorConfig.clickForce) return;
      event.preventDefault();
      particlesGroup.updateMatrixWorld(true);

      const containerRect = container.getBoundingClientRect();
      const touch = event.touches[0];
      if (!touch) return;

      const touchX = touch.clientX - containerRect.left + offsetX;
      const touchY = touch.clientY - containerRect.top + offsetY;
      const touchContainerWidth = containerRef.current?.clientWidth || 400;
      const touchContainerHeight = containerRef.current?.clientHeight || 400;
      scatterAt(
        touchX,
        touchY,
        touchContainerWidth * CANVAS_OVERFLOW,
        touchContainerHeight * CANVAS_OVERFLOW
      );
    };

    if (cursorConfig.enabled) {
      canvas.addEventListener("mousemove", handleMouseMoveCursor);
      canvas.addEventListener("mouseleave", handleMouseLeaveCursor);
      canvas.addEventListener("click", handleClick);
      canvas.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      canvas.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      canvas.addEventListener("touchend", handleTouchEnd);
      canvas.addEventListener("touchcancel", handleTouchEnd);
    }

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current)
        return;

      const newWidth =
        containerRef.current.clientWidth ||
        containerRef.current.offsetWidth ||
        400;
      const newHeight =
        containerRef.current.clientHeight ||
        containerRef.current.offsetHeight ||
        400;

      const newCanvasWidth = newWidth * CANVAS_OVERFLOW;
      const newCanvasHeight = newHeight * CANVAS_OVERFLOW;
      const newOffsetX = (newCanvasWidth - newWidth) / 2;
      const newOffsetY = (newCanvasHeight - newHeight) / 2;

      cameraRef.current.aspect = newCanvasWidth / newCanvasHeight;
      cameraRef.current.updateProjectionMatrix();

      const baseCameraDistance = 3.0;
      const currentSphereRadius = 1.0 * scaleMultiplier;
      cameraRef.current.position.z = Math.max(
        baseCameraDistance,
        currentSphereRadius + 1.0
      );

      rendererRef.current.setSize(newCanvasWidth, newCanvasHeight);
      const canvasEl = rendererRef.current.domElement;
      canvasEl.style.left = `-${newOffsetX}px`;
      canvasEl.style.top = `-${newOffsetY}px`;
      canvasEl.style.width = `${newCanvasWidth}px`;
      canvasEl.style.height = `${newCanvasHeight}px`;

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (drag) {
        canvas.removeEventListener("mousedown", handleMouseDown);
      }
      if (stopOnHover) {
        canvas.removeEventListener("mousemove", handleMouseMoveHover);
      }
      if (cursorConfig.enabled) {
        canvas.removeEventListener("mousemove", handleMouseMoveCursor);
        canvas.removeEventListener("mouseleave", handleMouseLeaveCursor);
        canvas.removeEventListener("click", handleClick);
        canvas.removeEventListener("touchmove", handleTouchMove);
        canvas.removeEventListener("touchstart", handleTouchStart);
        canvas.removeEventListener("touchend", handleTouchEnd);
        canvas.removeEventListener("touchcancel", handleTouchEnd);
      }
      renderer.dispose();
      // Use canvas.parentNode directly, not containerRef.current — under
      // React's dev-mode double-invoke (mount → cleanup → mount), the ref
      // callback already nulls containerRef.current before this cleanup
      // runs, which silently skipped removal and left a stale canvas behind
      // for the remount to stack a second one on top of.
      canvas.parentNode?.removeChild(canvas);
      sphereGeometry.dispose();
      sphereMaterial.dispose();
    };
  }, [
    particlesCount,
    speed,
    smoothing,
    scale,
    stopOnHover,
    rotationDirection,
    dragSpeed,
    drag,
    particleScale,
    cursorOn,
    clickForce,
    cursorRadius,
    cursorStrength,
    sphereColor,
    rotationSpeed,
    scaleMultiplier,
    particleSize,
    speedN,
    smoothingN,
    dragN,
    cursorConfig.clickForce,
    cursorConfig.enabled,
  ]);

  const containerStyle: CSSProperties = {
    ...style,
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    // The hero mounts this inside a `pointer-events-none` backdrop layer (so
    // the decorative wrapper never blocks clicks) — reassert `auto` here so
    // the canvas itself still receives the drag/cursor/click input it's
    // built around; pointer-events isn't reset by an ancestor's value, only
    // inherited, so this override is scoped to this component's own subtree.
    pointerEvents: "auto",
  };

  return (
    <div style={containerStyle} aria-hidden="true">
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "visible",
        }}
      />
    </div>
  );
}
