'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteContactMessage(id: string) {
  const supabase = await createClient()

  // Verify authentication server-side before deleting
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id)
    .select()

  console.log('[DEBUG] Delete operation:', { id, data, error })

  if (error) {
    console.error('Error deleting contact message:', error)
    return { error: 'Failed to delete message' }
  }

  if (!data || data.length === 0) {
    console.error('[DEBUG] Delete operation returned 0 rows. Possible RLS restriction or invalid ID.')
    return { error: 'Permission denied or message not found.' }
  }

  revalidatePath('/admin/messages')
  return { success: true }
}
