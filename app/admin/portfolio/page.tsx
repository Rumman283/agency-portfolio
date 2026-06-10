import React from 'react';
import PortfolioClientWrapper from '@/components/admin/PortfolioClientWrapper';
import { getPortfolioProjects } from '@/lib/supabase/portfolio';

export default async function PortfolioManagementPage() {
  const projects = await getPortfolioProjects();

  return <PortfolioClientWrapper initialProjects={projects} />;
}
