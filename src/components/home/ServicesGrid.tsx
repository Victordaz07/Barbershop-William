import { useTranslation } from 'react-i18next';
import { useServices } from '../../hooks/useServices';
import { ServiceCard } from './ServiceCard';
import { KupesiDivider } from '../layout/KupesiDivider';
import { SectionHeading } from '../ui/SectionHeading';

export function ServicesGrid() {
  const { t } = useTranslation();
  const { services, loading, error } = useServices();

  return (
    <section id="services" className="bg-bg2 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          kicker={t('services.kicker')}
          title={t('services.heading')}
          subtitle={t('services.subheading')}
        />

        {loading && <p className="mt-12 text-center text-muted">{t('services.loading')}</p>}
        {error && <p className="mt-12 text-center text-coral">{t('services.error')}</p>}
        {!loading && !error && services.length === 0 && (
          <p className="mt-12 text-center text-muted">{t('services.empty')}</p>
        )}

        {!loading && !error && services.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        )}
      </div>
      <KupesiDivider className="mt-20" />
    </section>
  );
}
