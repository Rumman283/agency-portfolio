'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPortfolioProject(formData: FormData) {
  const supabase = await createClient()

  // Verify authentication server-side before inserting
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  const title = formData.get('title') as string
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const image_url = formData.get('image_url') as string
  const project_url = formData.get('project_url') as string | null

  if (!title || !category || !description || !image_url) {
    throw new Error('Missing required fields')
  }

  const { error } = await supabase
    .from('portfolio_projects')
    .insert([{
      title,
      category,
      description,
      image_url,
      project_url: project_url || null
    }])

  if (error) {
    console.error('Error inserting portfolio project:', error)
    throw new Error('Failed to create project')
  }

  revalidatePath('/admin/portfolio')
  redirect('/admin/portfolio')
}
