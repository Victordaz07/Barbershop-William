import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { BarberPoleIcon, ClockIcon, RazorIcon, ScissorsIcon, WalkInIcon } from '../ui/icons';
import type { Service } from '../../types/service';
import { ServiceImageCarousel } from './ServiceImageCarousel';
import beardSculpt from '../../assets/services/beard-sculpt.jpg';
import signatureFade from '../../assets/services/signature-fade.jpg';
import kidsCut from '../../assets/services/kids-cut.jpg';
import fullPackage from '../../assets/services/full-package.jpg';
import kidsDesign1 from '../../assets/services/kids-design-1.jpg';
import kidsDesign2 from '../../assets/services/kids-design-2.jpg';
import kidsNormal1 from '../../assets/services/kids-normal-1.jpg';
import kidsNormal2 from '../../assets/services/kids-normal-2.jpg';
import hifi1 from '../../assets/services/hifi-1.jpg';
import hifi2 from '../../assets/services/hifi-2.jpg';

const SERVICE_ICONS = [ScissorsIcon, RazorIcon, BarberPoleIcon, WalkInIcon];

const SERVICE_IMAGES: Record<string, string[]> = {
  'beard sculpt': [beardSculpt],
  'signature fade': [signatureFade],
  'kids cut': [kidsCut],
  'full package': [fullPackage],
  'kids design': [kidsDesign1, kidsDesign2],
  'kids normal': [kidsNormal1, kidsNormal2],
  'hifi / fade kava / kemo': [hifi1, hifi2],
};

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const name = language === 'to' ? service.nameTo : service.nameEn;
  const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
  const images = service.imageUrls?.length
    ? service.imageUrls
    : SERVICE_IMAGES[service.nameEn.trim().toLowerCase()] ?? [];
  const hasImage = images.length > 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-cream/5 bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/30 hover:shadow-xl hover:shadow-teal/10">
      {hasImage && (
        <div className="relative h-44 w-full overflow-hidden">
          <ServiceImageCarousel images={images} alt={name} />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          <span className="absolute right-4 top-4 font-heading text-4xl text-cream/20 drop-shadow-md">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      )}

      <div className="relative p-6">
        {!hasImage && (
          <span className="absolute right-5 top-5 font-heading text-4xl text-cream/5 transition-colors duration-300 group-hover:text-teal/10">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}

        <div
          className={`relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal/20 to-coral/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${
            hasImage ? '-mt-12 border-4 border-card' : ''
          }`}
        >
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
    </div>
  );
}
