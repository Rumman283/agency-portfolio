import React from 'react';
import { login } from '../actions';

export default async function AdminLogin(props: { searchParams: Promise<{ message: string }> }) {
  const searchParams = await props.searchParams;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-3xl shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        
        {searchParams?.message && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
            {searchParams.message}
          </div>
        )}

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400 px-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full bg-zinc-50 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 text-zinc-900 dark:text-white outline-none transition-colors"
              id="email"
              name="email"
              type="email"
              placeholder="admin@example.com"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400 px-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full bg-zinc-50 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 text-zinc-900 dark:text-white outline-none transition-colors"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            formAction={login}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-black font-bold text-base hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
