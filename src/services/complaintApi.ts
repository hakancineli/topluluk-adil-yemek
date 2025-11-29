import { Complaint } from '../types'
import { apiClient } from './api'

/**
 * Complaint API Service
 * Mock implementation - LocalStorage kullanıyor
 */
class ComplaintApiService {
  private endpoint = '/api/complaints'

  async getAll(): Promise<Complaint[]> {
    const response = await apiClient.get<Complaint[]>(this.endpoint)
    if (response.success && response.data) {
      // Date string'lerini Date objelerine çevir
      return response.data.map((c) => ({
        ...c,
        createdAt: new Date(c.createdAt),
      }))
    }
    return []
  }

  async getById(id: string): Promise<Complaint | null> {
    const all = await this.getAll()
    return all.find((c) => c.id === id) || null
  }

  async create(complaint: Omit<Complaint, 'id' | 'createdAt' | 'upvotes' | 'status'>): Promise<Complaint> {
    const newComplaint: Complaint = {
      ...complaint,
      id: Date.now().toString(),
      createdAt: new Date(),
      upvotes: 0,
      status: 'pending',
    }

    const response = await apiClient.post<Complaint>(this.endpoint, newComplaint)
    if (response.success && response.data) {
      return {
        ...response.data,
        createdAt: new Date(response.data.createdAt),
      }
    }
    throw new Error(response.error || 'Şikayet oluşturulamadı')
  }

  async update(id: string, updates: Partial<Complaint>): Promise<Complaint> {
    const existing = await this.getById(id)
    if (!existing) {
      throw new Error('Şikayet bulunamadı')
    }

    const updated = { ...existing, ...updates }
    const response = await apiClient.put<Complaint>(`${this.endpoint}/${id}`, updated)
    if (response.success && response.data) {
      return {
        ...response.data,
        createdAt: new Date(response.data.createdAt),
      }
    }
    throw new Error(response.error || 'Şikayet güncellenemedi')
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
    const response = await apiClient.delete(`${this.endpoint}/${id}`)
    if (!response.success) {
      throw new Error(response.error || 'Şikayet silinemedi')
    }
  }
}

export const complaintApi = new ComplaintApiService()



