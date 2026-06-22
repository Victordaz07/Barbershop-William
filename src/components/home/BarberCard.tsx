import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import type { Barber } from '../../types/barber';

export function BarberCard({ barber }: { barber: Barber }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const bio = language === 'to' ? barber.bioTo : barber.bioEn;

  return (
    <div className="group overflow-hidden rounded-2xl bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-coral/10">
      <div className="relative h-64 w-full overflow-hidden">
        {barber.photoUrl ? (
          <img
            src={barber.photoUrl}
            alt={barber.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal/20 via-bg2 to-coral/20 text-6xl font-heading text-sand">
            {barber.name.charAt(0)}
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl text-cream">{barber.name}</h3>
        <p className="mt-1 inline-block rounded-full bg-teal/10 px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-teal">
          {barber.role}
        </p>
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
