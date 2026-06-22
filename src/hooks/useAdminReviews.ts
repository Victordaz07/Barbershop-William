import { useEffect, useState } from 'react';
import { subscribeToAllReviews } from '../lib/reviews';
import type { Review } from '../types/review';

export function useAdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => subscribeToAllReviews(setReviews), []);

  return { reviews };
}
