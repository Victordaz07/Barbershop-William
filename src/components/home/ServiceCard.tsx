import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { BarberPoleIcon, ClockIcon, RazorIcon, ScissorsIcon, WalkInIcon } from '../ui/icons';
import type { Service } from '../../types/service';

const SERVICE_ICONS = [ScissorsIcon, RazorIcon, BarberPoleIcon, WalkInIcon];

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const name = language === 'to' ? service.nameTo : service.nameEn;
  const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-cream/5 bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/30 hover:shadow-xl hover:shadow-teal/10">
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br from-teal/20 to-coral/0 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />

      <span className="absolute right-5 top-5 font-heading text-4xl text-cream/5 transition-colors duration-300 group-hover:text-teal/10">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal/20 to-coral/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        <Icon className="h-7 w-7 text-coral" />
      </div>

      <h3 className="relative mt-5 font-heading text-xl uppercase tracking-wide text-cream">
        {name}
      </h3>

      <div className="relative mt-5 h-px w-full bg-gradient-to-r from-teal/30 via-cream/10 to-transparent" />

      <div className="relative mt-5 flex items-center justify-between">
        <span className="text-3xl font-bold text-coral">${service.price}</span>
        <span className="flex items-center gap-1.5 rounded-full bg-bg2 px-3 py-1 text-xs font-semibold text-muted">
          <ClockIcon className="h-3.5 w-3.5" />
          {service.durationMinutes} {t('services.minutes')}
        </span>
      </div>
    </div>
  );
}
