/**
 * Shared SVG filter primitives referenced by CSS `filter: url(#id)` — a
 * single hidden defs block so every ragged-edge headline reuses the same
 * displacement math instead of re-declaring it.
 */
export function GrungeFilterDefs() {
  return (
    <svg aria-hidden="true" className="grunge-filter-defs">
      <defs>
        <filter id="inky-edge-hero" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.012 0.045"
            numOctaves="2"
            seed="7"
            result="warp"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="inky-edge" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.02 0.09"
            numOctaves="2"
            seed="3"
            result="warp"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
