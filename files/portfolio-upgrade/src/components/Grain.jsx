export default function Grain() {
  return (
    <div className="fixed inset-0 z-[9997] pointer-events-none mix-blend-overlay opacity-[0.06]">
      <svg width="100%" height="100%">
        <filter id="grainFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainFilter)" className="grain-anim" />
      </svg>
      {/* soft vignette to focus the eye toward center content */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)'
      }} />
    </div>
  );
}
