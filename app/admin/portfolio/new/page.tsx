import React from 'react';
import Link from 'next/link';
import PortfolioForm from '@/components/admin/PortfolioForm';

export const metadata = {
  title: 'Add New Project | Arqovia CMS',
};

export default function NewPortfolioProjectPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Portfolio
        </Link>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Add New Project</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">Fill out the details below to add a new project to your portfolio.</p>
      </div>
      
      <PortfolioForm />
    </div>
  );
}
