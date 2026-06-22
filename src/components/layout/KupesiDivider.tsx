interface KupesiDividerProps {
  variant?: 'divider' | 'overlay';
  className?: string;
}

// Sand (#E8D5A3) crossed-diagonal stripe pattern, referencing tapa/ngatu cloth
// geometry. Kept as a literal here since CSS gradients can't reference
// Tailwind's theme tokens directly — must stay in sync with `sand` in
// tailwind.config.js.
const KUPESI_PATTERN = {
  backgroundImage: [
    'repeating-linear-gradient(45deg, #E8D5A3 0, #E8D5A3 1px, transparent 1px, transparent 8px)',
    'repeating-linear-gradient(-45deg, #E8D5A3 0, #E8D5A3 1px, transparent 1px, transparent 8px)',
  ].join(', '),
};

export function KupesiDivider({ variant = 'divider', className = '' }: KupesiDividerProps) {
  if (variant === 'overlay') {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 opacity-[0.04] ${className}`}
        style={KUPESI_PATTERN}
      />
    );
  }

  return (
    <div aria-hidden="true" className={`h-3 w-full md:h-3.5 ${className}`} style={KUPESI_PATTERN} />
  );
}
