import { importSikayetvarComplaints } from './importComplaints'

/**
 * Uygulama başlangıcında şikayetleri yükler
 * Şikayetvar'dan alınan gerçek şikayetleri ekler
 */
export async function initializeComplaints() {
  // LocalStorage'da şikayetler varsa, tekrar ekleme
  const existingComplaints = localStorage.getItem('adil-yemek-api')
  if (existingComplaints) {
    try {
      const data = JSON.parse(existingComplaints)
      const complaints = data['/api/complaints'] || []
      
      // Eğer zaten şikayetler varsa ve sayı yeterliyse, tekrar ekleme
      if (complaints.length > 5) {
        console.log('Şikayetler zaten yüklü, tekrar eklenmeyecek.')
        return
      }
    } catch (e) {
      // Hata durumunda devam et
    }
  }
  
  // Şikayetvar şikayetlerini ekle
  await importSikayetvarComplaints()
}

