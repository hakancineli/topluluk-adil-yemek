import { Complaint, OfficialInstitution, OfficialComplaintStatus } from '../types'

/**
 * Rekabet Kurumu API Simülasyonu
 * Gerçek entegrasyon öncesi mock service
 */
export class OfficialComplaintService {
  /**
   * Rekabet Kurumu'na şikayet gönderir
   */
  async submitToRekabetKurumu(_complaintData: Complaint): Promise<{
    success: boolean
    officialId: string
    message?: string
  }> {
    // Simüle edilmiş API çağrısı
    return new Promise((resolve) => {
      setTimeout(() => {
        // Başarılı senaryo
        const officialId = `RK-${Date.now()}`
        resolve({
          success: true,
          officialId,
          message: 'Şikayetiniz başarıyla Rekabet Kurumu\'na iletilmiştir.',
        })
      }, 1500) // 1.5 saniye simüle edilmiş gecikme
    })
  }

  /**
   * BTK Tüketici Şikayet Sistemi'ne şikayet gönderir
   */
  async submitToBTKTuketici(complaintData: Complaint): Promise<{
    success: boolean
    officialId: string
    message?: string
  }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const officialId = `BTK-${Date.now()}`
        resolve({
          success: true,
          officialId,
          message: 'Şikayetiniz başarıyla BTK Tüketici Şikayet Sistemi\'ne iletilmiştir.',
        })
      }, 1500)
    })
  }

  /**
   * Tüketici Mahkemeleri'ne şikayet gönderir
   */
  async submitToTuketiciMahkemeleri(complaintData: Complaint): Promise<{
    success: boolean
    officialId: string
    message?: string
  }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const officialId = `TM-${Date.now()}`
        resolve({
          success: true,
          officialId,
          message: 'Şikayetiniz başarıyla Tüketici Mahkemeleri\'ne iletilmiştir.',
        })
      }, 1500)
    })
  }

  /**
   * Belediye'ye şikayet gönderir
   */
  async submitToBelediye(complaintData: Complaint): Promise<{
    success: boolean
    officialId: string
    message?: string
  }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const officialId = `BEL-${Date.now()}`
        resolve({
          success: true,
          officialId,
          message: 'Şikayetiniz başarıyla Belediye\'ye iletilmiştir.',
        })
      }, 1500)
    })
  }

  /**
   * Genel şikayet gönderme fonksiyonu (kurum tipine göre yönlendirir)
   */
  async submitComplaint(
    complaintData: Complaint,
    institution: OfficialInstitution
  ): Promise<{
    success: boolean
    officialId: string
    message?: string
  }> {
    switch (institution) {
      case OfficialInstitution.REKABET_KURUMU:
        return this.submitToRekabetKurumu(complaintData)
      case OfficialInstitution.BTK_TUKETICI:
        return this.submitToBTKTuketici(complaintData)
      case OfficialInstitution.TUKETICI_MAHKEMELERI:
        return this.submitToTuketiciMahkemeleri(complaintData)
      case OfficialInstitution.BELEDIYE:
        return this.submitToBelediye(complaintData)
      default:
        throw new Error('Desteklenmeyen kurum tipi')
    }
  }

  /**
   * Resmi şikayet durumunu sorgular
   */
  async checkStatus(officialId: string, institution: OfficialInstitution): Promise<{
    status: OfficialComplaintStatus
    lastUpdated: Date
    message?: string
  }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simüle edilmiş durumlar (rastgele)
        const statuses: OfficialComplaintStatus[] = [
          'submitted',
          'in_review',
          'resolved',
          'rejected',
        ]
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
        
        resolve({
          status: randomStatus,
          lastUpdated: new Date(),
          message: this.getStatusMessage(randomStatus),
        })
      }, 1000)
    })
  }

  /**
   * Durum mesajlarını döndürür
   */
  private getStatusMessage(status: OfficialComplaintStatus): string {
    const messages: Record<OfficialComplaintStatus, string> = {
      pending: 'Şikayetiniz bekleniyor',
      submitted: 'Şikayetiniz gönderildi ve kayıt altına alındı',
      in_review: 'Şikayetiniz inceleniyor',
      resolved: 'Şikayetiniz sonuçlandı',
      rejected: 'Şikayetiniz reddedildi',
    }
    return messages[status] || 'Durum bilgisi alınamadı'
  }

  /**
   * Şikayet verisini resmi kurum formatına dönüştürür
   */
  prepareOfficialComplaintData(complaint: Complaint, institution: OfficialInstitution): any {
    const baseData = {
      baslik: complaint.title,
      aciklama: complaint.description,
      platform: complaint.platform,
      kategori: complaint.category === 'restaurant' 
        ? 'Restoran' 
        : complaint.category === 'customer' 
        ? 'Müşteri' 
        : 'Kurye',
      tarih: new Date().toISOString(),
      kaynak: 'AdilYemek Platformu',
      oySayisi: complaint.upvotes,
    }

    // Kuruma özel ek alanlar
    switch (institution) {
      case OfficialInstitution.REKABET_KURUMU:
        return {
          ...baseData,
          kurum: 'Rekabet Kurumu',
          basvuruTipi: 'Rekabet İhlali',
        }
      case OfficialInstitution.BTK_TUKETICI:
        return {
          ...baseData,
          kurum: 'BTK Tüketici Şikayet Sistemi',
          basvuruTipi: 'Tüketici Şikayeti',
        }
      case OfficialInstitution.TUKETICI_MAHKEMELERI:
        return {
          ...baseData,
          kurum: 'Tüketici Mahkemeleri',
          basvuruTipi: 'Hukuki Başvuru',
        }
      case OfficialInstitution.BELEDIYE:
        return {
          ...baseData,
          kurum: 'Belediye',
          basvuruTipi: 'Yerel Yönetim Şikayeti',
        }
      default:
        return baseData
    }
  }
}

// Singleton instance
export const officialComplaintService = new OfficialComplaintService()

