import { ContactMessage } from '../types'
import { supabase } from '../lib/supabase'

/**
 * Contact Message API Service
 * Supabase implementation
 */
class ContactApiService {
  async getAllMessages(): Promise<ContactMessage[]> {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching messages:', error)
      throw new Error(error.message || 'Mesajlar yüklenemedi')
    }

    return (data || []).map((msg: any) => ({
      id: msg.id,
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      read: msg.read || false,
      createdAt: new Date(msg.created_at),
      readAt: msg.read_at ? new Date(msg.read_at) : undefined,
    }))
  }

  async getMessageById(id: string): Promise<ContactMessage | null> {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Not found
      }
      console.error('Error fetching message:', error)
      throw new Error(error.message || 'Mesaj yüklenemedi')
    }

    if (!data) return null

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      read: data.read || false,
      createdAt: new Date(data.created_at),
      readAt: data.read_at ? new Date(data.read_at) : undefined,
    }
  }

  async createMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'read' | 'readAt'>): Promise<ContactMessage> {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name: message.name,
        email: message.email,
        subject: message.subject,
        message: message.message,
        read: false,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating message:', error)
      throw new Error(error.message || 'Mesaj oluşturulamadı')
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      read: data.read || false,
      createdAt: new Date(data.created_at),
      readAt: data.read_at ? new Date(data.read_at) : undefined,
    }
  }

  async markAsRead(id: string): Promise<ContactMessage> {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({
        read: true,
        read_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error marking message as read:', error)
      throw new Error(error.message || 'Mesaj güncellenemedi')
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      read: data.read || false,
      createdAt: new Date(data.created_at),
      readAt: data.read_at ? new Date(data.read_at) : undefined,
    }
  }

  async deleteMessage(id: string): Promise<void> {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting message:', error)
      throw new Error(error.message || 'Mesaj silinemedi')
    }
  }
}

export const contactService = new ContactApiService()

