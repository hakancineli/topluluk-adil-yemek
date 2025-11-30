import { userService } from '../services/userService'
import { authService } from '../services/authService'

/**
 * Uygulama başlangıcında kullanıcıları yükler
 * authService'teki mock kullanıcıları Supabase'e aktarır
 */
export async function initializeUsers() {
  if (typeof window === 'undefined') return

  try {
    // Supabase'de kullanıcılar varsa kontrol et
    const existingUsers = await userService.getAllUsers()
    
    // Eğer zaten kullanıcılar varsa, tekrar ekleme
    if (existingUsers.length > 0) {
      console.log(`[initializeUsers] ${existingUsers.length} kullanıcı zaten yüklü.`)
      return
    }
    
    // Mock kullanıcıları ekle
    const mockUsers = authService.getInitialMockUsers()
    
    console.log(`[initializeUsers] ${mockUsers.length} mock kullanıcı ekleniyor...`)
    
    for (const user of mockUsers) {
      try {
        // Kullanıcı zaten var mı kontrol et
        const existing = await userService.getUserByEmail(user.email)
        if (existing) {
          console.log(`[initializeUsers] Kullanıcı zaten var: ${user.email}`)
          continue
        }
        
        await userService.createUser(user)
        console.log(`[initializeUsers] Kullanıcı eklendi: ${user.email}`)
      } catch (error: any) {
        // Eğer kullanıcı zaten varsa hata verme
        if (error.message?.includes('already exists') || error.message?.includes('unique')) {
          console.log(`[initializeUsers] Kullanıcı zaten var: ${user.email}`)
        } else {
          console.error(`[initializeUsers] Kullanıcı eklenirken hata: ${user.email}`, error)
        }
      }
    }
    
    console.log('[initializeUsers] Kullanıcılar başarıyla eklendi!')
  } catch (error) {
    console.error('[initializeUsers] Kullanıcılar yüklenirken hata:', error)
  }
}

