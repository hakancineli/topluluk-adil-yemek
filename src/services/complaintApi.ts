import { Complaint } from '../types'
import { supabase } from '../lib/supabase'

/**
 * Complaint API Service
 * Supabase implementation
 */
class ComplaintApiService {
  async getAll(): Promise<Complaint[]> {
    const { data, error } = await supabase
      .from('complaints')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching complaints:', error)
      throw new Error(error.message || 'Şikayetler yüklenemedi')
    }

    return (data || []).map((c: any) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      category: c.category,
      platform: c.platform,
      upvotes: c.upvotes || 0,
      status: c.status,
      createdAt: new Date(c.created_at),
    }))
  }

  async getById(id: string): Promise<Complaint | null> {
    const { data, error } = await supabase
      .from('complaints')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Not found
      }
      console.error('Error fetching complaint:', error)
      throw new Error(error.message || 'Şikayet yüklenemedi')
    }

    if (!data) return null

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      category: data.category,
      platform: data.platform,
      upvotes: data.upvotes || 0,
      status: data.status,
      createdAt: new Date(data.created_at),
    }
  }

  async create(complaint: Omit<Complaint, 'id' | 'createdAt' | 'upvotes' | 'status'>): Promise<Complaint> {
    const { data, error } = await supabase
      .from('complaints')
      .insert({
        title: complaint.title,
        description: complaint.description,
        category: complaint.category,
        platform: complaint.platform,
        upvotes: 0,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating complaint:', error)
      throw new Error(error.message || 'Şikayet oluşturulamadı')
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      category: data.category,
      platform: data.platform,
      upvotes: data.upvotes || 0,
      status: data.status,
      createdAt: new Date(data.created_at),
    }
  }

  async update(id: string, updates: Partial<Complaint>): Promise<Complaint> {
    const updateData: any = {}
    
    if (updates.title !== undefined) updateData.title = updates.title
    if (updates.description !== undefined) updateData.description = updates.description
    if (updates.category !== undefined) updateData.category = updates.category
    if (updates.platform !== undefined) updateData.platform = updates.platform
    if (updates.upvotes !== undefined) updateData.upvotes = updates.upvotes
    if (updates.status !== undefined) updateData.status = updates.status

    const { data, error } = await supabase
      .from('complaints')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating complaint:', error)
      throw new Error(error.message || 'Şikayet güncellenemedi')
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      category: data.category,
      platform: data.platform,
      upvotes: data.upvotes || 0,
      status: data.status,
      createdAt: new Date(data.created_at),
    }
  }

  async upvote(id: string): Promise<Complaint> {
    const existing = await this.getById(id)
    if (!existing) {
      throw new Error('Şikayet bulunamadı')
    }

    return this.update(id, { upvotes: existing.upvotes + 1 })
  }

  async updateStatus(id: string, status: Complaint['status']): Promise<Complaint> {
    return this.update(id, { status })
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('complaints')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting complaint:', error)
      throw new Error(error.message || 'Şikayet silinemedi')
    }
  }
}

export const complaintApi = new ComplaintApiService()



