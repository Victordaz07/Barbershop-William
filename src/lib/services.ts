import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where, type Unsubscribe } from 'firebase/firestore';
import { db } from './firebase';
import type { Service } from '../types/service';

export async function fetchActiveServices(): Promise<Service[]> {
  const servicesQuery = query(collection(db, 'services'), where('active', '==', true));
  const snapshot = await getDocs(servicesQuery);
  return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }) as Service);
}

// Admin-only (requires auth, per security rules): every service, active or not.
export function subscribeToAllServices(onChange: (services: Service[]) => void): Unsubscribe {
  return onSnapshot(collection(db, 'services'), (snapshot) => {
    onChange(snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }) as Service));
  });
}

export type NewServiceInput = Omit<Service, 'id'>;

export async function createService(input: NewServiceInput): Promise<void> {
  await addDoc(collection(db, 'services'), input);
}

export async function updateService(id: string, input: NewServiceInput): Promise<void> {
  await updateDoc(doc(db, 'services', id), input);
}

export async function deleteService(id: string): Promise<void> {
  await deleteDoc(doc(db, 'services', id));
}
