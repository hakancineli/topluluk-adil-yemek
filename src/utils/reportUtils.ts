import { Complaint, Platform } from '../types'

/**
 * Şikayetleri JSON formatında export eder
 */
export const exportComplaintsToJSON = (complaints: Complaint[], filename: string = 'sikayetler') => {
  const dataStr = JSON.stringify(complaints, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Şikayetleri CSV formatında export eder
 */
export const exportComplaintsToCSV = (complaints: Complaint[], filename: string = 'sikayetler') => {
  // CSV başlıkları
  const headers = [
    'ID',
    'Başlık',
    'Açıklama',
    'Kategori',
    'Platform',
    'Tarih',
    'Oy Sayısı',
    'Durum',
  ]

  // CSV satırları
  const rows = complaints.map((complaint) => [
    complaint.id,
    complaint.title,
    complaint.description.replace(/\n/g, ' ').replace(/,/g, ';'),
    complaint.category === 'restaurant' ? 'Restoran' : complaint.category === 'customer' ? 'Müşteri' : 'Kurye',
    complaint.platform,
    new Date(complaint.createdAt).toLocaleDateString('tr-TR'),
    complaint.upvotes.toString(),
    complaint.status === 'pending' ? 'Beklemede' : complaint.status === 'reviewed' ? 'İncelendi' : 'Üst Seviyeye Taşındı',
  ])

  // CSV içeriğini oluştur
  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n')

  // BOM ekle (Excel'de Türkçe karakterler için)
  const BOM = '\uFEFF'
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Platform için rapor oluşturur (sadece escalated durumdaki şikayetler)
 */
export const exportPlatformReport = (
  platform: Platform,
  complaints: Complaint[],
  format: 'json' | 'csv' = 'json'
) => {
  // Bu platforma ait ve escalated durumdaki şikayetleri filtrele
  const escalatedComplaints = complaints.filter(
    (complaint) =>
      complaint.platform === platform.name && complaint.status === 'escalated'
  )

  if (escalatedComplaints.length === 0) {
    alert(`${platform.name} için üst seviyeye taşınmış şikayet bulunmamaktadır.`)
    return
  }

  const filename = `${platform.name}-rapor`.replace(/\s+/g, '-').toLowerCase()

  if (format === 'json') {
    exportComplaintsToJSON(escalatedComplaints, filename)
  } else {
    exportComplaintsToCSV(escalatedComplaints, filename)
  }
}

/**
 * Tüm platformlar için toplu rapor oluşturur
 */
export const exportAllPlatformsReport = (
  _platforms: Platform[],
  complaints: Complaint[],
  format: 'json' | 'csv' = 'json'
) => {
  const allEscalatedComplaints = complaints.filter(
    (complaint) => complaint.status === 'escalated'
  )

  if (allEscalatedComplaints.length === 0) {
    alert('Üst seviyeye taşınmış şikayet bulunmamaktadır.')
    return
  }

  const filename = 'tum-platformlar-rapor'

  if (format === 'json') {
    exportComplaintsToJSON(allEscalatedComplaints, filename)
  } else {
    exportComplaintsToCSV(allEscalatedComplaints, filename)
  }
}

