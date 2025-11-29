import { User, LoginCredentials, RegisterData } from '../types/user'

interface AuthResponse {
  user: User
  token: string
}

/**
 * Mock Authentication Service
 * Gerçek API entegrasyonu için backend API endpoint'leri kullanılacak
 */
class AuthService {
  // Mock kullanıcılar (gerçek uygulamada veritabanından gelecek)
  private mockUsers: Array<User & { password: string }> = [
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

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simüle edilmiş API çağrısı
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.mockUsers.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        )

        if (!user) {
          reject(new Error('E-posta veya şifre hatalı'))
          return
        }

        const { password, ...userWithoutPassword } = user
        const token = `mock_token_${Date.now()}_${user.id}`

        resolve({
          user: {
            ...userWithoutPassword,
            lastLoginAt: new Date(),
          },
          token,
        })
      }, 1000)
    })
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Email kontrolü
        if (this.mockUsers.find((u) => u.email === data.email)) {
          reject(new Error('Bu e-posta adresi zaten kullanılıyor'))
          return
        }

        // Şifre kontrolü
        if (data.password.length < 6) {
          reject(new Error('Şifre en az 6 karakter olmalıdır'))
          return
        }

        // Yeni kullanıcı oluştur
        const newUser: User & { password: string } = {
          id: Date.now().toString(),
          email: data.email,
          password: data.password,
          name: data.name,
          role: 'user',
          createdAt: new Date(),
        }

        this.mockUsers.push(newUser)

        const { password, ...userWithoutPassword } = newUser

        // Kullanıcıyı localStorage'a da kaydet (userService üzerinden)
        if (typeof window !== 'undefined') {
          import('../services/api').then(({ apiClient }) => {
            apiClient.post('/api/users', {
              ...userWithoutPassword,
              createdAt: newUser.createdAt.toISOString(),
            }).catch((err) => {
              console.error('Kullanıcı localStorage\'a kaydedilirken hata:', err)
            })
          })
        }

        const token = `mock_token_${Date.now()}_${newUser.id}`

        resolve({
          user: userWithoutPassword,
          token,
        })
      }, 1000)
    })
  }

  async getCurrentUser(token: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Token'dan user ID'yi çıkar (mock)
        const userId = token.split('_').pop()
        const user = this.mockUsers.find((u) => u.id === userId)

        if (!user) {
          reject(new Error('Kullanıcı bulunamadı'))
          return
        }

        const { password, ...userWithoutPassword } = user
        resolve(userWithoutPassword)
      }, 500)
    })
  }
}

export const authService = new AuthService()



