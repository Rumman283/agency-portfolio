import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/admin/login');
  }

  // Fetch real counts from Supabase
  const { count: portfolioCount } = await supabase
    .from('portfolio_projects')
    .select('*', { count: 'exact', head: true });

  const { count: teamCount } = await supabase
    .from('team_members')
    .select('*', { count: 'exact', head: true });

  const { count: messagesCount } = await supabase
    .from('contact_messages')
    .select('*', { count: 'exact', head: true });

  const { count: unreadMessagesCount } = await supabase
    .from('contact_messages')
    .select('*', { count: 'exact', head: true })
    .eq('is_read', false);

  const { data: recentMessages } = await supabase
    .from('contact_messages')
    .select('id, name, message, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

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
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">{portfolioCount || 0}</p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-black/50 border border-black/5 dark:border-white/5">
            <h3 className="font-semibold mb-1 text-zinc-900 dark:text-white">Messages</h3>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              {messagesCount || 0}
              {unreadMessagesCount ? (
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400 ml-2">
                  ({unreadMessagesCount} unread)
                </span>
              ) : null}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-black/50 border border-black/5 dark:border-white/5">
            <h3 className="font-semibold mb-1 text-zinc-900 dark:text-white">Team Members</h3>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">{teamCount || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-8 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-3xl shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-zinc-900 dark:text-white">Recent Activity</h2>
        {recentMessages && recentMessages.length > 0 ? (
          <div className="space-y-4">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-black/50 border border-black/5 dark:border-white/5">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 text-purple-600 dark:text-purple-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                    {msg.name}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                    {msg.message}
                  </p>
                </div>
                <div className="text-xs text-zinc-400 dark:text-zinc-500 whitespace-nowrap pt-0.5">
                  {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">No recent activity.</p>
        )}
      </div>
    </div>
  );
}
