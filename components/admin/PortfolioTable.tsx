import React from 'react';
import Image from 'next/image';

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  status: 'Published' | 'Draft' | 'Archived';
  isFeatured: boolean;
  thumbnailUrl: string;
};

export default function PortfolioTable({ projects }: { projects: PortfolioProject[] }) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-sm">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-black/50 text-sm text-zinc-500 dark:text-zinc-400">
            <th className="p-4 font-medium">Project</th>
            <th className="p-4 font-medium">Category</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium">Featured</th>
            <th className="p-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5 dark:divide-white/5">
          {projects.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-8 text-center text-zinc-500 dark:text-zinc-400">
                No projects found.
              </td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr key={project.id} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-12 relative rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-black/5 dark:border-white/5 shrink-0">
                      {project.thumbnailUrl ? (
                        <Image src={project.thumbnailUrl} alt={project.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-purple-500/10 dark:bg-purple-500/20" />
                      )}
                    </div>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{project.title}</span>
                  </div>
                </td>
                <td className="p-4 text-zinc-600 dark:text-zinc-400">{project.category}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                    project.status === 'Published' 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                      : project.status === 'Draft'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                      : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="p-4">
                  {project.isFeatured ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/10 text-purple-500" title="Featured">
                      ★
                    </span>
                  ) : (
                    <span className="text-zinc-300 dark:text-zinc-700">-</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-zinc-500 hover:text-purple-500 hover:bg-purple-500/10 rounded-lg transition-colors" title="Edit">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
