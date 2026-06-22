import { useTranslation } from 'react-i18next';
import { useReviews } from '../../hooks/useReviews';
import { ReviewCard } from './ReviewCard';
import { KupesiDivider } from '../layout/KupesiDivider';
import { ReviewForm } from './ReviewForm';
import { SectionHeading } from '../ui/SectionHeading';

export function ReviewsGrid() {
  const { t } = useTranslation();
  const { reviews, loading, error } = useReviews();

  return (
    <section id="reviews" className="bg-bg2 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading kicker={t('reviews.kicker')} title={t('reviews.heading')} />

        {loading && <p className="mt-12 text-center text-muted">{t('reviews.loading')}</p>}
        {error && <p className="mt-12 text-center text-coral">{t('reviews.error')}</p>}
        {!loading && !error && reviews.length === 0 && (
          <p className="mt-12 text-center text-muted">{t('reviews.empty')}</p>
        )}

        {!loading && !error && reviews.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        <ReviewForm />
      </div>
      <KupesiDivider className="mt-20" />
    </section>
  );
}
