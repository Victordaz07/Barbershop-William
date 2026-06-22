import { useTranslation } from 'react-i18next';

interface TimeSlotPickerProps {
  slots: string[];
  takenSlots: Set<string>;
  selectedTime: string | null;
  onSelect: (time: string) => void;
  disabled?: boolean;
}

export function TimeSlotPicker({ slots, takenSlots, selectedTime, onSelect, disabled }: TimeSlotPickerProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
      {slots.map((slot) => {
        const taken = takenSlots.has(slot);
        const selected = selectedTime === slot;

        return (
          <button
            key={slot}
            type="button"
            disabled={disabled || taken}
            aria-pressed={selected}
            onClick={() => onSelect(slot)}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
              taken
                ? 'cursor-not-allowed text-muted/50 line-through'
                : selected
                  ? 'bg-teal text-bg'
                  : 'bg-card text-cream hover:bg-teal/20 disabled:cursor-not-allowed disabled:opacity-40'
            }`}
          >
            {slot}
            {taken && <span className="sr-only"> ({t('booking.slotTaken')})</span>}
          </button>
        );
      })}
    </div>
  );
}
