import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, id, name, className = '', ...props }: TextareaProps) {
  const textareaId = id ?? name;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={textareaId} className="text-sm font-semibold text-cream">
        {label}
      </label>
      <textarea
        id={textareaId}
        name={name}
        className={`rounded-lg border border-muted/30 bg-bg2 px-4 py-2.5 text-cream placeholder:text-muted focus-visible:border-teal ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-coral">{error}</p>}
    </div>
  );
}
