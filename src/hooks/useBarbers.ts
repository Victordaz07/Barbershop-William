import { useEffect, useState } from 'react';
import { fetchActiveBarbers } from '../lib/barbers';
import type { Barber } from '../types/barber';

export function useBarbers() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchActiveBarbers()
      .then((data) => {
        if (!cancelled) setBarbers(data);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { barbers, loading, error };
}
