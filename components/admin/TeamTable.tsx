'use client';

import React from 'react';
import { TeamMember } from '@/lib/supabase/team';

interface TeamTableProps {
  teamMembers: TeamMember[];
}

export default function TeamTable({ teamMembers }: TeamTableProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden p-8 text-center">
      <p className="text-zinc-500 dark:text-zinc-400">TeamTable placeholder. Found {teamMembers.length} members.</p>
    </div>
  );
}
