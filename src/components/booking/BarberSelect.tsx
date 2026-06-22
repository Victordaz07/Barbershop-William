import { useTranslation } from 'react-i18next';
import { Select } from '../ui/Select';
import { useBarbers } from '../../hooks/useBarbers';
import { ANY_BARBER } from '../../lib/appointments';

interface BarberSelectProps {
  value: string;
  onChange: (barberId: string) => void;
}

export function BarberSelect({ value, onChange }: BarberSelectProps) {
  const { t } = useTranslation();
  const { barbers } = useBarbers();

  return (
    <Select label={t('booking.barber')} name="barberId" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value={ANY_BARBER}>{t('booking.anyBarber')}</option>
      {barbers.map((barber) => (
        <option key={barber.id} value={barber.id}>
          {barber.name}
        </option>
      ))}
    </Select>
  );
}
