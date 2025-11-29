import { Platform } from '../types'
import { apiClient } from './api'

/**
 * Platform API Service
 * Mock implementation - LocalStorage kullanıyor
 */
class PlatformApiService {
  private endpoint = '/api/platforms'

  async getAll(): Promise<Platform[]> {
    const response = await apiClient.get<Platform[]>(this.endpoint)
    return response.success && response.data ? response.data : []
  }

  async getById(id: string): Promise<Platform | null> {
    const all = await this.getAll()
    return all.find((p) => p.id === id) || null
  }

  async create(platform: Omit<Platform, 'id'>): Promise<Platform> {
    const newPlatform: Platform = {
      ...platform,
      id: Date.now().toString(),
    }

    const response = await apiClient.post<Platform>(this.endpoint, newPlatform)
    if (response.success && response.data) {
      return response.data
    }
    throw new Error(response.error || 'Platform oluşturulamadı')
  }

  async update(id: string, updates: Partial<Platform>): Promise<Platform> {
    const existing = await this.getById(id)
    if (!existing) {
      throw new Error('Platform bulunamadı')
    }

    const updated = { ...existing, ...updates }
    const response = await apiClient.put<Platform>(`${this.endpoint}/${id}`, updated)
    if (response.success && response.data) {
      return response.data
    }
    throw new Error(response.error || 'Platform güncellenemedi')
  }

  async delete(id: string): Promise<void> {
    const response = await apiClient.delete(`${this.endpoint}/${id}`)
    if (!response.success) {
      throw new Error(response.error || 'Platform silinemedi')
    }
  }
}

export const platformApi = new PlatformApiService()

