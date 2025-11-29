import { apiClient } from '../services/api'
import { User } from '../types/user'

/**
 * Uygulama başlangıcında kullanıcıları yükler
 * authService'teki mock kullanıcıları localStorage'a aktarır
 */
export async function initializeUsers() {
  // LocalStorage'da kullanıcılar varsa kontrol et
  const storageData = localStorage.getItem('adil-yemek-api')
  let existingCount = 0
  
  if (storageData) {
    try {
      const data = JSON.parse(storageData)
      const users = data['users'] || []
      existingCount = Array.isArray(users) ? users.length : 0
      
      // Eğer zaten kullanıcılar varsa, tekrar ekleme
      if (existingCount > 0) {
        console.log(`[initializeUsers] Kullanıcılar zaten yüklü (${existingCount} adet), tekrar eklenmeyecek.`)
        return
      }
    } catch (e) {
      console.error('[initializeUsers] LocalStorage verisi okunurken hata:', e)
    }
  }
  
  // Mock kullanıcıları ekle
  const mockUsers: (Omit<User, 'lastLoginAt'> & { id: string })[] = [
    {
      id: '1',
      email: 'test@example.com',
      name: 'Test Kullanıcı',
      role: 'user',
      createdAt: new Date('2024-01-01'),
    },
    {
      id: 'admin-1',
      email: 'admin@adilyemek.com',
      name: 'Admin',
      role: 'admin',
      createdAt: new Date('2024-01-01'),
    },
  ]
  
  console.log(`[initializeUsers] ${mockUsers.length} mock kullanıcı ekleniyor...`)
  
  for (const user of mockUsers) {
    try {
      await apiClient.post('/api/users', {
        ...user,
        createdAt: user.createdAt.toISOString(),
      })
    } catch (error) {
      console.error(`[initializeUsers] Kullanıcı eklenirken hata: ${user.email}`, error)
    }
  }
  
  console.log('[initializeUsers] Kullanıcılar başarıyla eklendi!')
}

