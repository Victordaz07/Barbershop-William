import { useTranslation } from 'react-i18next';
import { useAdminReviews } from '../../hooks/useAdminReviews';
import { approveReview, deleteReview } from '../../lib/reviews';
import { Button } from '../ui/Button';
import { StarRating } from '../reviews/StarRating';

export function ReviewsModeration() {
  const { t } = useTranslation();
  const { reviews } = useAdminReviews();

  const pending = reviews.filter((review) => !review.approved);
  const approved = reviews.filter((review) => review.approved);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="text-lg text-cream">{t('admin.pendingReviews')}</h3>
        {pending.length === 0 ? (
          <p className="mt-2 text-muted">{t('admin.noPendingReviews')}</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {pending.map((review) => (
              <div key={review.id} className="rounded-2xl bg-card p-5">
                <StarRating value={review.rating} />
                <p className="mt-2 text-sm text-cream">{review.comment}</p>
                <p className="mt-2 text-sm font-semibold text-teal">{review.clientName}</p>
                <div className="mt-4 flex gap-2">
                  <Button className="px-3 py-1 text-xs" onClick={() => approveReview(review.id)}>
                    {t('admin.approve')}
                  </Button>
                  <Button
                    variant="secondary"
                    className="px-3 py-1 text-xs"
                    onClick={() => deleteReview(review.id)}
                  >
                    {t('admin.reject')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg text-cream">{t('admin.approvedReviews')}</h3>
        {approved.length === 0 ? (
          <p className="mt-2 text-muted">{t('admin.noApprovedReviews')}</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {approved.map((review) => (
              <div key={review.id} className="rounded-2xl bg-card p-5">
                <StarRating value={review.rating} />
                <p className="mt-2 text-sm text-cream">{review.comment}</p>
                <p className="mt-2 text-sm font-semibold text-teal">{review.clientName}</p>
                <Button
                  variant="secondary"
                  className="mt-4 px-3 py-1 text-xs"
                  onClick={() => deleteReview(review.id)}
                >
                  {t('admin.delete')}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
