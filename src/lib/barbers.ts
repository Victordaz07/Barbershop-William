import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import type { Barber } from '../types/barber';

export async function fetchActiveBarbers(): Promise<Barber[]> {
  const barbersQuery = query(collection(db, 'barbers'), where('active', '==', true));
  const snapshot = await getDocs(barbersQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Barber);
}
