import React from 'react';
import { getSiteSettings } from '@/lib/supabase/settings';
import SettingsForm from '@/components/admin/SettingsForm';

export const metadata = {
  title: 'Settings | Arqovia CMS',
};

export default async function SettingsPage() {
  const initialSettings = await getSiteSettings();

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">Global Settings</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Manage your agency's core information and social links.</p>
      </div>

      <SettingsForm initialSettings={initialSettings} />
    </div>
  );
}
