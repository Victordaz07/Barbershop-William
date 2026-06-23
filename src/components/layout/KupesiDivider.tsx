interface KupesiDividerProps {
  variant?: 'divider' | 'overlay';
  className?: string;
}

// Sand (#E8D5A3), kept as a literal here since CSS/SVG can't reference
// Tailwind's theme tokens directly — must stay in sync with `sand` in
// tailwind.config.js.
const SAND = '#E8D5A3';

// Tile of Pacific motif line-art (koru spiral, wave, fish hook, sun, tapa
// lattice) referencing Tongan ngatu/kupesi stencil iconography, used as a
// repeating background pattern in place of a plain geometric mesh.
const KUPESI_MOTIF_TILE = `
<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'>
  <g fill='none' stroke='${SAND}' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'>
    <path d='M20 18c-6 4-7 12-2 17s13 4 17-1-1-11-8-8 1 9 6 6'/>
    <path d='M62 16c5-7 10-7 15 0s10 7 15 0'/>
    <path d='M92 56c0-7-9-7-9 1v12c0 5 5 7 8 3'/>
    <circle cx='26' cy='66' r='6'/>
    <path d='M26 54v6M26 78v-6M14 66h6M38 66h-6M18 58l4 4M34 74l-4-4M18 74l4-4M34 58l-4 4'/>
    <rect x='58' y='80' width='22' height='22' rx='2'/>
    <path d='M58 91h22M69 80v22'/>
    <circle cx='63.5' cy='85.5' r='1.2' fill='${SAND}' stroke='none'/>
    <circle cx='74.5' cy='85.5' r='1.2' fill='${SAND}' stroke='none'/>
    <circle cx='63.5' cy='96.5' r='1.2' fill='${SAND}' stroke='none'/>
    <circle cx='74.5' cy='96.5' r='1.2' fill='${SAND}' stroke='none'/>
  </g>
</svg>`;

const KUPESI_PATTERN_OVERLAY = {
  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(KUPESI_MOTIF_TILE)}")`,
  backgroundSize: '120px 120px',
  backgroundRepeat: 'repeat',
};

// Crossed-diagonal stripe pattern for the thin section-divider strip — too
// short to render the motif tile legibly at that height.
const KUPESI_PATTERN_STRIP = {
  backgroundImage: [
    `repeating-linear-gradient(45deg, ${SAND} 0, ${SAND} 1px, transparent 1px, transparent 8px)`,
    `repeating-linear-gradient(-45deg, ${SAND} 0, ${SAND} 1px, transparent 1px, transparent 8px)`,
  ].join(', '),
};

export function KupesiDivider({ variant = 'divider', className = '' }: KupesiDividerProps) {
  if (variant === 'overlay') {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 opacity-[0.07] ${className}`}
        style={KUPESI_PATTERN_OVERLAY}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`h-3 w-full md:h-3.5 ${className}`}
      style={KUPESI_PATTERN_STRIP}
    />
  );
}
