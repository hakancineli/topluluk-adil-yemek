import { importSikayetvarComplaints } from './importComplaints'

/**
 * Uygulama başlangıcında şikayetleri yükler
 * Şikayetvar'dan alınan gerçek şikayetleri ekler
 */
export async function initializeComplaints() {
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
      
      // Eğer zaten yeterli sayıda şikayet varsa (90+), tekrar ekleme
      // 93 = Şikayetvar'dan eklenen şikayet sayısı
      if (existingCount >= 90) {
        console.log(`[initializeComplaints] Şikayetler zaten yüklü (${existingCount} adet), tekrar eklenmeyecek.`)
        return
      }
    } catch (e) {
      console.error('[initializeComplaints] LocalStorage verisi okunurken hata:', e)
      // Hata durumunda devam et
    }
  }
  
  // Şikayetvar şikayetlerini ekle (93 şikayet)
  console.log(`[initializeComplaints] Mevcut şikayet sayısı: ${existingCount}, Şikayetvar şikayetleri (93 adet) ekleniyor...`)
  await importSikayetvarComplaints()
  console.log('[initializeComplaints] Şikayetler başarıyla eklendi!')
}



