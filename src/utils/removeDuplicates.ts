import { complaintApi } from '../services/complaintApi'
import { Complaint } from '../types'

/**
 * Duplicate şikayetleri temizler
 * Aynı title + description + platform kombinasyonuna sahip şikayetleri bulur ve en eskisini tutar
 */
export async function removeDuplicateComplaints(): Promise<{ removed: number; remaining: number }> {
  console.log('[removeDuplicateComplaints] Duplicate şikayetler temizleniyor...')
  
  const allComplaints = await complaintApi.getAll()
  console.log(`[removeDuplicateComplaints] Toplam ${allComplaints.length} şikayet bulundu`)
  
  // Duplicate'leri bul: title + description (ilk 50 karakter) + platform kombinasyonu
  const complaintMap = new Map<string, Complaint[]>()
  
  allComplaints.forEach((complaint) => {
    const title = (complaint.title || '').toLowerCase().trim()
    const desc = (complaint.description || '').toLowerCase().trim().substring(0, 50)
    const platform = (complaint.platform || '').toLowerCase().trim()
    const key = `${title}|${desc}|${platform}`
    
    if (!complaintMap.has(key)) {
      complaintMap.set(key, [])
    }
    complaintMap.get(key)!.push(complaint)
  })
  
  // Her key için en yeni şikayeti tut, diğerlerini sil
  let removedCount = 0
  const complaintsToKeep: Complaint[] = []
  const deletePromises: Promise<void>[] = []
  
  for (const [key, complaints] of complaintMap.entries()) {
    if (complaints.length > 1) {
      // En yeni şikayeti bul (en yüksek createdAt)
      const sorted = complaints.sort((a, b) => {
        const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt)
        const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt)
        return dateB.getTime() - dateA.getTime()
      })
      
      // En yenisini tut
      complaintsToKeep.push(sorted[0])
      
      // Diğerlerini sil - Promise.all ile paralel silme
      for (let i = 1; i < sorted.length; i++) {
        deletePromises.push(
          complaintApi.delete(sorted[i].id)
            .then(() => {
              removedCount++
            })
            .catch((error) => {
              console.error(`[removeDuplicateComplaints] Şikayet silinirken hata: ${sorted[i].id}`, error)
            })
        )
      }
    } else {
      // Tek şikayet varsa direkt tut
      complaintsToKeep.push(complaints[0])
    }
  }
  
  // Tüm silme işlemlerini bekle
  await Promise.all(deletePromises)
  
  console.log(`[removeDuplicateComplaints] Tamamlandı! ${removedCount} duplicate şikayet silindi, ${complaintsToKeep.length} benzersiz şikayet kaldı.`)
  
  return {
    removed: removedCount,
    remaining: complaintsToKeep.length,
  }
}

