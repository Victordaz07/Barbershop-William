import type { ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';

interface SectionHeadingProps {
  kicker?: string;
  title: ReactNode;
  subtitle?: ReactNode;
}

export function SectionHeading({ kicker, title, subtitle }: SectionHeadingProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      {kicker && (
        <span className="inline-block rounded-full bg-teal/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-teal">
          {kicker}
        </span>
      )}
      <h2 className="mt-4 text-4xl text-cream md:text-5xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-4 max-w-md text-muted">{subtitle}</p>}
    </div>
  );
}
