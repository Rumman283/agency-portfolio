import React from 'react';

export default function AdminHeader() {
  return (
    <header className="h-16 px-6 bg-white dark:bg-zinc-950 border-b border-black/5 dark:border-white/5 flex items-center justify-between shrink-0">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">CMS Administration</h2>
    </header>
  );
}
