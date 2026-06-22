import { useTranslation } from 'react-i18next';
import { KupesiDivider } from './KupesiDivider';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg2">
      <KupesiDivider />
      <div className="mx-auto max-w-6xl px-4 py-10 text-center md:px-6">
        <p className="font-heading text-lg text-cream">Folau Cuts</p>
        <p className="mt-2 text-sm text-muted">{t('footer.tagline')}</p>
        <p className="mt-4 text-xs text-muted">
          &copy; {year} Folau Cuts. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
