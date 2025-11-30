import { User, LoginCredentials, RegisterData } from '../types/user'
import { userService } from './userService'

interface AuthResponse {
  user: User
  token: string
}

/**
 * Authentication Service
 * Supabase implementation
 */
class AuthService {
  // Initial mock users - sadece initializeUsers için
  private initialMockUsers: Array<User & { password: string }> = [
    {
      id: '1',
      email: 'test@example.com',
      password: 'test123',
      name: 'Test Kullanıcı',
      role: 'user',
      createdAt: new Date('2024-01-01'),
    },
    {
      id: 'admin-1',
      email: 'admin@adilyemek.com',
      password: 'admin123',
      name: 'Admin',
      role: 'admin',
      createdAt: new Date('2024-01-01'),
    },
  ]

  // Initial mock users'ı döndürür (initializeUsers tarafından kullanılır)
  getInitialMockUsers(): Array<User & { password: string }> {
    return this.initialMockUsers
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Supabase'den kullanıcıyı bul
      const userWithPassword = await userService.getUserByEmail(credentials.email)

      if (!userWithPassword) {
        throw new Error('E-posta veya şifre hatalı')
      }

      // Şifreyi doğrula
      const isValidPassword = await userService.verifyPassword(
        credentials.password,
        userWithPassword.password || ''
      )

      if (!isValidPassword) {
        throw new Error('E-posta veya şifre hatalı')
      }

      // lastLoginAt güncelle
      await userService.updateUser(userWithPassword.id, { lastLoginAt: new Date() })

      const { password, ...userWithoutPassword } = userWithPassword
      const token = `mock_token_${Date.now()}_${userWithPassword.id}`

      return {
        user: {
          ...userWithoutPassword,
          lastLoginAt: new Date(),
        },
        token,
      }
    } catch (error: any) {
      throw new Error(error.message || 'Giriş yapılırken bir hata oluştu')
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // Email kontrolü
      const existingUser = await userService.getUserByEmail(data.email)
      if (existingUser) {
        throw new Error('Bu e-posta adresi zaten kullanılıyor')
      }

      // Şifre kontrolü
      if (data.password.length < 6) {
        throw new Error('Şifre en az 6 karakter olmalıdır')
      }

      // Yeni kullanıcı oluştur
      const newUser = await userService.createUser({
        id: Date.now().toString(),
        email: data.email,
        password: data.password,
        name: data.name,
        role: 'user',
        createdAt: new Date(),
      })

      const { password, ...userWithoutPassword } = newUser
      const token = `mock_token_${Date.now()}_${newUser.id}`

      return {
        user: userWithoutPassword,
        token,
      }
    } catch (error: any) {
      throw new Error(error.message || 'Kayıt olurken bir hata oluştu')
    }
  }

  async getCurrentUser(token: string): Promise<User> {
    try {
      // Token'dan user ID'yi çıkar (mock)
      const userId = token.split('_').pop()
      if (!userId) {
        throw new Error('Geçersiz token')
      }

      const userWithPassword = await userService.getUserById(userId)
      if (!userWithPassword) {
        throw new Error('Kullanıcı bulunamadı')
      }

      const { password, ...userWithoutPassword } = userWithPassword
      return userWithoutPassword
    } catch (error: any) {
      throw new Error(error.message || 'Kullanıcı bulunamadı')
    }
  }
}

export const authService = new AuthService()



