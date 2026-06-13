import { createClient } from '@/lib/supabase/server'

export interface SiteSettings {
  id: string
  agency_name: string
  tagline: string | null
  email: string | null
  phone: string | null
  address: string | null
  facebook_url: string | null
  linkedin_url: string | null
  github_url: string | null
  instagram_url: string | null
  created_at: string
  updated_at: string
}

export type UpsertSiteSettingsDTO = Omit<SiteSettings, 'id' | 'created_at' | 'updated_at'>

// The hardcoded UUID to strictly enforce the single-row pattern
export const SETTINGS_ID = '00000000-0000-0000-0000-000000000000';

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('Error fetching site settings:', error)
    return null
  }

  return data
}

export async function upsertSiteSettings(settingsData: UpsertSiteSettingsDTO): Promise<SiteSettings | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('site_settings')
    .upsert({
      ...settingsData,
      id: SETTINGS_ID,
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' })
    .select()
    .single()

  if (error) {
    console.error('Error upserting site settings:', error)
    return null
  }

  return data
}
