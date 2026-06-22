import { useTranslation } from 'react-i18next';

// Disabled until Firebase Storage is enabled on the project (see
// uploadReviewPhotos.ts). Kept in the form layout now so the UI doesn't
// shift once uploads go live.
export function PhotoUpload() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-cream">{t('reviews.addPhotos')}</span>
      <div className="rounded-lg border border-dashed border-muted/30 bg-bg2 px-4 py-3 text-sm text-muted">
        {t('reviews.photosComingSoon')}
      </div>
    </div>
  );
}
