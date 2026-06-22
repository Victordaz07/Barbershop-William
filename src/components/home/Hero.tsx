import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { KupesiDivider } from '../layout/KupesiDivider';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="top" className="relative overflow-hidden bg-bg">
      <div
        aria-hidden="true"
        className="absolute -top-1/3 left-1/2 h-[120%] w-[120%] -translate-x-1/2 bg-[radial-gradient(circle_at_30%_30%,rgba(0,163,154,0.25),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(255,107,92,0.2),transparent_55%)]"
      />
      <KupesiDivider variant="overlay" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center md:px-6 md:py-36">
        <h1 className="text-5xl text-cream md:text-7xl">{t('hero.title')}</h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{t('hero.subtitle')}</p>
        <Button className="mt-8 text-lg" onClick={() => (window.location.hash = '#booking')}>
          {t('hero.cta')}
        </Button>
      </div>

      <KupesiDivider />
    </section>
  );
}
