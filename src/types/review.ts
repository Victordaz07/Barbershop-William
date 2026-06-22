import type { Timestamp } from 'firebase/firestore';

export interface Review {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  photoUrls: string[];
  approved: boolean;
  createdAt: Timestamp;
}
