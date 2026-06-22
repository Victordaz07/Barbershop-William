import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdminServices } from '../../hooks/useAdminServices';
import { createService, deleteService, updateService, type NewServiceInput } from '../../lib/services';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { Service } from '../../types/service';

const EMPTY_FORM: NewServiceInput = { nameEn: '', nameTo: '', price: 0, durationMinutes: 0, active: true };

export function ServicesManager() {
  const { t } = useTranslation();
  const { services } = useAdminServices();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<NewServiceInput>(EMPTY_FORM);

  function startEdit(service: Service) {
    setEditingId(service.id);
    setForm({
      nameEn: service.nameEn,
      nameTo: service.nameTo,
      price: service.price,
      durationMinutes: service.durationMinutes,
      active: service.active,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (editingId) {
      await updateService(editingId, form);
    } else {
      await createService(form);
    }
    resetForm();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-muted/20 text-muted">
              <th className="py-2 pr-4">{t('admin.fields.nameEn')}</th>
              <th className="py-2 pr-4">{t('admin.fields.price')}</th>
              <th className="py-2 pr-4">{t('admin.fields.durationMinutes')}</th>
              <th className="py-2 pr-4">{t('admin.fields.active')}</th>
              <th className="py-2 pr-4" />
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b border-muted/10 text-cream">
                <td className="py-2 pr-4">{service.nameEn}</td>
                <td className="py-2 pr-4">${service.price}</td>
                <td className="py-2 pr-4">{service.durationMinutes}</td>
                <td className="py-2 pr-4">{service.active ? '✓' : '—'}</td>
                <td className="flex gap-2 py-2 pr-4">
                  <Button variant="secondary" className="px-3 py-1 text-xs" onClick={() => startEdit(service)}>
                    {t('admin.edit')}
                  </Button>
                  <Button
                    variant="secondary"
                    className="px-3 py-1 text-xs"
                    onClick={() => deleteService(service.id)}
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
            label={t('admin.fields.nameEn')}
            value={form.nameEn}
            onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
            required
          />
          <Input
            label={t('admin.fields.nameTo')}
            value={form.nameTo}
            onChange={(e) => setForm({ ...form, nameTo: e.target.value })}
            required
          />
          <Input
            label={t('admin.fields.price')}
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            required
          />
          <Input
            label={t('admin.fields.durationMinutes')}
            type="number"
            min={0}
            value={form.durationMinutes}
            onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })}
            required
          />
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
