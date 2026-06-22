import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Appointment, AppointmentStatus } from '../types/appointment';

// Placeholder hours until the client confirms real business hours.
const OPEN_HOUR = 9;
const CLOSE_HOUR = 18;
const SLOT_MINUTES = 30;

export const ANY_BARBER = 'any';

export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let minutes = OPEN_HOUR * 60; minutes < CLOSE_HOUR * 60; minutes += SLOT_MINUTES) {
    const hours = Math.floor(minutes / 60)
      .toString()
      .padStart(2, '0');
    const mins = (minutes % 60).toString().padStart(2, '0');
    slots.push(`${hours}:${mins}`);
  }
  return slots;
}

export function subscribeToAppointmentsForDate(
  date: string,
  onChange: (appointments: Appointment[]) => void,
): Unsubscribe {
  const appointmentsQuery = query(collection(db, 'appointments'), where('date', '==', date));
  return onSnapshot(appointmentsQuery, (snapshot) => {
    const appointments = snapshot.docs
      .map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }) as Appointment)
      .filter((appointment) => appointment.status !== 'cancelled');
    onChange(appointments);
  });
}

// "Any available" only counts as fully booked once every active barber is
// taken at that slot; a specific barber is only blocked by their own
// appointments (an "any" booking isn't resolved to a physical barber yet).
export function getTakenSlots(
  appointments: Appointment[],
  barberId: string,
  totalActiveBarbers: number,
): Set<string> {
  if (barberId === ANY_BARBER) {
    const counts = new Map<string, number>();
    for (const appointment of appointments) {
      counts.set(appointment.time, (counts.get(appointment.time) ?? 0) + 1);
    }
    return new Set(
      [...counts.entries()]
        .filter(([, count]) => count >= totalActiveBarbers)
        .map(([time]) => time),
    );
  }

  return new Set(
    appointments.filter((appointment) => appointment.barberId === barberId).map((appointment) => appointment.time),
  );
}

export interface NewAppointmentInput {
  clientName: string;
  phone: string;
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
}

export async function createAppointment(input: NewAppointmentInput): Promise<void> {
  await addDoc(collection(db, 'appointments'), {
    ...input,
    status: 'pending',
    createdAt: serverTimestamp(),
  });
}

// Admin-only (requires auth, per security rules): every appointment regardless of status.
// Sorts by time client-side to avoid needing a composite (date, time) index.
export function subscribeToAllAppointments(onChange: (appointments: Appointment[]) => void): Unsubscribe {
  const appointmentsQuery = query(collection(db, 'appointments'), orderBy('date', 'desc'));
  return onSnapshot(appointmentsQuery, (snapshot) => {
    const appointments = snapshot.docs.map(
      (docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }) as Appointment,
    );
    appointments.sort((a, b) => (a.date === b.date ? b.time.localeCompare(a.time) : 0));
    onChange(appointments);
  });
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus): Promise<void> {
  await updateDoc(doc(db, 'appointments', id), { status });
}
