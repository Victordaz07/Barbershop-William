import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdminBarbers } from '../../hooks/useAdminBarbers';
import { createBarber, deleteBarber, updateBarber, type NewBarberInput } from '../../lib/barbers';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import type { Barber } from '../../types/barber';

const EMPTY_FORM: NewBarberInput = { name: '', role: '', bioEn: '', bioTo: '', photoUrl: '', active: true };

export function BarbersManager() {
  const { t } = useTranslation();
  const { barbers } = useAdminBarbers();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<NewBarberInput>(EMPTY_FORM);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  function startEdit(barber: Barber) {
    setEditingId(barber.id);
    setForm({
      name: barber.name,
      role: barber.role,
      bioEn: barber.bioEn,
      bioTo: barber.bioTo,
      photoUrl: barber.photoUrl,
      active: barber.active,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (editingId) {
      await updateBarber(editingId, form);
    } else {
      await createBarber(form);
    }
    resetForm();
  }

  return (
    <div className="flex flex-col gap-8">
      <ConfirmDialog
        open={pendingDeleteId !== null}
        message={t('admin.confirmDeleteBarber')}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (pendingDeleteId) deleteBarber(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-muted/20 text-muted">
              <th className="py-2 pr-4">{t('admin.fields.name')}</th>
              <th className="py-2 pr-4">{t('admin.fields.role')}</th>
              <th className="py-2 pr-4">{t('admin.fields.active')}</th>
              <th className="py-2 pr-4" />
            </tr>
          </thead>
          <tbody>
            {barbers.map((barber) => (
              <tr key={barber.id} className="border-b border-muted/10 text-cream">
                <td className="py-2 pr-4">{barber.name}</td>
                <td className="py-2 pr-4">{barber.role}</td>
                <td className="py-2 pr-4">{barber.active ? '✓' : '—'}</td>
                <td className="flex gap-2 py-2 pr-4">
                  <Button variant="secondary" className="px-3 py-1 text-xs" onClick={() => startEdit(barber)}>
                    {t('admin.edit')}
                  </Button>
                  <Button
                    variant="secondary"
                    className="px-3 py-1 text-xs"
                    onClick={() => setPendingDeleteId(barber.id)}
                  >
                    {t('admin.delete')}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl rounded-2xl bg-card p-6">
        <h4 className="text-lg text-cream">{editingId ? t('admin.edit') : t('admin.addNew')}</h4>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label={t('admin.fields.name')}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            label={t('admin.fields.role')}
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
          />
          <div className="sm:col-span-2">
            <Textarea
              label={t('admin.fields.bioEn')}
              rows={2}
              value={form.bioEn}
              onChange={(e) => setForm({ ...form, bioEn: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <Textarea
              label={t('admin.fields.bioTo')}
              rows={2}
              value={form.bioTo}
              onChange={(e) => setForm({ ...form, bioTo: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              label={t('admin.fields.photoUrl')}
              value={form.photoUrl}
              onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-cream">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />
            {t('admin.fields.active')}
          </label>
        </div>
        <div className="mt-4 flex gap-2">
          <Button type="submit">{t('admin.save')}</Button>
          {editingId && (
            <Button type="button" variant="secondary" onClick={resetForm}>
              {t('admin.cancelEdit')}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
