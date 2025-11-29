/**
 * API Client - Mock Implementation
 * Gerçek backend API entegrasyonu için bu dosya güncellenecek
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    // Token'ı localStorage'dan al
    if (typeof window !== 'undefined') {
      const authStorage = localStorage.getItem('auth-storage')
      if (authStorage) {
        try {
          const auth = JSON.parse(authStorage)
          this.token = auth.state?.token || null
        } catch (e) {
          // Ignore
        }
      }
    }
  }

  setToken(token: string | null) {
    this.token = token
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

      try {
        const response = await fetch(url, {
          ...options,
          headers: headers as HeadersInit,
        })

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Bir hata oluştu' }))
        return {
          success: false,
          error: error.message || 'Bir hata oluştu',
        }
      }

      const data = await response.json()
      return {
        success: true,
        data,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Bağlantı hatası',
      }
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

// Mock API Client - LocalStorage kullanarak veri saklar
class MockApiClient {
  private storageKey: string

  constructor(storageKey: string = 'adil-yemek-api') {
    this.storageKey = storageKey
  }

  private getStorage(): any {
    if (typeof window === 'undefined') return {}
    const data = localStorage.getItem(this.storageKey)
    return data ? JSON.parse(data) : {}
  }

  private setStorage(data: any): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.storageKey, JSON.stringify(data))
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storage = this.getStorage()
        const key = endpoint.replace('/api/', '')
        const data = storage[key] || []
        resolve({
          success: true,
          data: data as T,
        })
      }, 300)
    })
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storage = this.getStorage()
        const key = endpoint.replace('/api/', '')
        const collection = storage[key] || []

        const newItem = {
          ...data,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }

        collection.push(newItem)
        storage[key] = collection
        this.setStorage(storage)

        resolve({
          success: true,
          data: newItem as T,
        })
      }, 300)
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storage = this.getStorage()
        const key = endpoint.replace('/api/', '')
        const collection = storage[key] || []

        const index = collection.findIndex((item: any) => item.id === data.id)
        if (index !== -1) {
          collection[index] = { ...collection[index], ...data, updatedAt: new Date().toISOString() }
          storage[key] = collection
          this.setStorage(storage)
          resolve({
            success: true,
            data: collection[index] as T,
          })
        } else {
          resolve({
            success: false,
            error: 'Kayıt bulunamadı',
          })
        }
      }, 300)
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storage = this.getStorage()
        const parts = endpoint.split('/')
        const key = parts[parts.length - 2]
        const id = parts[parts.length - 1]
        const collection = storage[key] || []

        const filtered = collection.filter((item: any) => item.id !== id)
        storage[key] = filtered
        this.setStorage(storage)

        resolve({
          success: true,
        })
      }, 300)
    })
  }
}

// Gerçek API kullanılacaksa ApiClient, şimdilik MockApiClient kullanıyoruz
export const apiClient = import.meta.env.VITE_USE_REAL_API === 'true' 
  ? new ApiClient(API_BASE_URL)
  : new MockApiClient()

