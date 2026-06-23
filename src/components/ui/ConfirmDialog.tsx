import { useTranslation } from 'react-i18next';
import { Button } from './Button';

interface ConfirmDialogProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ open, message, onConfirm, onCancel }: ConfirmDialogProps) {
  const { t } = useTranslation();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 px-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-card p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <h4 className="text-lg text-cream">{t('admin.confirmDeleteTitle')}</h4>
        <p className="mt-2 text-sm text-muted">{message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" className="px-4 py-1.5 text-sm" onClick={onCancel}>
            {t('admin.cancelAction')}
          </Button>
          <Button className="px-4 py-1.5 text-sm" onClick={onConfirm}>
            {t('admin.delete')}
          </Button>
        </div>
      </div>
    </div>
  );
}
