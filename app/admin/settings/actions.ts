'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { upsertSiteSettings, UpsertSiteSettingsDTO } from '@/lib/supabase/settings'

export async function updateSettingsAction(formData: FormData) {
  try {
    const supabase = await createClient()

    // Verify authentication server-side before updating
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { error: 'Unauthorized' }
    }

    const agency_name = formData.get('agency_name') as string
    if (!agency_name || !agency_name.trim()) {
      return { error: 'Agency Name is required.' }
    }

    const settingsData: UpsertSiteSettingsDTO = {
      agency_name: agency_name.trim(),
      tagline: (formData.get('tagline') as string)?.trim() || null,
      email: (formData.get('email') as string)?.trim() || null,
      phone: (formData.get('phone') as string)?.trim() || null,
      address: (formData.get('address') as string)?.trim() || null,
      facebook_url: (formData.get('facebook_url') as string)?.trim() || null,
      linkedin_url: (formData.get('linkedin_url') as string)?.trim() || null,
      github_url: (formData.get('github_url') as string)?.trim() || null,
      instagram_url: (formData.get('instagram_url') as string)?.trim() || null,
    }

    const result = await upsertSiteSettings(settingsData)

    if (!result) {
      return { error: 'Failed to update settings.' }
    }

    // Required to refresh the current settings page with the new values
    revalidatePath('/admin/settings')
    return { success: true }
  } catch (error) {
    console.error('Error in updateSettingsAction:', error)
    return { error: 'An unexpected error occurred.' }
  }
}
