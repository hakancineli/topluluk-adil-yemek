import { OfficialInstitution } from '../types'
import { officialInstitutionConfigs } from '../services/realOfficialComplaintService'

/**
 * Resmi kurum için direkt e-devlet uygulama URL'leri
 */
export const getEDevletInstitutionUrl = (institution: OfficialInstitution): string => {
  // Her kurumun direkt e-devlet uygulama URL'i
  const directUrls: Record<OfficialInstitution, string> = {
    [OfficialInstitution.REKABET_KURUMU]: 'https://edevlet.rekabet.gov.tr/Talep/Anasayfa',
    [OfficialInstitution.BTK_TUKETICI]: 'https://tuketicisikayet.btk.gov.tr/home',
    [OfficialInstitution.TUKETICI_MAHKEMELERI]: 'https://tuketicisikayeti.ticaret.gov.tr/Tuketici/SikayetBasvuru',
    [OfficialInstitution.BELEDIYE]: 'https://www.turkiye.gov.tr/belediye-sikayet',
  }
  
  return directUrls[institution] || officialInstitutionConfigs[institution].complaintFormUrl
}

/**
 * Resmi kurum için e-devlet arama terimleri (alternatif)
 */
export const getEDevletSearchTerm = (institution: OfficialInstitution): string => {
  const searchTerms: Record<OfficialInstitution, string> = {
    [OfficialInstitution.REKABET_KURUMU]: 'Rekabet Kurumu',
    [OfficialInstitution.BTK_TUKETICI]: 'BTK Tüketici Şikayetleri',
    [OfficialInstitution.TUKETICI_MAHKEMELERI]: 'Tüketici Hakem Heyeti Başvurusu',
    [OfficialInstitution.BELEDIYE]: 'Belediye Şikayet',
  }
  return searchTerms[institution]
}

/**
 * Alternatif başvuru yöntemleri bilgisi
 */
export const getAlternativeContactInfo = (institution: OfficialInstitution): {
  email?: string
  phone?: string
  address?: string
  website?: string
} => {
  const info: Record<OfficialInstitution, {
    email?: string
    phone?: string
    address?: string
    website?: string
  }> = {
    [OfficialInstitution.REKABET_KURUMU]: {
      email: 'rek@rekabet.gov.tr',
      phone: '(312) 291 44 44',
      address: 'Üniversiteler Mah. 1597. Cad. No:9 Bilkent 06800 / ANKARA',
      website: 'https://www.rekabet.gov.tr',
    },
    [OfficialInstitution.BTK_TUKETICI]: {
      website: 'https://www.btk.gov.tr',
      phone: '444 0 532',
    },
    [OfficialInstitution.TUKETICI_MAHKEMELERI]: {
      website: 'https://tuketicisikayeti.ticaret.gov.tr',
    },
    [OfficialInstitution.BELEDIYE]: {
      website: 'https://www.turkiye.gov.tr',
    },
  }
  
  return info[institution] || {}
}

