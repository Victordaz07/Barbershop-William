import { useEffect, useState } from 'react';
import { subscribeToAllAppointments } from '../lib/appointments';
import type { Appointment } from '../types/appointment';

export function useAdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => subscribeToAllAppointments(setAppointments), []);

  return { appointments };
}
