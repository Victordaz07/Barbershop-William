import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { KupesiDivider } from '../layout/KupesiDivider';
import { BarberPoleIcon, GlobeIcon, StarIcon, WalkInIcon } from '../ui/icons';

const BADGES = [
  { Icon: GlobeIcon, key: 'badge1' },
  { Icon: WalkInIcon, key: 'badge2' },
  { Icon: StarIcon, key: 'badge3' },
] as const;

export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="top" className="relative overflow-hidden bg-bg">
      <div
        aria-hidden="true"
        className="absolute -top-1/3 left-1/2 h-[120%] w-[120%] -translate-x-1/2 bg-[radial-gradient(circle_at_30%_30%,rgba(0,163,154,0.25),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(255,107,92,0.2),transparent_55%)]"
      />
      <KupesiDivider variant="overlay" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:px-6 md:py-32">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <span className="inline-block rounded-full bg-teal/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-teal">
            {t('hero.kicker')}
          </span>
          <h1 className="mt-5 text-5xl text-cream md:text-7xl">{t('hero.title')}</h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{t('hero.subtitle')}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="text-lg" onClick={() => (window.location.hash = '#booking')}>
              {t('hero.cta')}
            </Button>
            <Button
              variant="secondary"
              className="text-lg"
              onClick={() => (window.location.hash = '#services')}
            >
              {t('hero.ctaSecondary')}
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-start">
            {BADGES.map(({ Icon, key }) => (
              <div key={key} className="flex items-center gap-2 text-sm font-semibold text-cream/80">
                <Icon className="h-5 w-5 text-coral" />
                {t(`hero.${key}`)}
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden items-center justify-center md:flex">
          <div
            aria-hidden="true"
            className="absolute h-72 w-72 rounded-full bg-gradient-to-br from-teal/30 via-coral/20 to-sand/20 blur-2xl"
          />
          <div className="relative flex h-80 w-80 items-center justify-center rounded-full border border-cream/10 bg-card/60 backdrop-blur">
            <BarberPoleIcon className="h-40 w-40 text-cream drop-shadow-lg" />
          </div>
        </div>
      </div>

      <KupesiDivider />
    </section>
  );
}
