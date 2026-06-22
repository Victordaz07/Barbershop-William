import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { BarberPoleIcon, RazorIcon, ScissorsIcon, WalkInIcon } from '../ui/icons';
import type { Service } from '../../types/service';

const SERVICE_ICONS = [ScissorsIcon, RazorIcon, BarberPoleIcon, WalkInIcon];

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const name = language === 'to' ? service.nameTo : service.nameEn;
  const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];

  return (
    <div className="group rounded-2xl bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal/10">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal/20 to-coral/20 transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-6 w-6 text-coral" />
      </div>
      <h3 className="mt-5 text-xl text-cream">{name}</h3>
      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-coral">${service.price}</span>
        <span className="text-sm text-muted">
          {service.durationMinutes} {t('services.minutes')}
        </span>
      </div>
    </div>
  );
}
