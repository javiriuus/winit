// SVG filter used by the big display titles: solid letters whose edges are
// roughened by fine noise (grain) and softened, with a faint bloom around them,
// like type photographed through a diffusion filter.
export default function FilmicDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id="filmic" x="-5%" y="-25%" width="110%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="grainy" />
          <feGaussianBlur in="grainy" stdDeviation="0.6" result="soft" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="bloomWide" />
          <feColorMatrix in="bloomWide" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.22 0" result="bloom" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="haloTight" />
          <feColorMatrix in="haloTight" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.35 0" result="halo" />
          <feMerge>
            <feMergeNode in="bloom" />
            <feMergeNode in="halo" />
            <feMergeNode in="soft" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
