import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { LanguageToggle } from '../components/layout/LanguageToggle';
import { signOutAdmin } from '../lib/auth';
import { AppointmentsTable } from '../components/admin/AppointmentsTable';
import { ReviewsModeration } from '../components/admin/ReviewsModeration';
import { ServicesManager } from '../components/admin/ServicesManager';
import { BarbersManager } from '../components/admin/BarbersManager';

const TABS = [
  { key: 'appointments', labelKey: 'admin.appointments', Component: AppointmentsTable },
  { key: 'moderation', labelKey: 'admin.moderation', Component: ReviewsModeration },
  { key: 'services', labelKey: 'admin.servicesManagement', Component: ServicesManager },
  { key: 'barbers', labelKey: 'admin.barbersManagement', Component: BarbersManager },
] as const;

export function AdminDashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['key']>('appointments');

  const ActiveComponent = TABS.find((tab) => tab.key === activeTab)?.Component ?? AppointmentsTable;

  return (
    <div className="min-h-screen bg-bg px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl text-cream">{t('admin.dashboard')}</h1>
          <div className="flex flex-wrap items-center gap-3">
            <LanguageToggle />
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-teal px-6 py-2.5 font-body font-semibold text-teal transition-colors hover:bg-teal/10"
            >
              {t('admin.backToSite')}
            </Link>
            <Button variant="secondary" onClick={() => signOutAdmin()}>
              {t('admin.signOut')}
            </Button>
          </div>
        </div>

        <div className="mt-8 flex gap-2 border-b border-muted/20">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-semibold ${
                activeTab === tab.key ? 'border-b-2 border-coral text-cream' : 'text-muted hover:text-cream'
              }`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}
