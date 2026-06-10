import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DeleteProjectButton from './DeleteProjectButton';
import { PortfolioProject } from '@/lib/supabase/portfolio';

export default function PortfolioTable({ projects }: { projects: PortfolioProject[] }) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-black/10 dark:border-white/10 rounded-3xl bg-white dark:bg-zinc-900/50">
        <div className="w-16 h-16 mb-4 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No projects yet</h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-center max-w-sm">Get started by creating your first portfolio project to showcase your work.</p>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors shadow-sm">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Project
        </button>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-sm">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-black/50 text-sm text-zinc-500 dark:text-zinc-400">
            <th className="p-4 font-medium">Project</th>
            <th className="p-4 font-medium">Category</th>
            <th className="p-4 font-medium">Link</th>
            <th className="p-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5 dark:divide-white/5">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors group">
              <td className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 relative rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-black/5 dark:border-white/5 shrink-0 flex items-center justify-center text-xs text-zinc-400">
                    {project.image_url ? (
                      project.image_url.startsWith('/') ? (
                        <Image src={project.image_url} alt={project.title} fill className="object-cover" />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                      )
                    ) : (
                      <div className="w-full h-full bg-purple-500/10 dark:bg-purple-500/20" />
                    )}
                  </div>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{project.title}</span>
                </div>
              </td>
              <td className="p-4 text-zinc-600 dark:text-zinc-400">{project.category}</td>
              <td className="p-4">
                {project.project_url ? (
                  <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-400 text-sm underline transition-colors">
                    View Project
                  </a>
                ) : (
                  <button 
                    disabled 
                    title="No project URL available" 
                    className="px-3 py-1 text-xs font-medium bg-zinc-100 dark:bg-white/5 text-zinc-400 dark:text-zinc-500 rounded-lg cursor-not-allowed border border-black/5 dark:border-white/5"
                  >
                    No Link
                  </button>
                )}
              </td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/admin/portfolio/edit/${project.id}`} className="p-2 text-zinc-500 hover:text-purple-500 hover:bg-purple-500/10 rounded-lg transition-colors block" title="Edit">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </Link>
                  <DeleteProjectButton projectId={project.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
