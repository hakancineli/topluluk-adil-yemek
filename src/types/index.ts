export type ComplaintCategory = 'restaurant' | 'customer' | 'courier'
export type ComplaintStatus = 'pending' | 'reviewed' | 'escalated'

export interface Complaint {
  id: string
  title: string
  description: string
  category: ComplaintCategory
  platform: string
  createdAt: Date
  upvotes: number
  status: ComplaintStatus
}

export interface Platform {
  id: string
  name: string
  logo: string
  totalComplaints: number
}

// Resmi Kurum Tipleri
export enum OfficialInstitution {
  REKABET_KURUMU = 'rekabet_kurumu',
  TUKETICI_MAHKEMELERI = 'tuketici_mahkemeleri',
  BTK_TUKETICI = 'btk_tuketici',
  BELEDIYE = 'belediye',
}

// Resmi Şikayet Durumları
export type OfficialComplaintStatus = 
  | 'pending'      // Beklemede
  | 'submitted'    // Gönderildi
  | 'in_review'    // İnceleniyor
  | 'resolved'     // Sonuçlandı
  | 'rejected'     // Reddedildi

// Resmi Şikayet Interface'i
export interface OfficialComplaint {
  id: string
  platformComplaintId: string // Bizim platformdaki şikayet ID'si
  userId?: string
  institution: OfficialInstitution
  officialComplaintId: string // Resmi kurumun verdiği ID (örn: RK-12345)
  status: OfficialComplaintStatus
  submittedAt: Date
  lastUpdated: Date
  complaintData: Complaint // Orijinal şikayet verisi
  institutionSpecificData?: {
    rekabetKurumu?: {
      dosyaNo?: string
      basvuruTarihi?: string
    }
    tuketici?: {
      basvuruNo?: string
      mahkemeAdi?: string
    }
    btk?: {
      basvuruKodu?: string
    }
  }
}

// Toplu Şikayet (Class Action) Interface'i
export interface BulkComplaint {
  id: string
  platform: string
  category: ComplaintCategory
  complaintIds: string[] // Birleştirilen şikayetler
  totalComplaints: number
  totalUpvotes: number
  createdAt: Date
  officialComplaintId?: string // Resmi şikayet oluşturulduysa
  status: 'draft' | 'collecting' | 'ready' | 'submitted' | 'resolved'
  minComplaintsForSubmission?: number // Gönderim için minimum şikayet sayısı
}

