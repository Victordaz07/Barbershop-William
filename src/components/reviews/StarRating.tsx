interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
}

const STARS = [1, 2, 3, 4, 5];

export function StarRating({ value, onChange }: StarRatingProps) {
  const interactive = Boolean(onChange);

  return (
    <div className="flex gap-1" role={interactive ? 'radiogroup' : undefined}>
      {STARS.map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          aria-pressed={interactive ? star <= value : undefined}
          onClick={() => onChange?.(star)}
          className={`text-2xl leading-none ${interactive ? 'cursor-pointer' : 'cursor-default'} ${
            star <= value ? 'text-sand' : 'text-muted/30'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
