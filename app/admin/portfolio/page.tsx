'use client';

import React, { useState } from 'react';
import PortfolioTable, { PortfolioProject } from '@/components/admin/PortfolioTable';

const MOCK_PROJECTS: PortfolioProject[] = [
  { id: '1', title: 'Lumina E-Commerce', category: 'E-Commerce', status: 'Published', isFeatured: true, thumbnailUrl: '/portfolio/lumina-ecommerce.webp' },
  { id: '2', title: 'Horizon Real Estate', category: 'Web App', status: 'Published', isFeatured: true, thumbnailUrl: '/portfolio/horizon-real-estate.webp' },
  { id: '3', title: 'TechFlow SaaS', category: 'SaaS', status: 'Draft', isFeatured: false, thumbnailUrl: '/portfolio/techflow-youtube.webp' },
  { id: '4', title: 'Velocity Facebook Ads', category: 'Marketing', status: 'Archived', isFeatured: false, thumbnailUrl: '/portfolio/velocity-facebook-ads.webp' },
];

export default function PortfolioManagementPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredProjects = MOCK_PROJECTS.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Portfolio Management</h1>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors shadow-sm">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Project
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-xl outline-none focus:border-purple-500 dark:focus:border-purple-500 transition-colors text-zinc-900 dark:text-white placeholder:text-zinc-400"
          />
        </div>
        
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-xl outline-none focus:border-purple-500 dark:focus:border-purple-500 transition-colors text-zinc-900 dark:text-white cursor-pointer appearance-none pr-10"
        >
          <option value="All">All Categories</option>
          <option value="E-Commerce">E-Commerce</option>
          <option value="Web App">Web App</option>
          <option value="SaaS">SaaS</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      <PortfolioTable projects={filteredProjects} />
    </div>
  );
}
