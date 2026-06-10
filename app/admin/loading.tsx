import React from 'react';

export default function AdminLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="w-8 h-8 border-4 border-black/10 border-t-purple-600 dark:border-white/10 dark:border-t-purple-500 rounded-full animate-spin mb-4" />
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Loading data...</h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Please wait while we fetch the latest information.</p>
    </div>
  );
}
