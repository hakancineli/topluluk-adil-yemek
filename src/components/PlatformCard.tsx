import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Platform, Complaint, ComplaintCategory } from '../types'
import { exportPlatformReport } from '../utils/reportUtils'

interface PlatformCardProps {
  platform: Platform
  complaints: Complaint[]
}

const PlatformCard = ({ platform, complaints }: PlatformCardProps) => {
  const navigate = useNavigate()
  const [isExporting, setIsExporting] = useState(false)

  // Bu platforma ait şikayetleri filtrele
  const platformComplaints = complaints.filter(
    (complaint) => complaint.platform === platform.name
  )

  // Kategorilere göre dağılımı hesapla
  const categoryDistribution = platformComplaints.reduce(
    (acc, complaint) => {
      acc[complaint.category] = (acc[complaint.category] || 0) + 1
      return acc
    },
    {} as Record<ComplaintCategory, number>
  )

  const totalComplaints = platformComplaints.length
  const restaurantCount = categoryDistribution.restaurant || 0
  const customerCount = categoryDistribution.customer || 0
  const courierCount = categoryDistribution.courier || 0

  const getPercentage = (count: number) => {
    if (totalComplaints === 0) return 0
    return Math.round((count / totalComplaints) * 100)
  }

  const handleClick = () => {
    // Şikayetler sayfasına platform filtresi ile yönlendir
    navigate('/sikayetler', {
      state: { platformFilter: platform.name },
    })
  }

  const handleExportReport = async (e: React.MouseEvent, format: 'json' | 'csv') => {
    e.stopPropagation() // Kartın tıklama olayını durdur
    setIsExporting(true)
    try {
      exportPlatformReport(platform, complaints, format)
    } catch (error) {
      console.error('Rapor oluşturulurken hata:', error)
      alert('Rapor oluşturulurken bir hata oluştu.')
    } finally {
      setIsExporting(false)
    }
  }

  const getCategoryLabel = (category: ComplaintCategory) => {
    switch (category) {
      case 'restaurant':
        return 'Restoran'
      case 'customer':
        return 'Müşteri'
      case 'courier':
        return 'Kurye'
      default:
        return category
    }
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-600">
              {platform.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{platform.name}</h3>
            <p className="text-sm text-gray-500">Toplam {totalComplaints} şikayet</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary-600">{totalComplaints}</div>
          <div className="text-xs text-gray-500">şikayet</div>
        </div>
      </div>

      {/* Kategori Dağılımı */}
      {totalComplaints > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Kategori Dağılımı</h4>
          
          {/* Restoran */}
          {restaurantCount > 0 && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Restoran</span>
                <span className="text-sm font-medium text-gray-700">
                  {restaurantCount} ({getPercentage(restaurantCount)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all"
                  style={{ width: `${getPercentage(restaurantCount)}%` }}
                />
              </div>
            </div>
          )}

          {/* Müşteri */}
          {customerCount > 0 && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Müşteri</span>
                <span className="text-sm font-medium text-gray-700">
                  {customerCount} ({getPercentage(customerCount)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${getPercentage(customerCount)}%` }}
                />
              </div>
            </div>
          )}

          {/* Kurye */}
          {courierCount > 0 && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Kurye</span>
                <span className="text-sm font-medium text-gray-700">
                  {courierCount} ({getPercentage(courierCount)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${getPercentage(courierCount)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Durum İstatistikleri */}
      {totalComplaints > 0 && (
        <div className="mt-4 pt-4 border-t flex gap-4 text-sm">
          <div className="flex-1 text-center">
            <div className="text-lg font-bold text-yellow-600">
              {platformComplaints.filter((c) => c.status === 'pending').length}
            </div>
            <div className="text-xs text-gray-500">Beklemede</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-lg font-bold text-blue-600">
              {platformComplaints.filter((c) => c.status === 'reviewed').length}
            </div>
            <div className="text-xs text-gray-500">İncelendi</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-lg font-bold text-green-600">
              {platformComplaints.filter((c) => c.status === 'escalated').length}
            </div>
            <div className="text-xs text-gray-500">Üst Seviyeye</div>
          </div>
        </div>
      )}

      {/* Rapor İndirme Butonları */}
      {platformComplaints.filter((c) => c.status === 'escalated').length > 0 && (
        <div className="mt-4 pt-4 border-t" onClick={(e) => e.stopPropagation()}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resmi Rapor İndir
          </label>
          <div className="flex gap-2">
            <button
              onClick={(e) => handleExportReport(e, 'json')}
              disabled={isExporting}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? 'İndiriliyor...' : 'JSON İndir'}
            </button>
            <button
              onClick={(e) => handleExportReport(e, 'csv')}
              disabled={isExporting}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? 'İndiriliyor...' : 'CSV İndir'}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Sadece "Üst Seviyeye Taşındı" durumundaki şikayetler rapora dahil edilir.
          </p>
        </div>
      )}

      {/* Tıklama İpucu */}
      <div className="mt-4 pt-4 border-t">
        <p className="text-xs text-center text-primary-600 font-medium">
          Tıklayarak bu platforma ait şikayetleri görüntüle →
        </p>
      </div>
    </div>
  )
}

export default PlatformCard

