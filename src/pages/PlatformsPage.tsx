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
    <div className="space-y-8">
      {/* Başlık ve Genel İstatistikler */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Platformlar</h1>
          {complaints.filter((c) => c.status === 'escalated').length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => handleExportAll('json')}
                disabled={isExporting}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? 'İndiriliyor...' : 'Tüm Raporları JSON İndir'}
              </button>
              <button
                onClick={() => handleExportAll('csv')}
                disabled={isExporting}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? 'İndiriliyor...' : 'Tüm Raporları CSV İndir'}
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-primary-600 mb-2">
              {totalPlatforms}
            </h2>
            <p className="text-gray-600">Aktif Platform</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-primary-600 mb-2">
              {totalComplaints.toLocaleString('tr-TR')}
            </h2>
            <p className="text-gray-600">Toplam Şikayet</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-primary-600 mb-2">
              {totalUpvotes.toLocaleString('tr-TR')}
            </h2>
            <p className="text-gray-600">Toplam Oy</p>
          </div>
        </div>
      </div>

      {/* Platform Kartları */}
      {sortedPlatforms.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-md text-center">
          <p className="text-gray-600 text-lg">Henüz platform eklenmemiş.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
