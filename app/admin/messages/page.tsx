import React from 'react';
import { getContactMessages } from '@/lib/supabase/messages';
import MessagesTable from '@/components/admin/MessagesTable';

export const metadata = {
  title: 'Messages | Arqovia CMS',
};

export default async function MessagesPage() {
  const messages = await getContactMessages();
  
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">Contact Messages</h1>
        <p className="text-zinc-600 dark:text-zinc-400">View and manage inquiries submitted through the public contact form.</p>
      </div>

      <MessagesTable messages={messages} />
    </div>
  );
}
