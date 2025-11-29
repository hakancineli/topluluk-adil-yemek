import { Complaint, BulkComplaint } from '../types'

/**
 * Benzer şikayetleri tespit eder ve gruplar
 */
export const findSimilarComplaints = (
  complaint: Complaint,
  allComplaints: Complaint[],
  threshold: number = 3 // Minimum benzer şikayet sayısı
): Complaint[] => {
  // Aynı platform ve kategoriye sahip şikayetleri bul
  const similar = allComplaints.filter(
    (c) =>
      c.id !== complaint.id &&
      c.platform === complaint.platform &&
      c.category === complaint.category
  )

  // Başlık benzerliğine göre filtrele (basit keyword matching)
  const complaintKeywords = complaint.title.toLowerCase().split(/\s+/)
  const similarByTitle = similar.filter((c) => {
    const cKeywords = c.title.toLowerCase().split(/\s+/)
    // En az 2 ortak kelime varsa benzer kabul et
    const commonKeywords = complaintKeywords.filter((kw) => cKeywords.includes(kw))
    return commonKeywords.length >= 2
  })

  return similarByTitle.length >= threshold ? similarByTitle : []
}

/**
 * Şikayetlerden toplu şikayet oluşturur
 */
export const createBulkComplaint = (
  complaints: Complaint[],
  minComplaints: number = 10
): BulkComplaint | null => {
  if (complaints.length < minComplaints) {
    return null
  }

  const platform = complaints[0].platform
  const category = complaints[0].category

  // Tüm şikayetlerin aynı platform ve kategoriye sahip olduğunu doğrula
  const allSame = complaints.every(
    (c) => c.platform === platform && c.category === category
  )

  if (!allSame) {
    return null
  }

  const totalUpvotes = complaints.reduce((sum, c) => sum + c.upvotes, 0)

  return {
    id: `bulk-${Date.now()}`,
    platform,
    category,
    complaintIds: complaints.map((c) => c.id),
    totalComplaints: complaints.length,
    totalUpvotes,
    createdAt: new Date(),
    status: 'collecting',
    minComplaintsForSubmission: minComplaints,
  }
}

/**
 * Toplu şikayet için özet metin oluşturur
 */
export const generateBulkComplaintSummary = (bulkComplaint: BulkComplaint, complaints: Complaint[]): string => {
  const platformComplaints = complaints.filter((c) =>
    bulkComplaint.complaintIds.includes(c.id)
  )

  const commonKeywords = extractCommonKeywords(
    platformComplaints.map((c) => c.title)
  )

  return `${bulkComplaint.platform} platformunda ${bulkComplaint.totalComplaints} kullanıcı tarafından benzer şikayetler yapılmıştır. Ana konular: ${commonKeywords.join(', ')}. Toplam ${bulkComplaint.totalUpvotes} destek oyu toplanmıştır.`
}

/**
 * Şikayet başlıklarından ortak kelimeleri çıkarır
 */
const extractCommonKeywords = (titles: string[]): string[] => {
  const wordCounts: Record<string, number> = {}

  titles.forEach((title) => {
    const words = title.toLowerCase().split(/\s+/)
    words.forEach((word) => {
      // Türkçe stop words'leri filtrele
      const stopWords = ['ve', 'ile', 'için', 'bir', 'bu', 'şu', 'o', 'de', 'da', 'ki', 'mi', 'mu', 'mü']
      if (word.length > 3 && !stopWords.includes(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1
      }
    })
  })

  // En az 2 şikayette geçen kelimeleri al
  return Object.entries(wordCounts)
    .filter(([_, count]) => count >= 2)
    .sort(([_, a], [__, b]) => b - a)
    .slice(0, 5)
    .map(([word]) => word)
}

/**
 * Toplu şikayet için uygun kurum önerisi
 */
export const recommendInstitutionForBulk = (
  bulkComplaint: BulkComplaint
): string[] => {
  const recommendations: string[] = []

  if (bulkComplaint.category === 'restaurant') {
    recommendations.push('Rekabet Kurumu') // Restoranlar için rekabet kurumu
  }

  if (bulkComplaint.category === 'customer') {
    recommendations.push('BTK Tüketici') // Müşteriler için BTK
    recommendations.push('Tüketici Mahkemeleri')
  }

  if (bulkComplaint.category === 'courier') {
    recommendations.push('Belediye') // Kuryeler için belediye
    recommendations.push('BTK Tüketici')
  }

  return recommendations
}

