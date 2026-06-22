import { useEffect, useState } from 'react';
import { subscribeToAllBarbers } from '../lib/barbers';
import type { Barber } from '../types/barber';

export function useAdminBarbers() {
  const [barbers, setBarbers] = useState<Barber[]>([]);

  useEffect(() => subscribeToAllBarbers(setBarbers), []);

  return { barbers };
}
