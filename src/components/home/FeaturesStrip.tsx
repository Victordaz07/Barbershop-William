import { useTranslation } from 'react-i18next';
import { useInView } from '../../hooks/useInView';
import { CalendarIcon, GlobeIcon, StarIcon, WalkInIcon } from '../ui/icons';

const FEATURES = [
  { Icon: GlobeIcon, titleKey: 'f1Title', descKey: 'f1Desc' },
  { Icon: CalendarIcon, titleKey: 'f2Title', descKey: 'f2Desc' },
  { Icon: WalkInIcon, titleKey: 'f3Title', descKey: 'f3Desc' },
  { Icon: StarIcon, titleKey: 'f4Title', descKey: 'f4Desc' },
] as const;

function FeatureCard({
  Icon,
  titleKey,
  descKey,
  index,
}: (typeof FEATURES)[number] & { index: number }) {
  const { t } = useTranslation();
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`rounded-2xl bg-card p-6 text-center transition-all duration-700 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal/20 to-coral/20">
        <Icon className="h-7 w-7 text-coral" />
      </div>
      <h3 className="mt-4 text-base text-cream">{t(`features.${titleKey}`)}</h3>
      <p className="mt-2 text-sm text-muted">{t(`features.${descKey}`)}</p>
    </div>
  );
}

export function FeaturesStrip() {
  return (
    <section className="bg-bg py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.titleKey} index={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
