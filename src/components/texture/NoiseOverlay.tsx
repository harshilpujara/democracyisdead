/**
 * Full-viewport film-grain wash. Fixed, pointer-events: none, blended over
 * everything so the whole page — not just images — carries texture.
 */
export function NoiseOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="noise-overlay"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="3"
          stitchTiles="stitch"
          result="noise"
        />
        <feColorMatrix
          in="noise"
          type="matrix"
          values="0 0 0 0 0.93  0 0 0 0 0.90  0 0 0 0 0.84  0 0 0 0.9 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}
