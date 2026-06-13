'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { createTeamMember, updateTeamMember, deleteTeamMember } from '@/lib/supabase/team'

async function uploadTeamImage(file: File): Promise<{ url?: string; error?: string }> {
  try {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return { error: 'Invalid file type. Only JPG, PNG, and WEBP are allowed.' };
    }

    if (file.size > 2 * 1024 * 1024) {
      return { error: 'File size must be less than 2MB.' };
    }

    const supabase = await createClient();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${Date.now()}-${crypto.randomUUID()}-${sanitizedName}`;

    const { data, error: uploadError } = await supabase.storage
      .from('team-images')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return { error: `Storage upload failed: ${uploadError.message || 'Unknown error'}` };
    }

    const { data: { publicUrl } } = supabase.storage
      .from('team-images')
      .getPublicUrl(data.path);

    return { url: publicUrl };
  } catch (err) {
    console.error('Error in uploadTeamImage:', err);
    return { error: 'An unexpected error occurred during image upload.' };
  }
}

export async function createTeamMemberAction(formData: FormData) {
  try {
    const supabase = await createClient()

    // Verify authentication server-side before inserting
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { error: 'Unauthorized' }
    }

    const name = formData.get('full_name') as string
    const role = formData.get('position') as string
    const bio = formData.get('short_bio') as string | null
    const display_order_str = formData.get('display_order') as string
    const is_active_str = formData.get('is_active') as string
    
    const imageFile = formData.get('image_file') as File | null;
    let image_url: string | null = null;

    if (imageFile && imageFile.size > 0) {
      const uploadResult = await uploadTeamImage(imageFile);
      if (uploadResult.error) {
        return { error: uploadResult.error };
      }
      if (uploadResult.url) {
        image_url = uploadResult.url;
      }
    }

    if (!name || !name.trim() || !role || !role.trim()) {
      return { error: 'Full Name and Position are required fields.' }
    }

    const display_order = display_order_str ? parseInt(display_order_str, 10) : 0
    const is_active = is_active_str === 'true'

    const result = await createTeamMember({
      name: name.trim(),
      role: role.trim(),
      bio: bio ? bio.trim() : null,
      image_url,
      linkedin_url: null,
      github_url: null,
      email: null,
      display_order,
      is_active
    })

    if (!result) {
      return { error: 'Failed to create team member in the database.' }
    }

    revalidatePath('/admin/team')
    return { success: true }
  } catch (error) {
    console.error('Error in createTeamMemberAction:', error)
    return { error: 'An unexpected error occurred.' }
  }
}

export async function deleteTeamMemberAction(id: string) {
  try {
    const supabase = await createClient()

    // Verify authentication server-side before deleting
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { error: 'Unauthorized' }
    }

    const result = await deleteTeamMember(id)

    if (!result) {
      return { error: 'Failed to delete team member.' }
    }

    revalidatePath('/admin/team')
    return { success: true }
  } catch (error) {
    console.error('Error in deleteTeamMemberAction:', error)
    return { error: 'An unexpected error occurred.' }
  }
}

export async function updateTeamMemberAction(formData: FormData) {
  try {
    const supabase = await createClient()

    // Verify authentication server-side before updating
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { error: 'Unauthorized' }
    }

    const id = formData.get('id') as string
    const name = formData.get('full_name') as string
    const role = formData.get('position') as string
    const bio = formData.get('short_bio') as string | null
    const display_order_str = formData.get('display_order') as string
    const is_active_str = formData.get('is_active') as string

    if (!id) {
      return { error: 'Team member ID is missing.' }
    }

    if (!name || !name.trim() || !role || !role.trim()) {
      return { error: 'Full Name and Position are required fields.' }
    }

    const display_order = display_order_str ? parseInt(display_order_str, 10) : 0
    const is_active = is_active_str === 'true'

    const imageFile = formData.get('image_file') as File | null;
    let image_url: string | undefined = undefined;

    if (imageFile && imageFile.size > 0) {
      const uploadResult = await uploadTeamImage(imageFile);
      if (uploadResult.error) {
        return { error: uploadResult.error };
      }
      if (uploadResult.url) {
        image_url = uploadResult.url;
      }
    }

    const updatePayload: any = {
      name: name.trim(),
      role: role.trim(),
      bio: bio ? bio.trim() : null,
      display_order,
      is_active
    };

    if (image_url !== undefined) {
      updatePayload.image_url = image_url;
    }

    const result = await updateTeamMember(id, updatePayload);

    if (!result) {
      return { error: 'Failed to update team member in the database.' }
    }

    revalidatePath('/admin/team')
    return { success: true }
  } catch (error) {
    console.error('Error in updateTeamMemberAction:', error)
    return { error: 'An unexpected error occurred.' }
  }
}

export async function reorderTeamMembersAction(updates: { id: string; display_order: number }[]) {
  try {
    const supabase = await createClient()

    // Verify authentication server-side before updating
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { error: 'Unauthorized' }
    }

    if (!Array.isArray(updates) || updates.length === 0) {
      return { error: 'No updates provided.' }
    }

    // Process updates sequentially or in parallel using Promise.all
    await Promise.all(
      updates.map((update) => 
        updateTeamMember(update.id, { display_order: update.display_order })
      )
    )

    revalidatePath('/admin/team')
    return { success: true }
  } catch (error) {
    console.error('Error in reorderTeamMembersAction:', error)
    return { error: 'An unexpected error occurred while reordering.' }
  }
}
