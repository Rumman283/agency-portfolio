import { createClient } from '@/lib/supabase/server'

export type PortfolioProject = {
  id: string
  title: string
  category: string
  description: string
  image_url: string
  project_url: string
  created_at: string
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching portfolio projects:', error)
    return []
  }

  return data || []
}
