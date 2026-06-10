'use client';

import React, { useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface ImageUploadFieldProps {
  onUploadSuccess: (url: string) => void;
}

export default function ImageUploadField({ onUploadSuccess }: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a JPG, PNG, or WEBP image.');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const supabase = createClient();
      
      // Create unique filename
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${Date.now()}-${sanitizedName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(data.path);

      onUploadSuccess(publicUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image.';
      setError(errorMessage);
    } finally {
      setIsUploading(false);
      // Reset input so the same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
      />
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 text-zinc-900 dark:text-white font-medium transition-colors border border-black/5 dark:border-white/5 disabled:opacity-50 min-w-[150px] shrink-0"
        >
          {isUploading ? (
            <div className="w-5 h-5 border-2 border-zinc-400 border-t-zinc-900 dark:border-zinc-500 dark:border-t-white rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          )}
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-500 absolute mt-12">{error}</p>
      )}
    </div>
  );
}
