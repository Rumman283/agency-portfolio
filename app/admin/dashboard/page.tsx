import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { logout } from '../actions';

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen p-8 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <form action={logout}>
            <button className="px-5 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm font-medium shadow-sm">
              Sign Out
            </button>
          </form>
        </div>
        
        <div className="p-8 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-3xl shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Welcome back</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">You are logged in as <span className="font-medium text-zinc-900 dark:text-white">{user.email}</span></p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-black/50 border border-black/5 dark:border-white/5">
              <h3 className="font-semibold mb-1">Portfolio Items</h3>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-black/50 border border-black/5 dark:border-white/5">
              <h3 className="font-semibold mb-1">Messages</h3>
              <p className="text-2xl font-bold">48</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-black/50 border border-black/5 dark:border-white/5">
              <h3 className="font-semibold mb-1">Page Views</h3>
              <p className="text-2xl font-bold">14.2k</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
