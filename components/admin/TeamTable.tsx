import React from 'react';
import Image from 'next/image';
import { TeamMember } from '@/lib/supabase/team';

interface TeamTableProps {
  teamMembers: TeamMember[];
}

export default function TeamTable({ teamMembers }: TeamTableProps) {
  if (teamMembers.length === 0) {
    return (
      <div className="w-full">
        <div className="mb-6 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Team Member
          </button>
        </div>
        <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-black/10 dark:border-white/10 rounded-3xl bg-white dark:bg-zinc-900/50">
          <div className="w-16 h-16 mb-4 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No team members yet</h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-center max-w-sm">Get started by creating your first team member to display on the public website.</p>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Team Member
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Team Member
        </button>
      </div>

      <div className="w-full overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-black/50 text-sm text-zinc-500 dark:text-zinc-400">
              <th className="p-4 font-medium">Photo & Name</th>
              <th className="p-4 font-medium">Position</th>
              <th className="p-4 font-medium">Order</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {teamMembers.map((member) => (
              <tr key={member.id} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 relative rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-black/5 dark:border-white/5 shrink-0 flex items-center justify-center">
                      {member.image_url ? (
                        member.image_url.startsWith('/') ? (
                          <Image src={member.image_url} alt={member.name} fill className="object-cover" />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                        )
                      ) : (
                        <div className="w-full h-full bg-purple-500/10 dark:bg-purple-500/20" />
                      )}
                    </div>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{member.name}</span>
                  </div>
                </td>
                <td className="p-4 text-zinc-600 dark:text-zinc-400">{member.role}</td>
                <td className="p-4 text-zinc-600 dark:text-zinc-400">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-zinc-100 dark:bg-white/5 text-xs font-medium border border-black/5 dark:border-white/5">
                    {member.display_order}
                  </span>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-500/20">
                    Active
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      disabled
                      className="p-2 text-zinc-400 hover:text-zinc-400 rounded-lg cursor-not-allowed opacity-50 block" 
                      title="Edit (Coming Soon)"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button 
                      disabled
                      className="p-2 text-zinc-400 hover:text-zinc-400 rounded-lg cursor-not-allowed opacity-50 block" 
                      title="Delete (Coming Soon)"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
