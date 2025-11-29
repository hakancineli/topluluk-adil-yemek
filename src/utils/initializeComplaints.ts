import { importSikayetvarComplaints } from './importComplaints'
import { removeDuplicateComplaints } from './removeDuplicates'

/**
 * Uygulama başlangıcında şikayetleri yükler
 * Şikayetvar'dan alınan gerçek şikayetleri ekler
 */
export async function initializeComplaints() {
  // Önce duplicate'leri temizle (sadece bir kez)
  const duplicateCleanupDone = localStorage.getItem('duplicate-cleanup-done')
  if (!duplicateCleanupDone) {
    try {
      const result = await removeDuplicateComplaints()
      if (result.removed > 0) {
        console.log(`[initializeComplaints] ${result.removed} duplicate şikayet temizlendi`)
      }
      localStorage.setItem('duplicate-cleanup-done', 'true')
    } catch (error) {
      console.error('[initializeComplaints] Duplicate temizleme hatası:', error)
    }
  }
  // LocalStorage'da şikayetler varsa kontrol et
  // MockApiClient storage key: 'adil-yemek-api'
  // Endpoint '/api/complaints' -> storage key: 'complaints'
  const storageData = localStorage.getItem('adil-yemek-api')
  let existingCount = 0
  
  if (storageData) {
    try {
      const data = JSON.parse(storageData)
      // MockApiClient endpoint'i '/api/complaints' olduğu için key 'complaints' oluyor
      const complaints = data['complaints'] || []
      existingCount = Array.isArray(complaints) ? complaints.length : 0
      
      // Eğer zaten yeterli sayıda şikayet varsa (150+), tekrar ekleme
      // 162 = Şikayetvar'dan eklenen şikayet sayısı (93 Trendyol + 44 Yemeksepeti + 25 GetirYemek)
      // Ama duplicate kontrolü yapılacak, bu yüzden sadece çok fazla varsa (200+) durdur
      if (existingCount >= 200) {
        console.log(`[initializeComplaints] Çok fazla şikayet var (${existingCount} adet), duplicate kontrolü yapılmadan durduruluyor.`)
        return
      }
    } catch (e) {
      console.error('[initializeComplaints] LocalStorage verisi okunurken hata:', e)
      // Hata durumunda devam et
    }
  }
  
  // Şikayetvar şikayetlerini ekle (162 şikayet: 93 Trendyol + 44 Yemeksepeti + 25 GetirYemek)
  console.log(`[initializeComplaints] Mevcut şikayet sayısı: ${existingCount}, Şikayetvar şikayetleri (162 adet) ekleniyor...`)
  await importSikayetvarComplaints()
  console.log('[initializeComplaints] Şikayetler başarıyla eklendi!')
}



