import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { KupesiDivider } from './KupesiDivider';
import { ClockIcon, PhoneIcon, PinIcon } from '../ui/icons';
import logoLight from '../../assets/logo-light.png';

const LINKS = [
  { href: '#services', key: 'services' },
  { href: '#barbers', key: 'barbers' },
  { href: '#reviews', key: 'reviews' },
  { href: '#booking', key: 'bookNow' },
] as const;

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg2">
      <KupesiDivider />
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3 sm:text-left">
          <div>
            <img
              src={logoLight}
              alt="Barbershop Vehikité"
              className="mx-auto h-10 sm:mx-0"
            />
            <p className="mt-3 text-sm text-muted">{t('footer.tagline')}</p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-teal">
              {t('footer.linksHeading')}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {LINKS.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className="text-sm text-muted hover:text-cream">
                    {t(`nav.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-teal">
              {t('footer.contactHeading')}
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted">
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <PinIcon className="h-4 w-4 shrink-0" />
                {t('footer.address')}
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <PhoneIcon className="h-4 w-4 shrink-0" />
                <a href="tel:+6768633457" className="hover:text-cream">
                  {t('footer.phone')}
                </a>
              </li>
              <li className="flex items-start justify-center gap-2 sm:justify-start">
                <ClockIcon className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="flex flex-col">
                  <span>{t('footer.hoursWeekday')}</span>
                  <span>{t('footer.hoursWeekend')}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted">
          &copy; {year} Vehikité. {t('footer.rights')}{' '}
          <Link to="/admin/login" className="text-muted/50 hover:text-muted">
            {t('admin.login')}
          </Link>
        </p>
      </div>
    </footer>
  );
}
