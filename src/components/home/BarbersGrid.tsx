import { useTranslation } from 'react-i18next';
import { useBarbers } from '../../hooks/useBarbers';
import { BarberCard } from './BarberCard';
import { KupesiDivider } from '../layout/KupesiDivider';

export function BarbersGrid() {
  const { t } = useTranslation();
  const { barbers, loading, error } = useBarbers();

  return (
    <section id="barbers" className="bg-bg py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center text-4xl text-cream">{t('barbers.heading')}</h2>
        <p className="mx-auto mt-3 max-w-md text-center text-muted">{t('barbers.subheading')}</p>

        {loading && <p className="mt-12 text-center text-muted">{t('barbers.loading')}</p>}
        {error && <p className="mt-12 text-center text-coral">{t('barbers.error')}</p>}
        {!loading && !error && barbers.length === 0 && (
          <p className="mt-12 text-center text-muted">{t('barbers.empty')}</p>
        )}

        {!loading && !error && barbers.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {barbers.map((barber) => (
              <BarberCard key={barber.id} barber={barber} />
            ))}
          </div>
        )}
      </div>
      <KupesiDivider className="mt-20" />
    </section>
  );
}
