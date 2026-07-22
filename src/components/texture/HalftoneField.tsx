/**
 * Original, CSS/SVG-generated halftone dot field — stands in for the globe
 * graphic until phase 2 wires up the real render, and doubles as the
 * "imagery gets a halftone treatment" texture the brief asks for.
 */
export function HalftoneField({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`halftone-field ${className}`.trim()}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="halftone-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="3.4" className="halftone-field__dot" />
        </pattern>
        <radialGradient id="halftone-fade" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="70%" stopColor="white" stopOpacity="0.55" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="halftone-mask">
          <rect width="400" height="400" fill="url(#halftone-fade)" />
        </mask>
      </defs>
      <rect
        width="400"
        height="400"
        fill="url(#halftone-dots)"
        mask="url(#halftone-mask)"
      />
    </svg>
  );
}
