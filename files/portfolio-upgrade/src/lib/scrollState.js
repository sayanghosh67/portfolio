// A tiny mutable store shared between Lenis/GSAP (writers) and the
// Three.js canvas (reader, inside useFrame). Deliberately NOT React state —
// updating this 60x/sec through setState would nuke performance.

export const scrollState = {
  progress: 0,   // 0 -> 1 across the whole page
  velocity: 0,   // signed scroll speed, used for motion-blur / skew feel
};

export const mouseState = {
  x: 0,          // -1 -> 1 (normalized, center = 0)
  y: 0,          // -1 -> 1
  targetX: 0,
  targetY: 0,
};

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mouseState.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseState.targetY = (e.clientY / window.innerHeight) * 2 - 1;
  });
}
