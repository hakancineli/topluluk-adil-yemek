import { ContactMessage } from '../types'
import { apiClient } from './api'

/**
 * Contact Message API Service
 * Mock implementation - LocalStorage kullanıyor
 */
class ContactApiService {
  private endpoint = '/api/contact-messages'

  async getAllMessages(): Promise<ContactMessage[]> {
    const response = await apiClient.get<ContactMessage[]>(this.endpoint)
    if (response.success && response.data) {
      return response.data.map((msg) => ({
        ...msg,
        createdAt: new Date(msg.createdAt),
        readAt: msg.readAt ? new Date(msg.readAt) : undefined,
      }))
    }
    return []
  }

  async getMessageById(id: string): Promise<ContactMessage | null> {
    const allMessages = await this.getAllMessages()
    return allMessages.find((msg) => msg.id === id) || null
  }

  async createMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'read' | 'readAt'>): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      ...message,
      id: Date.now().toString(),
      createdAt: new Date(),
      read: false,
    }
    const response = await apiClient.post<ContactMessage>(this.endpoint, newMessage)
    if (response.success && response.data) {
      return {
        ...response.data,
        createdAt: new Date(response.data.createdAt),
        readAt: response.data.readAt ? new Date(response.data.readAt) : undefined,
      }
    }
    throw new Error(response.error || 'Mesaj oluşturulamadı')
  }

  async markAsRead(id: string): Promise<ContactMessage> {
    const existing = await this.getMessageById(id)
    if (!existing) {
      throw new Error('Mesaj bulunamadı')
    }

    const updated = { ...existing, read: true, readAt: new Date() }
    const response = await apiClient.put<ContactMessage>(`${this.endpoint}/${id}`, updated)
    if (response.success && response.data) {
      return {
        ...response.data,
        createdAt: new Date(response.data.createdAt),
        readAt: response.data.readAt ? new Date(response.data.readAt) : undefined,
      }
    }
    throw new Error(response.error || 'Mesaj güncellenemedi')
  }

  async deleteMessage(id: string): Promise<void> {
    const response = await apiClient.delete(`${this.endpoint}/${id}`)
    if (!response.success) {
      throw new Error(response.error || 'Mesaj silinemedi')
    }
  }
}

export const contactService = new ContactApiService()

