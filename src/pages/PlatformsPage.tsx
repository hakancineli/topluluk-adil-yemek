import { useState } from 'react'
import { useStore } from '../store/useStore'
import PlatformCard from '../components/PlatformCard'
import { exportAllPlatformsReport } from '../utils/reportUtils'

const PlatformsPage = () => {
  const { platforms, complaints } = useStore()
  const [isExporting, setIsExporting] = useState(false)

  const handleExportAll = async (format: 'json' | 'csv') => {
    setIsExporting(true)
    try {
      exportAllPlatformsReport(platforms, complaints, format)
    } catch (error) {
      console.error('Rapor oluşturulurken hata:', error)
      alert('Rapor oluşturulurken bir hata oluştu.')
    } finally {
      setIsExporting(false)
    }
  }

  // Toplam istatistikler
  const totalComplaints = complaints.length
  const totalPlatforms = platforms.length
  const totalUpvotes = complaints.reduce((sum, complaint) => sum + complaint.upvotes, 0)

  // En çok şikayet alan platformlar (sıralı)
  const sortedPlatforms = [...platforms].sort((a, b) => {
    const aComplaints = complaints.filter((c) => c.platform === a.name).length
    const bComplaints = complaints.filter((c) => c.platform === b.name).length
    return bComplaints - aComplaints
  })

  return (
    <div className="space-y-6 md:space-y-8 px-2 md:px-0">
      {/* Başlık ve Genel İstatistikler */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3">
          <h1 className="text-2xl md:text-3xl font-bold">Platformlar</h1>
          {complaints.filter((c) => c.status === 'escalated').length > 0 && (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleExportAll('json')}
                disabled={isExporting}
                className="px-3 md:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-xs md:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? 'İndiriliyor...' : 'JSON İndir'}
              </button>
              <button
                onClick={() => handleExportAll('csv')}
                disabled={isExporting}
                className="px-3 md:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs md:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? 'İndiriliyor...' : 'CSV İndir'}
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow">
            <h2 className="text-xl md:text-2xl font-bold text-primary-600 mb-2">
              {totalPlatforms}
            </h2>
            <p className="text-sm md:text-base text-gray-600">Aktif Platform</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow">
            <h2 className="text-xl md:text-2xl font-bold text-primary-600 mb-2">
              {totalComplaints.toLocaleString('tr-TR')}
            </h2>
            <p className="text-sm md:text-base text-gray-600">Toplam Şikayet</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow sm:col-span-2 md:col-span-1">
            <h2 className="text-xl md:text-2xl font-bold text-primary-600 mb-2">
              {totalUpvotes.toLocaleString('tr-TR')}
            </h2>
            <p className="text-sm md:text-base text-gray-600">Toplam Oy</p>
          </div>
        </div>
      </div>

      {/* Platform Kartları */}
      {sortedPlatforms.length === 0 ? (
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-md text-center">
          <p className="text-base md:text-lg text-gray-600">Henüz platform eklenmemiş.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {sortedPlatforms.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              complaints={complaints}
            />
          ))}
        </div>
      )}

      {/* Bilgilendirme */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Platform İstatistikleri Hakkında
        </h3>
        <p className="text-blue-800 text-sm">
          Her platform kartına tıklayarak o platforma ait tüm şikayetleri görüntüleyebilir,
          kategorilere göre dağılımı inceleyebilir ve şikayet durumlarını takip edebilirsiniz.
        </p>
      </div>
    </div>
  )
}

export default PlatformsPage
