import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/admin/login');
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Dashboard Overview</h1>
      </div>
      
      <div className="p-8 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-3xl shadow-sm">
        <h2 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">Welcome back</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">You are logged in as <span className="font-medium text-zinc-900 dark:text-white">{user.email}</span></p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-black/50 border border-black/5 dark:border-white/5">
            <h3 className="font-semibold mb-1 text-zinc-900 dark:text-white">Portfolio Items</h3>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">12</p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-black/50 border border-black/5 dark:border-white/5">
            <h3 className="font-semibold mb-1 text-zinc-900 dark:text-white">Messages</h3>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">48</p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-black/50 border border-black/5 dark:border-white/5">
            <h3 className="font-semibold mb-1 text-zinc-900 dark:text-white">Page Views</h3>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">14.2k</p>
          </div>
        </div>
      </div>
    </div>
  );
}
