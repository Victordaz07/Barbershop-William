import { useEffect, useState } from 'react';
import { subscribeToAllServices } from '../lib/services';
import type { Service } from '../types/service';

export function useAdminServices() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => subscribeToAllServices(setServices), []);

  return { services };
}
