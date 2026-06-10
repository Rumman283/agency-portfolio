'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ContactMessage } from '@/lib/supabase/messages';
import DeleteMessageButton from './DeleteMessageButton';

export default function MessagesTable({ messages }: { messages: ContactMessage[] }) {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isRendered, setIsRendered] = useState(false);
  
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedMessage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsRendered(true);
      setTimeout(() => closeRef.current?.focus(), 10);
    } else {
      const timer = setTimeout(() => setIsRendered(false), 200);
      return () => clearTimeout(timer);
    }
  }, [selectedMessage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedMessage) {
        setSelectedMessage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMessage]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-black/10 dark:border-white/10 rounded-3xl bg-white dark:bg-zinc-900/50">
        <div className="w-16 h-16 mb-4 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No messages yet</h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-center max-w-sm">When visitors submit the contact form, their messages will appear here.</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-black/50 text-sm text-zinc-500 dark:text-zinc-400">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Company</th>
              <th className="p-4 font-medium">Message</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {messages.map((msg) => (
              <tr key={msg.id} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors group">
                <td className="p-4 font-medium text-zinc-900 dark:text-zinc-100">{msg.name}</td>
                <td className="p-4 text-zinc-600 dark:text-zinc-400">{msg.email}</td>
                <td className="p-4 text-zinc-600 dark:text-zinc-400">{msg.company || '-'}</td>
                <td className="p-4 text-zinc-600 dark:text-zinc-400">
                  <div className="truncate max-w-[200px]" title={msg.message}>
                    {msg.message}
                  </div>
                </td>
                <td className="p-4 text-zinc-600 dark:text-zinc-400 text-sm">
                  {new Date(msg.created_at).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setSelectedMessage(msg)}
                      className="p-2 text-zinc-500 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors" 
                      title="View Message"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <DeleteMessageButton messageId={msg.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isRendered && selectedMessage && (
        <div 
          className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-200 ${selectedMessage ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'}`} 
          onClick={() => setSelectedMessage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className={`bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-[600px] shadow-2xl transition-all duration-200 ${selectedMessage ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6 border-b border-black/5 dark:border-white/5 pb-4">
              <div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">{selectedMessage.name}</h3>
                <a href={`mailto:${selectedMessage.email}`} className="text-blue-500 hover:underline">{selectedMessage.email}</a>
              </div>
              <button 
                ref={closeRef}
                onClick={() => setSelectedMessage(null)}
                className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors outline-none focus:ring-2 focus:ring-zinc-500/30"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Company</span>
                  <p className="text-zinc-900 dark:text-zinc-100 mt-1">{selectedMessage.company || '-'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Budget</span>
                  <p className="text-zinc-900 dark:text-zinc-100 mt-1">{selectedMessage.budget || '-'}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Date Received</span>
                  <p className="text-zinc-900 dark:text-zinc-100 mt-1">{new Date(selectedMessage.created_at).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-black/5 dark:border-white/5">
                <span className="text-sm font-medium text-zinc-400 uppercase tracking-wider block mb-2">Message</span>
                <div className="bg-zinc-50 dark:bg-black/20 p-4 rounded-xl border border-black/5 dark:border-white/5 max-h-[300px] overflow-y-auto whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setSelectedMessage(null)}
                className="px-6 py-2.5 rounded-xl text-white bg-blue-600 hover:bg-blue-700 font-medium transition-colors outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
