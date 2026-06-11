'use client';

import React, { useState, useEffect, useRef } from 'react';
import { deleteTeamMemberAction } from '@/app/admin/team/actions';

export default function DeleteTeamMemberButton({ memberId }: { memberId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancelRef = useRef<HTMLButtonElement>(null);

  // Handle mount/unmount animations and focus
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setError(null);
      // Wait for React to mount the modal, then focus the cancel button
      setTimeout(() => cancelRef.current?.focus(), 10);
    } else {
      const timer = setTimeout(() => setIsRendered(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isPending) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPending]);

  async function handleDelete() {
    setIsPending(true);
    setError(null);

    try {
      const result = await deleteTeamMemberAction(memberId);
      if (result?.error) {
        setError(result.error);
        setIsPending(false);
      } else {
        setIsOpen(false);
        setIsPending(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
      setIsPending(false);
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors block" 
        title="Delete Team Member"
        aria-label="Delete team member"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      {isRendered && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${isOpen ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'}`} 
          onClick={() => !isPending && setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`delete-title-${memberId}`}
          aria-describedby={`delete-desc-${memberId}`}
        >
          <div 
            className={`bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-[440px] shadow-2xl transition-all duration-200 ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-5">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 id={`delete-title-${memberId}`} className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Delete Team Member?</h3>
              <p id={`delete-desc-${memberId}`} className="text-zinc-600 dark:text-zinc-400 text-sm">
                This action cannot be undone. The selected team member will be permanently removed.
              </p>
            </div>
            
            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm text-center">
                {error}
              </div>
            )}

            <div className="flex gap-3 justify-center w-full">
              <button 
                ref={cancelRef}
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="flex-1 px-4 py-3 rounded-xl text-zinc-900 dark:text-white bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 font-medium transition-colors disabled:opacity-50 outline-none focus:ring-2 focus:ring-zinc-500/30"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                disabled={isPending}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-red-500/50"
              >
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
