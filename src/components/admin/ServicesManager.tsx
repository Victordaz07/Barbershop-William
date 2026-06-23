import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdminServices } from '../../hooks/useAdminServices';
import { createService, deleteService, updateService, type NewServiceInput } from '../../lib/services';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import type { Service } from '../../types/service';

const MIN_IMAGE_FIELDS = 2;

const EMPTY_FORM: NewServiceInput = {
  nameEn: '',
  nameTo: '',
  price: 0,
  durationMinutes: 0,
  active: true,
  imageUrls: ['', ''],
};

export function ServicesManager() {
  const { t } = useTranslation();
  const { services } = useAdminServices();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<NewServiceInput>(EMPTY_FORM);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  function startEdit(service: Service) {
    setEditingId(service.id);
    setForm({
      nameEn: service.nameEn,
      nameTo: service.nameTo,
      price: service.price,
      durationMinutes: service.durationMinutes,
      active: service.active,
      imageUrls:
        service.imageUrls && service.imageUrls.length >= MIN_IMAGE_FIELDS
          ? service.imageUrls
          : [...(service.imageUrls ?? []), '', ''].slice(0, MIN_IMAGE_FIELDS),
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const input = { ...form, imageUrls: form.imageUrls?.filter((url) => url.trim() !== '') };
    if (editingId) {
      await updateService(editingId, input);
    } else {
      await createService(input);
    }
    resetForm();
  }

  function updateImageUrl(index: number, value: string) {
    const next = [...(form.imageUrls ?? [])];
    next[index] = value;
    setForm({ ...form, imageUrls: next });
  }

  function removeImageUrl(index: number) {
    setForm({ ...form, imageUrls: (form.imageUrls ?? []).filter((_, i) => i !== index) });
  }

  function addImageUrl() {
    setForm({ ...form, imageUrls: [...(form.imageUrls ?? []), ''] });
  }

  return (
    <div className="flex flex-col gap-8">
      <ConfirmDialog
        open={pendingDeleteId !== null}
        message={t('admin.confirmDeleteService')}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (pendingDeleteId) deleteService(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-muted/20 text-muted">
              <th className="py-2 pr-4" />
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
                <td className="py-2 pr-4">
                  {service.imageUrls?.[0] ? (
                    <img src={service.imageUrls[0]} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  ) : (
                    <div className="h-10 w-10 rounded-lg bg-bg2" />
                  )}
                </td>
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
                    onClick={() => setPendingDeleteId(service.id)}
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
          <div className="sm:col-span-2 flex flex-col gap-4">
            {(form.imageUrls ?? []).map((url, index) => (
              <div key={index} className="flex items-end gap-2">
                <div className="flex-1">
                  <Input
                    label={`${t('admin.fields.imageUrl')} ${index + 1}`}
                    value={url}
                    onChange={(e) => updateImageUrl(index, e.target.value)}
                  />
                </div>
                {url && <img src={url} alt="" className="h-11 w-11 rounded-lg object-cover" />}
                {(form.imageUrls?.length ?? 0) > MIN_IMAGE_FIELDS && (
                  <Button
                    type="button"
                    variant="secondary"
                    className="px-3 py-2.5 text-xs"
                    onClick={() => removeImageUrl(index)}
                  >
                    {t('admin.delete')}
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="secondary" className="self-start px-3 py-1.5 text-xs" onClick={addImageUrl}>
              {t('admin.addImage')}
            </Button>
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
