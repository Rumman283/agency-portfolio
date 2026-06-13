'use client';

import React, { useState, useTransition, useRef, useEffect } from 'react';
import Image from 'next/image';
import { TeamMember } from '@/lib/supabase/team';
import { createTeamMemberAction, updateTeamMemberAction, reorderTeamMembersAction } from '@/app/admin/team/actions';
import DeleteTeamMemberButton from './DeleteTeamMemberButton';

interface TeamTableProps {
  teamMembers: TeamMember[];
}

export default function TeamTable({ teamMembers }: TeamTableProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);

  const [localTeamMembers, setLocalTeamMembers] = useState(teamMembers);
  const [draggedMemberId, setDraggedMemberId] = useState<string | null>(null);
  const [dragOverMemberId, setDragOverMemberId] = useState<string | null>(null);
  const [isReordering, startReorderTransition] = useTransition();

  useEffect(() => {
    setLocalTeamMembers(teamMembers);
  }, [teamMembers]);

  // Micro-polished input classes: soft border ring, perfectly centered text with h-12 and px-4
  const inputClasses = "appearance-none m-0 w-full h-12 bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-sm text-zinc-900 dark:text-white transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30";
  // Textarea specific classes: consistent padding
  const textareaClasses = "appearance-none m-0 w-full bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-zinc-900 dark:text-white transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 resize-none";
  
  // Label class
  const labelClass = "block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2";

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingMember(null);
    setIsActive(true);
    setErrorMsg(null);
    setSelectedImageFile(null);
    setLocalPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEditClick = (member: TeamMember) => {
    setEditingMember(member);
    setIsActive(member.is_active);
    setErrorMsg(null);
    setSelectedImageFile(null);
    setLocalPreviewUrl(member.image_url);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsAddModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Please select a JPG, PNG, or WEBP image.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrorMsg('Image size must be less than 2MB.');
      return;
    }

    setErrorMsg(null);
    setSelectedImageFile(file);
    setLocalPreviewUrl(URL.createObjectURL(file));
  };

  async function handleSubmit(formData: FormData) {
    setErrorMsg(null);
    formData.set('is_active', isActive.toString());
    if (editingMember) {
      formData.set('id', editingMember.id);
    }
    if (selectedImageFile) {
      formData.set('image_file', selectedImageFile);
    }
    
    startTransition(async () => {
      const result = editingMember 
        ? await updateTeamMemberAction(formData)
        : await createTeamMemberAction(formData);
        
      if (result.error) {
        setErrorMsg(result.error);
      } else if (result.success) {
        handleCloseModal();
      }
    });
  }

  return (
    <>
      <div className="w-full">
        {localTeamMembers.length > 0 && (
          <div className="mb-6 flex justify-end">
            <button 
              onClick={() => {
                setEditingMember(null);
                setIsActive(true);
                setSelectedImageFile(null);
                setLocalPreviewUrl(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all shadow-sm hover:shadow-md hover:-translate-y-px"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Team Member
            </button>
          </div>
        )}

        {localTeamMembers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-black/10 dark:border-white/10 rounded-3xl bg-white dark:bg-zinc-900/50">
            <div className="w-16 h-16 mb-4 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No team members yet</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-center max-w-sm">Get started by creating your first team member to display on the public website.</p>
            <button 
              onClick={() => {
                setEditingMember(null);
                setIsActive(true);
                setSelectedImageFile(null);
                setLocalPreviewUrl(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all shadow-sm hover:shadow-md hover:-translate-y-px"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Team Member
            </button>
          </div>
        ) : (
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
                {localTeamMembers.map((member) => (
                  <tr 
                    key={member.id} 
                    draggable={!isReordering}
                    onDragStart={(e) => {
                      if (isReordering) {
                        e.preventDefault();
                        return;
                      }
                      setDraggedMemberId(member.id);
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    onDragOver={(e) => {
                      if (isReordering) return;
                      e.preventDefault();
                      if (dragOverMemberId !== member.id) {
                        setDragOverMemberId(member.id);
                      }
                    }}
                    onDragLeave={() => {
                      if (dragOverMemberId === member.id) {
                        setDragOverMemberId(null);
                      }
                    }}
                    onDragEnd={() => {
                      setDraggedMemberId(null);
                      setDragOverMemberId(null);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (isReordering || !draggedMemberId || draggedMemberId === member.id) {
                        setDraggedMemberId(null);
                        setDragOverMemberId(null);
                        return;
                      }

                      const draggedIndex = localTeamMembers.findIndex(m => m.id === draggedMemberId);
                      const dropIndex = localTeamMembers.findIndex(m => m.id === member.id);

                      if (draggedIndex === -1 || dropIndex === -1) return;

                      const newOrder = [...localTeamMembers];
                      const [draggedItem] = newOrder.splice(draggedIndex, 1);
                      newOrder.splice(dropIndex, 0, draggedItem);

                      // 1. Skip server updates if the order did not actually change.
                      const isSameOrder = localTeamMembers.every((m, index) => m.id === newOrder[index].id);
                      if (isSameOrder) {
                        setDraggedMemberId(null);
                        setDragOverMemberId(null);
                        return;
                      }

                      // 2. Preserve Existing Sort Fallback & Persist a fresh sequential display_order
                      const updatedMembers = newOrder.map((m, index) => ({
                        ...m,
                        display_order: index
                      }));

                      setLocalTeamMembers(updatedMembers);
                      setDraggedMemberId(null);
                      setDragOverMemberId(null);

                      // Only send updates for members whose display_order actually changed
                      const updates = updatedMembers
                        .filter(m => {
                          const orig = localTeamMembers.find(o => o.id === m.id);
                          return !orig || orig.display_order !== m.display_order;
                        })
                        .map(m => ({ id: m.id, display_order: m.display_order }));
                      
                      if (updates.length > 0) {
                        startReorderTransition(async () => {
                          const result = await reorderTeamMembersAction(updates);
                          if (result.error) {
                            setErrorMsg(result.error);
                            setLocalTeamMembers(teamMembers); // Revert on error
                          }
                        });
                      }
                    }}
                    className={`hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors group ${
                      draggedMemberId === member.id ? 'opacity-40' : ''
                    } ${
                      dragOverMemberId === member.id ? 'bg-purple-50/80 dark:bg-purple-500/10 shadow-[inset_0_2px_0_0_theme(colors.purple.500)]' : ''
                    } ${isReordering ? 'opacity-50 cursor-wait bg-zinc-50/50 dark:bg-white/[0.01]' : 'cursor-grab active:cursor-grabbing'}`}
                  >
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
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${
                        member.is_active 
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                          : 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20'
                      }`}>
                        {member.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEditClick(member)}
                          className="p-2 text-zinc-400 hover:text-purple-600 rounded-lg transition-colors block" 
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <DeleteTeamMemberButton memberId={member.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div 
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 w-full max-w-[700px] shadow-2xl flex flex-col max-h-[90vh] transform transition-all duration-300 scale-100 opacity-100"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6 shrink-0">
              <div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  {editingMember ? 'Edit Team Member' : 'Add Team Member'}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  {editingMember ? 'Update the details of this team member.' : 'Create a new team profile for the public website.'}
                </p>
              </div>
              <button 
                onClick={handleCloseModal}
                className="p-2 -mr-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                disabled={isPending}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-50/50 dark:bg-red-500/10 border border-red-200/50 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium shrink-0">
                {errorMsg}
              </div>
            )}

            {/* Form Wrapper */}
            <form action={handleSubmit} className="flex-1 overflow-hidden flex flex-col min-h-0">
              {/* Body (with custom thin scrollbar) */}
              <div className="flex-1 overflow-y-auto pr-3 -mr-3 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-200 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full">
                
                {/* Compact Photo Upload Area */}
                <div>
                  <label className={labelClass}>Team Photo</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept=".jpg,.jpeg,.png,.webp"
                    className="hidden"
                  />
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-8 flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:border-purple-500/40 dark:hover:border-purple-500/40 transition-all cursor-pointer group"
                  >
                    <div className="w-16 h-16 mb-3 relative rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm flex items-center justify-center overflow-hidden text-zinc-500 dark:text-zinc-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:scale-105 transition-all duration-200">
                      {localPreviewUrl ? (
                        <Image src={localPreviewUrl} alt="Preview" fill className="object-cover" />
                      ) : (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Click to upload photo</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 tracking-wide">
                      {selectedImageFile ? selectedImageFile.name : (localPreviewUrl ? 'Existing image loaded' : 'PNG, JPG or WEBP (max 2MB)')}
                    </p>
                  </div>
                </div>

                {/* Grid for Name & Position */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                    <input 
                      name="full_name"
                      type="text" 
                      required
                      defaultValue={editingMember?.name || ''}
                      placeholder="e.g. Jane Doe"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Position <span className="text-red-500">*</span></label>
                    <input 
                      name="position"
                      type="text" 
                      required
                      defaultValue={editingMember?.role || ''}
                      placeholder="e.g. Lead Designer"
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className={labelClass}>Short Bio</label>
                  <textarea 
                    name="short_bio"
                    rows={3}
                    defaultValue={editingMember?.bio || ''}
                    placeholder="A brief description of their role and background..."
                    className={textareaClasses}
                  ></textarea>
                </div>

                {/* Grid for Order & Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  <div>
                    <label className={labelClass}>Display Order</label>
                    <div className="relative">
                      <input 
                        name="display_order"
                        type="number" 
                        defaultValue={editingMember ? editingMember.display_order : 0}
                        className={inputClasses}
                      />
                      <p className="text-[13px] text-zinc-500 dark:text-zinc-400 mt-2 absolute">Lower numbers appear first</p>
                    </div>
                  </div>
                  
                  {/* Micro-Polished Status Toggle */}
                  <div>
                    <label className={labelClass}>Status</label>
                    <div 
                      className={`flex items-center h-12 border rounded-xl px-4 justify-between transition-all duration-300 ${
                        isActive 
                          ? 'bg-emerald-50/40 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20' 
                          : 'bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span 
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            isActive 
                              ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' 
                              : 'bg-zinc-400 dark:bg-zinc-600'
                          }`}
                        ></span>
                        <span className={`text-sm font-medium transition-colors ${
                          isActive 
                            ? 'text-emerald-800 dark:text-emerald-400' 
                            : 'text-zinc-600 dark:text-zinc-400'
                        }`}>
                          {isActive ? 'Active on Website' : 'Inactive'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsActive(!isActive)}
                        className={`relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/30 ${
                          isActive ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'
                        }`}
                      >
                        <span className="sr-only">Toggle Active Status</span>
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                            isActive ? 'translate-x-[22px]' : 'translate-x-[3px]'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer Buttons with elevated interaction */}
              <div className="mt-8 pt-5 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-3 shrink-0">
                <button 
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isPending}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-px active:scale-[0.98] disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed min-w-[160px]"
                >
                  {isPending ? 'Saving...' : (editingMember ? 'Update Team Member' : 'Save Team Member')}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
}
