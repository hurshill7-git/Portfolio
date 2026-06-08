"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import type { Mesh } from "three";

/**
 * A slowly morphing, softly-lit form — the hero's immersive set-piece.
 * Animation is paused under prefers-reduced-motion (renders a static object).
 * This module is only ever loaded client-side via next/dynamic(ssr:false).
 */
function Blob({ animate }: { animate: boolean }) {
  const ref = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!animate || !ref.current) return;
    ref.current.rotation.y += delta * 0.18;
    ref.current.rotation.z += delta * 0.05;
  });

  return (
    <Float
      speed={animate ? 1.4 : 0}
      rotationIntensity={animate ? 0.4 : 0}
      floatIntensity={animate ? 0.8 : 0}
    >
      <mesh ref={ref} scale={2.2}>
        <icosahedronGeometry args={[1, 24]} />
        <MeshDistortMaterial
          color="#d9442a"
          emissive="#7a1f12"
          emissiveIntensity={0.25}
          roughness={0.25}
          metalness={0.15}
          distort={animate ? 0.38 : 0.28}
          speed={animate ? 1.6 : 0}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  const reduce = useReducedMotion();
  const animate = !reduce;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      frameloop={animate ? "always" : "demand"}
      aria-hidden="true"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-4, -2, -3]} intensity={0.6} color="#ffd9b3" />
      <Blob animate={animate} />
    </Canvas>
  );
}
