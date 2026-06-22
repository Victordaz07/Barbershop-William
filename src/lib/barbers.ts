import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where, type Unsubscribe } from 'firebase/firestore';
import { db } from './firebase';
import type { Barber } from '../types/barber';

export async function fetchActiveBarbers(): Promise<Barber[]> {
  const barbersQuery = query(collection(db, 'barbers'), where('active', '==', true));
  const snapshot = await getDocs(barbersQuery);
  return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }) as Barber);
}

// Admin-only (requires auth, per security rules): every barber, active or not.
export function subscribeToAllBarbers(onChange: (barbers: Barber[]) => void): Unsubscribe {
  return onSnapshot(collection(db, 'barbers'), (snapshot) => {
    onChange(snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }) as Barber));
  });
}

export type NewBarberInput = Omit<Barber, 'id'>;

export async function createBarber(input: NewBarberInput): Promise<void> {
  await addDoc(collection(db, 'barbers'), input);
}

export async function updateBarber(id: string, input: NewBarberInput): Promise<void> {
  await updateDoc(doc(db, 'barbers', id), input);
}

export async function deleteBarber(id: string): Promise<void> {
  await deleteDoc(doc(db, 'barbers', id));
}
