'use client';

import React, { useState, useRef } from 'react';
import { createPortfolioProject, updatePortfolioProject } from '@/app/admin/portfolio/actions';
import { PortfolioProject } from '@/lib/supabase/portfolio';
import ImageUploadField from './ImageUploadField';

export default function PortfolioForm({ initialData }: { initialData?: PortfolioProject }) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [previewUrl, setPreviewUrl] = useState(initialData?.image_url || '');
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleUploadSuccess = (url: string) => {
    if (imageInputRef.current) {
      imageInputRef.current.value = url;
    }
    setPreviewUrl(url);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setError(null);
    
    const formData = new FormData(event.currentTarget);
    
    try {
      if (initialData) {
        await updatePortfolioProject(initialData.id, formData);
      } else {
        await createPortfolioProject(formData);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 p-6 md:p-8 rounded-3xl shadow-sm">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Project Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={initialData?.title}
            className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-black border border-black/10 dark:border-white/10 rounded-xl outline-none focus:border-purple-500 transition-colors text-zinc-900 dark:text-white"
            placeholder="e.g. Lumina E-Commerce"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Category *</label>
          <input
            id="category"
            name="category"
            type="text"
            required
            defaultValue={initialData?.category}
            className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-black border border-black/10 dark:border-white/10 rounded-xl outline-none focus:border-purple-500 transition-colors text-zinc-900 dark:text-white"
            placeholder="e.g. Web App"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Description *</label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={initialData?.description}
          className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-black border border-black/10 dark:border-white/10 rounded-xl outline-none focus:border-purple-500 transition-colors text-zinc-900 dark:text-white resize-none"
          placeholder="Briefly describe the project and goals..."
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="image_url" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Image URL *</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              id="image_url"
              name="image_url"
              type="text"
              required
              ref={imageInputRef}
              defaultValue={initialData?.image_url}
              onChange={(e) => setPreviewUrl(e.target.value)}
              className="flex-1 w-full px-4 py-2.5 bg-zinc-50 dark:bg-black border border-black/10 dark:border-white/10 rounded-xl outline-none focus:border-purple-500 transition-colors text-zinc-900 dark:text-white"
              placeholder="https://example.com/image.jpg or /local-path.jpg"
            />
            <ImageUploadField onUploadSuccess={handleUploadSuccess} />
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Must be a valid URL or an absolute local path (starting with /).</p>
        </div>

        {previewUrl && (
          <div className="w-full max-w-xs h-40 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative flex items-center justify-center">
            {/* Using standard img for preview to handle external domains without errors */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={previewUrl} 
              alt="Image Preview" 
              className="w-full h-full object-cover" 
              onError={(e) => {
                // If image fails to load, hide the image and show a fallback text
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling) {
                  (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                }
              }}
            />
            <span className="hidden text-zinc-400 text-sm p-4 text-center">Invalid image URL or unable to load preview.</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="project_url" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Project Link (Optional)</label>
        <input
          id="project_url"
          name="project_url"
          type="url"
          defaultValue={initialData?.project_url || ''}
          className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-black border border-black/10 dark:border-white/10 rounded-xl outline-none focus:border-purple-500 transition-colors text-zinc-900 dark:text-white"
          placeholder="https://example.com"
        />
      </div>

      <div className="pt-4 flex items-center justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center min-w-[140px] px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : initialData ? (
            'Update Project'
          ) : (
            'Save Project'
          )}
        </button>
      </div>
    </form>
  );
}
