import { useEffect, useState } from 'react';
import { fetchActiveServices } from '../lib/services';
import type { Service } from '../types/service';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchActiveServices()
      .then((data) => {
        if (!cancelled) setServices(data);
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

  return { services, loading, error };
}
