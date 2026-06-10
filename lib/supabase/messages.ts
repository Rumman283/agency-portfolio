import { createClient } from './server'

export interface ContactMessage {
  id: string
  name: string
  email: string
  company: string | null
  budget: string | null
  message: string
  created_at: string
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching contact messages:', error)
    return []
  }

  return data || []
}
