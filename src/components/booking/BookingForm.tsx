import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { KupesiDivider } from '../layout/KupesiDivider';
import { SectionHeading } from '../ui/SectionHeading';
import { BarberSelect } from './BarberSelect';
import { TimeSlotPicker } from './TimeSlotPicker';
import { useServices } from '../../hooks/useServices';
import { useBarbers } from '../../hooks/useBarbers';
import { useAppointmentsForDate } from '../../hooks/useAppointments';
import { ANY_BARBER, createAppointment, generateTimeSlots, getTakenSlots } from '../../lib/appointments';
import { useLanguage } from '../../context/LanguageContext';

const PHONE_REGEX = /^[\d\s\-+().]{7,20}$/;
const SLOTS = generateTimeSlots();

function todayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

interface FormErrors {
  clientName?: string;
  phone?: string;
  serviceId?: string;
  date?: string;
  time?: string;
}

export function BookingForm() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { services } = useServices();
  const { barbers } = useBarbers();

  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [barberId, setBarberId] = useState(ANY_BARBER);
  const [date, setDate] = useState('');
  const [time, setTime] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const { appointments } = useAppointmentsForDate(date || null);
  const takenSlots = getTakenSlots(appointments, barberId, barbers.length);

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    if (!clientName.trim()) nextErrors.clientName = t('validation.required');
    if (!phone.trim()) nextErrors.phone = t('validation.required');
    else if (!PHONE_REGEX.test(phone)) nextErrors.phone = t('validation.invalidPhone');
    if (!serviceId) nextErrors.serviceId = t('validation.required');
    if (!date) nextErrors.date = t('validation.required');
    else if (date < todayDateString()) nextErrors.date = t('validation.pastDate');
    if (!time) nextErrors.time = t('validation.required');

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validate() || !time) return;

    setSubmitting(true);
    setSubmitError(false);
    try {
      await createAppointment({
        clientName: clientName.trim(),
        phone: phone.trim(),
        serviceId,
        barberId,
        date,
        time,
      });
      setConfirmed(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="booking" className="relative bg-bg2 py-20">
      <KupesiDivider variant="overlay" />
      <div className="relative mx-auto max-w-3xl px-4 md:px-6">
        <SectionHeading title={t('booking.heading')} />

        {confirmed ? (
          <div className="mt-10 rounded-2xl bg-card p-8 text-center">
            <p className="text-lg text-teal">{t('booking.confirmed')}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 grid grid-cols-1 gap-6 rounded-2xl border border-cream/5 bg-card/40 p-6 md:grid-cols-2 md:p-8"
          >
            <Input
              label={t('booking.name')}
              name="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              error={errors.clientName}
            />
            <Input
              label={t('booking.phone')}
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
            />
            <Select
              label={t('booking.service')}
              name="serviceId"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              error={errors.serviceId}
            >
              <option value="" disabled>
                {t('booking.selectService')}
              </option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {language === 'to' ? service.nameTo : service.nameEn} — ${service.price}
                </option>
              ))}
            </Select>
            <BarberSelect value={barberId} onChange={setBarberId} />
            <Input
              label={t('booking.date')}
              name="date"
              type="date"
              min={todayDateString()}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setTime(null);
              }}
              error={errors.date}
            />

            <div className="md:col-span-2">
              <p className="mb-2 text-sm font-semibold text-cream">{t('booking.time')}</p>
              <TimeSlotPicker
                slots={SLOTS}
                takenSlots={takenSlots}
                selectedTime={time}
                onSelect={setTime}
                disabled={!date}
              />
              {errors.time && <p className="mt-2 text-sm text-coral">{errors.time}</p>}
            </div>

            <div className="md:col-span-2">
              {submitError && <p className="mb-3 text-sm text-coral">{t('booking.error')}</p>}
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? t('booking.submitting') : t('booking.submit')}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
