import { User } from '../types/user'
import { supabase } from '../lib/supabase'

/**
 * User API Service
 * Supabase implementation
 */
class UserApiService {
  async getAllUsers(): Promise<Array<User & { password?: string }>> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching users:', error)
      throw new Error(error.message || 'Kullanıcılar yüklenemedi')
    }

    return (data || []).map((u: any) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      password: u.password_hash, // Şifre hash'i döndür (güvenlik için)
      createdAt: new Date(u.created_at),
      lastLoginAt: u.last_login_at ? new Date(u.last_login_at) : undefined,
    }))
  }

  async getUserById(id: string): Promise<(User & { password?: string }) | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Not found
      }
      console.error('Error fetching user:', error)
      throw new Error(error.message || 'Kullanıcı yüklenemedi')
    }

    if (!data) return null

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      password: data.password_hash,
      createdAt: new Date(data.created_at),
      lastLoginAt: data.last_login_at ? new Date(data.last_login_at) : undefined,
    }
  }

  async getUserByEmail(email: string): Promise<(User & { password?: string }) | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Not found
      }
      console.error('Error fetching user by email:', error)
      throw new Error(error.message || 'Kullanıcı yüklenemedi')
    }

    if (!data) return null

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      password: data.password_hash,
      createdAt: new Date(data.created_at),
      lastLoginAt: data.last_login_at ? new Date(data.last_login_at) : undefined,
    }
  }

  async createUser(user: User & { password: string }): Promise<User & { password?: string }> {
    // Şifreyi hash'le (basit hash, production'da bcrypt kullanılmalı)
    const passwordHash = await this.hashPassword(user.password)

    const { data, error } = await supabase
      .from('users')
      .insert({
        email: user.email,
        password_hash: passwordHash,
        name: user.name,
        role: user.role || 'user',
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating user:', error)
      throw new Error(error.message || 'Kullanıcı oluşturulamadı')
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      password: data.password_hash,
      createdAt: new Date(data.created_at),
      lastLoginAt: data.last_login_at ? new Date(data.last_login_at) : undefined,
    }
  }

  async updateUser(id: string, updates: Partial<User & { password?: string }>): Promise<User & { password?: string }> {
    const updateData: any = {}
    
    if (updates.email !== undefined) updateData.email = updates.email
    if (updates.name !== undefined) updateData.name = updates.name
    if (updates.role !== undefined) updateData.role = updates.role
    if (updates.lastLoginAt !== undefined) updateData.last_login_at = updates.lastLoginAt.toISOString()
    if (updates.password !== undefined) {
      updateData.password_hash = await this.hashPassword(updates.password)
    }

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating user:', error)
      throw new Error(error.message || 'Kullanıcı güncellenemedi')
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      password: data.password_hash,
      createdAt: new Date(data.created_at),
      lastLoginAt: data.last_login_at ? new Date(data.last_login_at) : undefined,
    }
  }

  async deleteUser(id: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting user:', error)
      throw new Error(error.message || 'Kullanıcı silinemedi')
    }
  }

  async updateRole(id: string, role: User['role']): Promise<User> {
    const updated = await this.updateUser(id, { role })
    const { password, ...userWithoutPassword } = updated
    return userWithoutPassword
  }

  // Şifre hash'leme (basit, production'da bcrypt kullanılmalı)
  private async hashPassword(password: string): Promise<string> {
    // Basit hash (production'da bcrypt kullanılmalı)
    // Şimdilik basit bir hash kullanıyoruz, daha sonra bcrypt eklenebilir
    try {
      const bcrypt = await import('bcryptjs')
      const salt = await bcrypt.genSalt(10)
      return await bcrypt.hash(password, salt)
    } catch (error) {
      // Eğer bcrypt yüklenmemişse, basit hash kullan
      console.warn('bcrypt not available, using simple hash')
      return btoa(password) // Basit encoding (geçici)
    }
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      const bcrypt = await import('bcryptjs')
      return await bcrypt.compare(password, hash)
    } catch (error) {
      // Eğer bcrypt yüklenmemişse, basit karşılaştırma
      console.warn('bcrypt not available, using simple comparison')
      return btoa(password) === hash
    }
  }
}

class UserApiServiceWithCompatibility extends UserApiService {
  // Backward compatibility için eski metodlar
  async getAll(): Promise<User[]> {
    const users = await this.getAllUsers()
    return users.map(({ password, ...user }) => user)
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.getUserById(id)
    if (!user) return null
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async update(id: string, updates: Partial<User>): Promise<User> {
    const updated = await this.updateUser(id, updates)
    const { password, ...userWithoutPassword } = updated
    return userWithoutPassword
  }

  async delete(id: string): Promise<void> {
    return this.deleteUser(id)
  }

  async updateRole(id: string, role: User['role']): Promise<User> {
    return super.updateRole(id, role)
  }
}

export const userService = new UserApiServiceWithCompatibility()

