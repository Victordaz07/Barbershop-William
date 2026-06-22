import { StarRating } from './StarRating';
import type { Review } from '../../types/review';

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="relative rounded-2xl bg-card p-6 transition-transform duration-300 hover:-translate-y-1">
      <span aria-hidden="true" className="absolute right-5 top-4 font-heading text-5xl text-cream/5">
        “
      </span>
      <StarRating value={review.rating} />
      <p className="mt-3 text-sm text-cream">{review.comment}</p>
      <p className="mt-4 text-sm font-semibold text-teal">{review.clientName}</p>
      {review.photoUrls.length > 0 && (
        <div className="mt-4 flex gap-2">
          {review.photoUrls.map((url) => (
            <img key={url} src={url} alt="" className="h-16 w-16 rounded-lg object-cover" />
          ))}
        </div>
      )}
    </div>
  );
}
