import { useState, useEffect, useMemo } from 'react'
import { complaintApi } from '../services/complaintApi'
import { Complaint, ComplaintStatus } from '../types'
import { useNotifications } from '../hooks/useNotifications'

const AdminComplaintsPage = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<ComplaintStatus | 'all'>('all')
  const [filterCategory, setFilterCategory] = useState<'all' | 'restaurant' | 'customer' | 'courier'>('all')
  const [filterPlatform, setFilterPlatform] = useState<string>('all')
  const { showSuccess, showError } = useNotifications()

  useEffect(() => {
    loadComplaints()
  }, [])

  const loadComplaints = async () => {
    setIsLoading(true)
    try {
      const data = await complaintApi.getAll()
      setComplaints(data)
    } catch (error) {
      console.error('Şikayetler yüklenirken hata:', error)
      showError('Hata', 'Şikayetler yüklenirken bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (id: string, newStatus: ComplaintStatus) => {
    try {
      await complaintApi.updateStatus(id, newStatus)
      await loadComplaints()
      showSuccess('Başarılı', 'Şikayet durumu güncellendi')
    } catch (error) {
      console.error('Durum güncellenirken hata:', error)
      showError('Hata', 'Durum güncellenirken bir hata oluştu')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu şikayeti silmek istediğinizden emin misiniz?')) {
      return
    }

    try {
      await complaintApi.delete(id)
      await loadComplaints()
      showSuccess('Başarılı', 'Şikayet silindi')
    } catch (error) {
      console.error('Şikayet silinirken hata:', error)
      showError('Hata', 'Şikayet silinirken bir hata oluştu')
    }
  }

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      if (filterStatus !== 'all' && complaint.status !== filterStatus) return false
      if (filterCategory !== 'all' && complaint.category !== filterCategory) return false
      if (filterPlatform !== 'all' && complaint.platform !== filterPlatform) return false
      return true
    })
  }, [complaints, filterStatus, filterCategory, filterPlatform])

  const platforms = useMemo(() => {
    return Array.from(new Set(complaints.map(c => c.platform))).sort()
  }, [complaints])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Şikayet Yönetimi</h1>
          <p className="text-gray-600 mt-1">Toplam {complaints.length} şikayet</p>
        </div>
      </div>

      {/* Filtreler */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ComplaintStatus | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Tümü</option>
              <option value="pending">Beklemede</option>
              <option value="reviewed">İncelendi</option>
              <option value="escalated">Üst Seviyeye Taşındı</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as typeof filterCategory)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Tümü</option>
              <option value="restaurant">Restoran</option>
              <option value="customer">Müşteri</option>
              <option value="courier">Kurye</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Tümü</option>
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Şikayet Listesi */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başlık
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Oy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    Şikayet bulunamadı
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {complaint.title}
                        </div>
                        <div className="text-sm text-gray-500 truncate mt-1">
                          {complaint.description.substring(0, 60)}...
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {complaint.platform}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {complaint.category === 'restaurant' ? 'Restoran' :
                       complaint.category === 'customer' ? 'Müşteri' : 'Kurye'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={complaint.status}
                        onChange={(e) => handleStatusChange(complaint.id, e.target.value as ComplaintStatus)}
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          complaint.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        } border-0 focus:ring-2 focus:ring-primary-500`}
                      >
                        <option value="pending">Beklemede</option>
                        <option value="reviewed">İncelendi</option>
                        <option value="escalated">Üst Seviyeye Taşındı</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {complaint.upvotes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(complaint.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleDelete(complaint.id)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sayfalama bilgisi */}
      <div className="text-center text-sm text-gray-600">
        {filteredComplaints.length} şikayet gösteriliyor (toplam {complaints.length})
      </div>
    </div>
  )
}

export default AdminComplaintsPage

