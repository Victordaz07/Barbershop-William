import type { Timestamp } from 'firebase/firestore';

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'done';

export interface Appointment {
  id: string;
  clientName: string;
  phone: string;
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  createdAt: Timestamp;
}
