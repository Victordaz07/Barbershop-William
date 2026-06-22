import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Review } from '../types/review';

export async function fetchApprovedReviews(): Promise<Review[]> {
  const reviewsQuery = query(collection(db, 'reviews'), where('approved', '==', true));
  const snapshot = await getDocs(reviewsQuery);
  return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }) as Review);
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

// Admin-only (requires auth, per security rules): every review, approved or not.
export function subscribeToAllReviews(onChange: (reviews: Review[]) => void): Unsubscribe {
  return onSnapshot(collection(db, 'reviews'), (snapshot) => {
    onChange(snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }) as Review));
  });
}

export async function approveReview(id: string): Promise<void> {
  await updateDoc(doc(db, 'reviews', id), { approved: true });
}

export async function deleteReview(id: string): Promise<void> {
  await deleteDoc(doc(db, 'reviews', id));
}
