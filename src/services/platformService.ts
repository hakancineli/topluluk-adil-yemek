import { Platform } from '../types'
import { supabase } from '../lib/supabase'

/**
 * Platform API Service
 * Supabase implementation
 */
class PlatformApiService {
  async getAll(): Promise<Platform[]> {
    const { data, error } = await supabase
      .from('platforms')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching platforms:', error)
      throw new Error(error.message || 'Platformlar yüklenemedi')
    }

    // total_complaints'i dinamik olarak hesapla
    const platforms = (data || []).map((p: any) => ({
      id: p.id,
      name: p.name,
      logo: p.logo || `https://via.placeholder.com/150x80?text=${encodeURIComponent(p.name)}`,
      totalComplaints: p.total_complaints || 0,
    }))

    // Her platform için gerçek şikayet sayısını hesapla
    const { data: complaintsData } = await supabase
      .from('complaints')
      .select('platform')

    if (complaintsData) {
      const complaintCounts = complaintsData.reduce((acc: Record<string, number>, c: any) => {
        acc[c.platform] = (acc[c.platform] || 0) + 1
        return acc
      }, {})

      return platforms.map(p => ({
        ...p,
        totalComplaints: complaintCounts[p.name] || 0,
      }))
    }

    return platforms
  }

  async getById(id: string): Promise<Platform | null> {
    const { data, error } = await supabase
      .from('platforms')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Not found
      }
      console.error('Error fetching platform:', error)
      throw new Error(error.message || 'Platform yüklenemedi')
    }

    if (!data) return null

    // Şikayet sayısını hesapla
    const { count } = await supabase
      .from('complaints')
      .select('*', { count: 'exact', head: true })
      .eq('platform', data.name)

    return {
      id: data.id,
      name: data.name,
      logo: data.logo || `https://via.placeholder.com/150x80?text=${encodeURIComponent(data.name)}`,
      totalComplaints: count || 0,
    }
  }

  async create(platform: Omit<Platform, 'id' | 'totalComplaints'>): Promise<Platform> {
    const { data, error } = await supabase
      .from('platforms')
      .insert({
        name: platform.name,
        logo: platform.logo || `https://via.placeholder.com/150x80?text=${encodeURIComponent(platform.name)}`,
        total_complaints: 0,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating platform:', error)
      throw new Error(error.message || 'Platform oluşturulamadı')
    }

    return {
      id: data.id,
      name: data.name,
      logo: data.logo || `https://via.placeholder.com/150x80?text=${encodeURIComponent(data.name)}`,
      totalComplaints: 0,
    }
  }

  async update(id: string, updates: Partial<Platform>): Promise<Platform> {
    const updateData: any = {}
    
    if (updates.name !== undefined) updateData.name = updates.name
    if (updates.logo !== undefined) updateData.logo = updates.logo

    const { data, error } = await supabase
      .from('platforms')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating platform:', error)
      throw new Error(error.message || 'Platform güncellenemedi')
    }

    // Şikayet sayısını hesapla
    const { count } = await supabase
      .from('complaints')
      .select('*', { count: 'exact', head: true })
      .eq('platform', data.name)

    return {
      id: data.id,
      name: data.name,
      logo: data.logo || `https://via.placeholder.com/150x80?text=${encodeURIComponent(data.name)}`,
      totalComplaints: count || 0,
    }
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('platforms')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting platform:', error)
      throw new Error(error.message || 'Platform silinemedi')
    }
  }
}

export const platformService = new PlatformApiService()

