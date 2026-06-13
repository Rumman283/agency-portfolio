'use client';

import React, { useState, useTransition } from 'react';
import { updateSettingsAction } from '@/app/admin/settings/actions';
import type { SiteSettings } from '@/lib/supabase/settings';

interface SettingsFormProps {
  initialSettings: SiteSettings | null;
}

export default function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const inputClasses = "appearance-none m-0 w-full h-12 bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-sm text-zinc-900 dark:text-white transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30";
  const labelClass = "block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2";

  async function handleSubmit(formData: FormData) {
    setMessage(null);
    startTransition(async () => {
      const result = await updateSettingsAction(formData);
      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else if (result.success) {
        setMessage({ type: 'success', text: 'Settings updated successfully.' });
        // Clear success message after 3 seconds
        setTimeout(() => setMessage(null), 3000);
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      {message && (
        <div className={`p-4 rounded-xl text-sm font-medium ${
          message.type === 'error' 
            ? 'bg-red-50/50 dark:bg-red-500/10 border border-red-200/50 dark:border-red-500/20 text-red-600 dark:text-red-400' 
            : 'bg-emerald-50/50 dark:bg-emerald-500/10 border border-emerald-200/50 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
        }`}>
          {message.text}
        </div>
      )}

      <div className="p-8 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-3xl shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white border-b border-black/5 dark:border-white/5 pb-4">General Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Agency Name <span className="text-red-500">*</span></label>
            <input 
              name="agency_name" 
              type="text" 
              required 
              defaultValue={initialSettings?.agency_name || ''} 
              className={inputClasses} 
              placeholder="e.g. Arqovia Digital"
            />
          </div>
          <div>
            <label className={labelClass}>Tagline</label>
            <input 
              name="tagline" 
              type="text" 
              defaultValue={initialSettings?.tagline || ''} 
              className={inputClasses} 
              placeholder="e.g. Elevating Digital Experiences"
            />
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
            <input 
              name="email" 
              type="email" 
              defaultValue={initialSettings?.email || ''} 
              className={inputClasses} 
              placeholder="hello@agency.com"
            />
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input 
              name="phone" 
              type="text" 
              defaultValue={initialSettings?.phone || ''} 
              className={inputClasses} 
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Physical Address</label>
            <input 
              name="address" 
              type="text" 
              defaultValue={initialSettings?.address || ''} 
              className={inputClasses} 
              placeholder="123 Agency Street, Creative City, ST 12345"
            />
          </div>
        </div>
      </div>

      <div className="p-8 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-3xl shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white border-b border-black/5 dark:border-white/5 pb-4">Social Links</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>LinkedIn URL</label>
            <input 
              name="linkedin_url" 
              type="url" 
              defaultValue={initialSettings?.linkedin_url || ''} 
              className={inputClasses} 
              placeholder="https://linkedin.com/company/..."
            />
          </div>
          <div>
            <label className={labelClass}>GitHub URL</label>
            <input 
              name="github_url" 
              type="url" 
              defaultValue={initialSettings?.github_url || ''} 
              className={inputClasses} 
              placeholder="https://github.com/..."
            />
          </div>
          <div>
            <label className={labelClass}>Facebook URL</label>
            <input 
              name="facebook_url" 
              type="url" 
              defaultValue={initialSettings?.facebook_url || ''} 
              className={inputClasses} 
              placeholder="https://facebook.com/..."
            />
          </div>
          <div>
            <label className={labelClass}>Instagram URL</label>
            <input 
              name="instagram_url" 
              type="url" 
              defaultValue={initialSettings?.instagram_url || ''} 
              className={inputClasses} 
              placeholder="https://instagram.com/..."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          type="submit"
          disabled={isPending}
          className="px-8 py-3 rounded-xl text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-px active:scale-[0.98] disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed min-w-[160px]"
        >
          {isPending ? 'Saving Changes...' : 'Save Settings'}
        </button>
      </div>
    </form>
  );
}
