import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { KupesiDivider } from '../layout/KupesiDivider';
import { CalendarIcon, GlobeIcon, StarIcon, WalkInIcon } from '../ui/icons';
import logoLight from '../../assets/logo-light.png';
import heroBg from '../../assets/hero-bg.jpg';

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
        className="absolute inset-0 bg-cover bg-[position:75%_center]"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/20 md:to-bg/5"
      />
      <KupesiDivider variant="overlay" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-32">
        <div className="flex max-w-2xl flex-col items-center text-center md:items-start md:text-left">
          <img src={logoLight} alt="Barbershop Vehikité" className="h-16 md:h-20" />

          <span className="mt-8 inline-block rounded-full bg-teal/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-teal">
            {t('hero.kicker')}
          </span>

          <h1 className="mt-5 text-4xl leading-tight text-cream md:text-6xl">
            {t('hero.headline1')}
            <br />
            <span className="text-coral">{t('hero.headline2')}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted">{t('hero.subtitle')}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="text-lg" onClick={() => (window.location.hash = '#booking')}>
              <CalendarIcon className="h-5 w-5" />
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
      </div>

      <KupesiDivider />
    </section>
  );
}
