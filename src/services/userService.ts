import { User } from '../types/user'
import { apiClient } from './api'

/**
 * User API Service
 * Mock implementation - LocalStorage kullanıyor
 */
class UserApiService {
  private endpoint = '/api/users'

  async getAll(): Promise<User[]> {
    const response = await apiClient.get<User[]>(this.endpoint)
    if (response.success && response.data) {
      // Date string'lerini Date objelerine çevir
      return response.data.map((u) => ({
        ...u,
        createdAt: new Date(u.createdAt),
        lastLoginAt: u.lastLoginAt ? new Date(u.lastLoginAt) : undefined,
      }))
    }
    return []
  }

  async getById(id: string): Promise<User | null> {
    const all = await this.getAll()
    return all.find((u) => u.id === id) || null
  }

  async update(id: string, updates: Partial<User>): Promise<User> {
    const existing = await this.getById(id)
    if (!existing) {
      throw new Error('Kullanıcı bulunamadı')
    }

    const updated = { ...existing, ...updates }
    const response = await apiClient.put<User>(`${this.endpoint}/${id}`, updated)
    if (response.success && response.data) {
      return {
        ...response.data,
        createdAt: new Date(response.data.createdAt),
        lastLoginAt: response.data.lastLoginAt ? new Date(response.data.lastLoginAt) : undefined,
      }
    }
    throw new Error(response.error || 'Kullanıcı güncellenemedi')
  }

  async delete(id: string): Promise<void> {
    const response = await apiClient.delete(`${this.endpoint}/${id}`)
    if (!response.success) {
      throw new Error(response.error || 'Kullanıcı silinemedi')
    }
  }

  async updateRole(id: string, role: User['role']): Promise<User> {
    return this.update(id, { role })
  }
}

export const userService = new UserApiService()

