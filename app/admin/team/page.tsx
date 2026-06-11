import React from 'react';
import { getTeamMembers } from '@/lib/supabase/team';
import TeamTable from '@/components/admin/TeamTable';

export const metadata = {
  title: 'Team | Arqovia CMS',
};

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();
  
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">Team Members</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Manage the team members displayed on the public website.</p>
      </div>

      <TeamTable teamMembers={teamMembers} />
    </div>
  );
}
