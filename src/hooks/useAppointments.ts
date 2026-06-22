import { useEffect, useState } from 'react';
import { subscribeToAppointmentsForDate } from '../lib/appointments';
import type { Appointment } from '../types/appointment';

export function useAppointmentsForDate(date: string | null) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadedDate, setLoadedDate] = useState<string | null>(null);

  useEffect(() => {
    if (!date) return;

    const unsubscribe = subscribeToAppointmentsForDate(date, (data) => {
      setAppointments(data);
      setLoadedDate(date);
    });

    return unsubscribe;
  }, [date]);

  return {
    appointments: date ? appointments : [],
    loading: Boolean(date) && loadedDate !== date,
  };
}
