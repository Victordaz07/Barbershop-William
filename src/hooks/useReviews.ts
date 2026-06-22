import { useEffect, useState } from 'react';
import { fetchApprovedReviews } from '../lib/reviews';
import type { Review } from '../types/review';

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchApprovedReviews()
      .then((data) => {
        if (!cancelled) setReviews(data);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { reviews, loading, error };
}
