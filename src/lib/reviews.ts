import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from './firebase';
import type { Review } from '../types/review';

export async function fetchApprovedReviews(): Promise<Review[]> {
  const reviewsQuery = query(collection(db, 'reviews'), where('approved', '==', true));
  const snapshot = await getDocs(reviewsQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Review);
}

export interface NewReviewInput {
  clientName: string;
  rating: number;
  comment: string;
  photoUrls: string[];
}

export async function createReview(input: NewReviewInput): Promise<void> {
  await addDoc(collection(db, 'reviews'), {
    ...input,
    approved: false,
    createdAt: serverTimestamp(),
  });
}
