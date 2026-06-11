import { createClient } from '@/lib/supabase/server'

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string | null
  image_url: string | null
  linkedin_url: string | null
  github_url: string | null
  email: string | null
  display_order: number
  is_active: boolean
  created_at: string
}

export type CreateTeamMemberDTO = Omit<TeamMember, 'id' | 'created_at'>
export type UpdateTeamMemberDTO = Partial<CreateTeamMemberDTO>

export async function getTeamMembers(): Promise<TeamMember[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching team members:', error)
    return []
  }

  return data || []
}

export async function createTeamMember(memberData: CreateTeamMemberDTO): Promise<TeamMember | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('team_members')
    .insert([memberData])
    .select()
    .single()

  if (error) {
    console.error('Error creating team member:', error)
    return null
  }

  return data
}

export async function updateTeamMember(id: string, memberData: UpdateTeamMemberDTO): Promise<TeamMember | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('team_members')
    .update(memberData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error(`Error updating team member ${id}:`, error)
    return null
  }

  return data
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(`Error deleting team member ${id}:`, error)
    return false
  }

  return true
}
