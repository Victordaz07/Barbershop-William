import { useTranslation } from 'react-i18next';
import { useAdminAppointments } from '../../hooks/useAdminAppointments';
import { updateAppointmentStatus } from '../../lib/appointments';
import { Button } from '../ui/Button';
import type { AppointmentStatus } from '../../types/appointment';

const NEXT_ACTIONS: Record<AppointmentStatus, { status: AppointmentStatus; labelKey: string }[]> = {
  pending: [
    { status: 'confirmed', labelKey: 'admin.confirmAction' },
    { status: 'cancelled', labelKey: 'admin.cancelAction' },
  ],
  confirmed: [
    { status: 'done', labelKey: 'admin.completeAction' },
    { status: 'cancelled', labelKey: 'admin.cancelAction' },
  ],
  cancelled: [],
  done: [],
};

export function AppointmentsTable() {
  const { t } = useTranslation();
  const { appointments } = useAdminAppointments();

  if (appointments.length === 0) {
    return <p className="text-muted">{t('admin.noAppointments')}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-muted/20 text-muted">
            <th className="py-2 pr-4">{t('booking.name')}</th>
            <th className="py-2 pr-4">{t('booking.phone')}</th>
            <th className="py-2 pr-4">{t('booking.date')}</th>
            <th className="py-2 pr-4">{t('booking.time')}</th>
            <th className="py-2 pr-4">{t('admin.statusLabel')}</th>
            <th className="py-2 pr-4" />
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="border-b border-muted/10 text-cream">
              <td className="py-2 pr-4">{appointment.clientName}</td>
              <td className="py-2 pr-4">{appointment.phone}</td>
              <td className="py-2 pr-4">{appointment.date}</td>
              <td className="py-2 pr-4">{appointment.time}</td>
              <td className="py-2 pr-4">{t(`admin.status.${appointment.status}`)}</td>
              <td className="flex gap-2 py-2 pr-4">
                {NEXT_ACTIONS[appointment.status].map((action) => (
                  <Button
                    key={action.status}
                    variant="secondary"
                    className="px-3 py-1 text-xs"
                    onClick={() => updateAppointmentStatus(appointment.id, action.status)}
                  >
                    {t(action.labelKey)}
                  </Button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
