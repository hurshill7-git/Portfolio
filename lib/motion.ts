/** Shared easing tuples (typed so Motion accepts them as bezier curves). */
export const EASE_OUT_EXPO: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

/**
 * Primary reveal/scroll-system easing: clean, professional, no bounce.
 * cubic-bezier(0.22, 1, 0.36, 1) — "ease-out-quint".
 */
export const EASE_REVEAL: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

/** Stagger interval between sibling reveals (wave-like progression). */
export const STAGGER = 0.1; // 100ms
