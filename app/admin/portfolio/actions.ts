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

export async function updatePortfolioProject(id: string, formData: FormData) {
  const supabase = await createClient()

  // Verify authentication server-side before updating
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
    .update({
      title,
      category,
      description,
      image_url,
      project_url: project_url || null
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating portfolio project:', error)
    throw new Error('Failed to update project')
  }

  revalidatePath('/admin/portfolio')
  redirect('/admin/portfolio')
}

export async function deletePortfolioProject(id: string) {
  const supabase = await createClient()

  // Verify authentication server-side before deleting
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase
    .from('portfolio_projects')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting portfolio project:', error)
    return { error: 'Failed to delete project' }
  }

  revalidatePath('/admin/portfolio')
  return { success: true }
}
