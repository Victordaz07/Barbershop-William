import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import type { Barber } from '../../types/barber';

export function BarberCard({ barber }: { barber: Barber }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const bio = language === 'to' ? barber.bioTo : barber.bioEn;

  return (
    <div className="overflow-hidden rounded-2xl bg-card">
      {barber.photoUrl ? (
        <img src={barber.photoUrl} alt={barber.name} className="h-64 w-full object-cover" />
      ) : (
        <div className="flex h-64 w-full items-center justify-center bg-bg2 text-5xl font-display text-sand">
          {barber.name.charAt(0)}
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl text-cream">{barber.name}</h3>
        <p className="text-sm font-semibold text-teal">{barber.role}</p>
        <p className="mt-3 text-sm text-muted">{bio}</p>
        <Button
          variant="secondary"
          className="mt-4 w-full"
          onClick={() => (window.location.hash = '#booking')}
        >
          {t('barbers.bookWith', { name: barber.name })}
        </Button>
      </div>
    </div>
  );
}
