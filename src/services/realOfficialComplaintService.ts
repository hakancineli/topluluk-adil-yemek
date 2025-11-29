import { Complaint, OfficialInstitution } from '../types'

/**
 * Gerçek Resmi Kurum Yönlendirme Servisleri
 * Türkiye'deki resmi kurumların web sitelerine yönlendirme yapar
 */

export interface OfficialInstitutionConfig {
  name: string
  baseUrl: string
  complaintFormUrl: string
  eDevletRequired: boolean
  description: string
}

export const officialInstitutionConfigs: Record<OfficialInstitution, OfficialInstitutionConfig> = {
  [OfficialInstitution.REKABET_KURUMU]: {
    name: 'Rekabet Kurumu',
    baseUrl: 'https://edevlet.rekabet.gov.tr',
    complaintFormUrl: 'https://edevlet.rekabet.gov.tr/Talep/Anasayfa',
    eDevletRequired: true,
    description: 'Rekabet ihlalleri ve haksız rekabet uygulamaları için başvuru (E-devlet üzerinden)',
  },
  [OfficialInstitution.BTK_TUKETICI]: {
    name: 'BTK Tüketici Şikayet Sistemi',
    baseUrl: 'https://tuketicisikayet.btk.gov.tr',
    complaintFormUrl: 'https://tuketicisikayet.btk.gov.tr/home',
    eDevletRequired: false,
    description: 'Telekomünikasyon ve internet hizmetleri ile ilgili tüketici şikayetleri',
  },
  [OfficialInstitution.TUKETICI_MAHKEMELERI]: {
    name: 'Tüketici Hakem Heyetleri',
    baseUrl: 'https://tuketicisikayeti.ticaret.gov.tr',
    complaintFormUrl: 'https://tuketicisikayeti.ticaret.gov.tr/Tuketici/SikayetBasvuru',
    eDevletRequired: true,
    description: 'Hukuki başvurular ve tazminat talepleri için (E-devlet üzerinden)',
  },
  [OfficialInstitution.BELEDIYE]: {
    name: 'Belediye Şikayet Sistemi',
    baseUrl: 'https://www.turkiye.gov.tr',
    complaintFormUrl: 'https://www.turkiye.gov.tr/belediye-sikayet',
    eDevletRequired: true,
    description: 'E-devlet üzerinden belediye şikayet başvurusu',
  },
}

/**
 * E-devlet giriş URL'i oluşturur
 * Güvenli yöntem: E-devlet ana sayfasına yönlendirir
 */
export const getEDevletAuthUrl = (_redirectUri: string, _state?: string): string => {
  // E-devlet ana sayfasına yönlendir
  // Kullanıcı burada giriş yapar ve sonra ilgili hizmeti arar
  // OAuth entegrasyonu için resmi developer portal kaydı gereklidir
  return 'https://www.turkiye.gov.tr'
}

/**
 * Şikayet verisini resmi kurum formatına dönüştürür
 */
export const prepareComplaintForInstitution = (
  complaint: Complaint,
  institution: OfficialInstitution
): Record<string, string> => {
  const baseData: Record<string, string> = {
    baslik: complaint.title,
    aciklama: complaint.description,
    platform: complaint.platform,
    kategori: complaint.category === 'restaurant' 
      ? 'Restoran' 
      : complaint.category === 'customer' 
      ? 'Müşteri' 
      : 'Kurye',
    tarih: new Date(complaint.createdAt).toLocaleDateString('tr-TR'),
    oySayisi: complaint.upvotes.toString(),
    kaynak: 'AdilYemek Platformu',
  }

  // Kuruma özel alanlar
  switch (institution) {
    case OfficialInstitution.REKABET_KURUMU:
      return {
        ...baseData,
        sikayet_tipi: 'Rekabet İhlali',
        sektor: 'Yemek Sipariş Platformları',
      }
    case OfficialInstitution.BTK_TUKETICI:
      return {
        ...baseData,
        hizmet_tipi: 'İnternet Hizmeti',
        sorun_tipi: 'Hizmet Kalitesi',
      }
    case OfficialInstitution.TUKETICI_MAHKEMELERI:
      return {
        ...baseData,
        basvuru_tipi: 'Tüketici Şikayeti',
        talep: 'Çözüm ve Tazminat',
      }
    case OfficialInstitution.BELEDIYE:
      return {
        ...baseData,
        sikayet_konusu: 'Yerel Hizmet',
        ilce: '', // Kullanıcıdan alınacak
      }
    default:
      return baseData
  }
}

/**
 * Form verilerini localStorage'a kaydeder (yönlendirme sonrası kullanım için)
 */
export const saveComplaintDataForRedirect = (
  complaintData: Record<string, string>,
  institution: OfficialInstitution
): void => {
  const key = `adil_yemek_complaint_${institution}_${Date.now()}`
  localStorage.setItem(key, JSON.stringify(complaintData))
  // 1 saat sonra otomatik sil
  setTimeout(() => {
    localStorage.removeItem(key)
  }, 3600000)
}

/**
 * Resmi kurum sayfasına yönlendirme yapar
 * Güvenli yöntem: Kullanıcıyı bilgilendirip manuel yönlendirme
 */
export const redirectToOfficialInstitution = (
  complaint: Complaint,
  institution: OfficialInstitution,
  eDevletToken?: string
): { url: string; formData: Record<string, string>; instructions: string } => {
  const config = officialInstitutionConfigs[institution]
  const complaintData = prepareComplaintForInstitution(complaint, institution)
  const formData = prepareFormDataForInstitution(complaintData, institution)

  // Veriyi localStorage'a kaydet (form doldurma için)
  saveComplaintDataForRedirect(complaintData, institution)

  // E-devlet gerekliyse önce e-devlet girişi
  if (config.eDevletRequired && !eDevletToken) {
    // E-devlet ana sayfasına yönlendir (güvenli yöntem)
    const eDevletUrl = 'https://www.turkiye.gov.tr'
    return {
      url: eDevletUrl,
      formData: formData,
      instructions: `Önce e-devlet'e giriş yapın, sonra "${config.name}" sayfasına gidin ve formu doldurun.`,
    }
  }

  // Resmi kurum sayfası URL'i (direkt link, parametre olmadan)
  const targetUrl = config.complaintFormUrl

  // Talimatlar hazırla
  const instructions = generateInstructions(institution, formData)

  return {
    url: targetUrl,
    formData: formData,
    instructions: instructions,
  }
}

/**
 * Kullanıcı için talimatlar oluşturur
 */
const generateInstructions = (
  institution: OfficialInstitution,
  formData: Record<string, string>
): string => {
  const config = officialInstitutionConfigs[institution]
  
  let instructions = `Aşağıdaki bilgileri ${config.name} formuna kopyalayın:\n\n`
  
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      instructions += `${key}: ${value}\n`
    }
  })
  
  instructions += `\nFormu doldurduktan sonra başvurunuzu tamamlayın.`
  
  return instructions
}

/**
 * Kuruma özel form verisi hazırlama
 */
const prepareFormDataForInstitution = (
  complaintData: Record<string, string>,
  institution: OfficialInstitution
): Record<string, string> => {
  // Her kurumun form alanları farklı olabilir
  // Burada kuruma özel mapping yapılır
  switch (institution) {
    case OfficialInstitution.REKABET_KURUMU:
      return {
        'sikayet_baslik': complaintData.baslik,
        'sikayet_aciklama': complaintData.aciklama,
        'sikayet_edilen_firma': complaintData.platform,
        'sektor': complaintData.sektor || 'Yemek Sipariş Platformları',
      }
    case OfficialInstitution.BTK_TUKETICI:
      return {
        'baslik': complaintData.baslik,
        'aciklama': complaintData.aciklama,
        'firma_adi': complaintData.platform,
        'hizmet_tipi': complaintData.hizmet_tipi || 'İnternet Hizmeti',
      }
    case OfficialInstitution.TUKETICI_MAHKEMELERI:
      return {
        'basvuru_baslik': complaintData.baslik,
        'basvuru_detay': complaintData.aciklama,
        'sikayet_edilen': complaintData.platform,
      }
    default:
      return complaintData
  }
}

/**
 * Kurum URL'ini oluşturur
 */
const buildInstitutionUrl = (
  baseUrl: string,
  _formData: Record<string, string>,
  _institution: OfficialInstitution
): string => {
  // E-devlet sayfaları için özel işlem
  if (baseUrl.includes('turkiye.gov.tr')) {
    // E-devlet sayfaları genellikle URL parametreleri kabul etmez
    // Bu durumda sadece base URL'e yönlendir
    return baseUrl
  }

  // Diğer kurumlar için URL parametreleri ekle
  const params = new URLSearchParams()
  Object.entries(_formData).forEach(([key, value]) => {
    if (value && typeof value === 'string') {
      params.append(key, value)
    }
  })

  // URL çok uzunsa sadece base URL döndür
  const fullUrl = `${baseUrl}${params.toString() ? '?' + params.toString() : ''}`
  if (fullUrl.length > 2000) {
    return baseUrl
  }

  return fullUrl
}

/**
 * E-devlet callback'inden gelen token'ı işler
 */
export const handleEDevletCallback = (code: string, state: string): Promise<string> => {
  // Gerçek implementasyonda, code'u token'a çevirmek için backend API çağrısı yapılır
  // Şimdilik mock token döndürüyoruz
  return new Promise((resolve) => {
    // Simüle edilmiş token exchange
    setTimeout(() => {
      resolve(`mock_edevlet_token_${Date.now()}`)
    }, 1000)
  })
}

/**
 * Kullanıcı bilgilerini e-devlet'ten alır
 */
export const getEDevletUserInfo = async (_token: string): Promise<{
  tcKimlik: string
  adSoyad: string
  email: string
  telefon: string
  adres: string
}> => {
  // Gerçek implementasyonda e-devlet API'sinden kullanıcı bilgileri alınır
  // Şimdilik mock data döndürüyoruz
  return {
    tcKimlik: '12345678901',
    adSoyad: 'Test Kullanıcı',
    email: 'test@example.com',
    telefon: '5551234567',
    adres: 'Test Adresi, İstanbul',
  }
}

