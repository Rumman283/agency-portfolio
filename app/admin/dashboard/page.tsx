import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-8 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="p-8 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-sm">
          <p className="text-zinc-600 dark:text-zinc-400">Welcome to the CMS Dashboard. Content management features coming soon.</p>
        </div>
      </div>
    </div>
  );
}
