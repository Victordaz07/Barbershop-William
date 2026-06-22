import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import type { Service } from '../types/service';

export async function fetchActiveServices(): Promise<Service[]> {
  const servicesQuery = query(collection(db, 'services'), where('active', '==', true));
  const snapshot = await getDocs(servicesQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Service);
}
