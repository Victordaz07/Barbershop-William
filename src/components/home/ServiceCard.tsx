import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import type { Service } from '../../types/service';

export function ServiceCard({ service }: { service: Service }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const name = language === 'to' ? service.nameTo : service.nameEn;

  return (
    <div className="rounded-2xl bg-card p-6 transition-transform hover:-translate-y-1">
      <h3 className="text-xl text-cream">{name}</h3>
      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-coral">${service.price}</span>
        <span className="text-sm text-muted">
          {service.durationMinutes} {t('services.minutes')}
        </span>
      </div>
    </div>
  );
}
