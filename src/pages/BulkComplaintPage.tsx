import { useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import {
  findSimilarComplaints,
  createBulkComplaint,
  generateBulkComplaintSummary,
} from '../utils/bulkComplaintUtils'
import { Complaint, BulkComplaint, OfficialInstitution } from '../types'
import { officialComplaintService } from '../services/officialComplaintService'

const BulkComplaintPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { complaints, addBulkComplaint, updateBulkComplaintStatus } = useStore()

  const [selectedPlatform, setSelectedPlatform] = useState<string>(
    location.state?.platform || ''
  )
  const [selectedCategory, setSelectedCategory] = useState<string>(
    location.state?.category || ''
  )
  const [selectedComplaints, setSelectedComplaints] = useState<string[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [createdBulkId, setCreatedBulkId] = useState<string | null>(null)

  // Filtrelenmiş şikayetler
  const filteredComplaints = useMemo(() => {
    let filtered = [...complaints]

    if (selectedPlatform) {
      filtered = filtered.filter((c) => c.platform === selectedPlatform)
    }

    if (selectedCategory) {
      filtered = filtered.filter((c) => c.category === selectedCategory)
    }

    return filtered
  }, [complaints, selectedPlatform, selectedCategory])

  // Benzer şikayetleri grupla
  const groupedComplaints = useMemo(() => {
    const groups: Record<string, Complaint[]> = {}

    filteredComplaints.forEach((complaint) => {
      const similar = findSimilarComplaints(complaint, filteredComplaints, 2)
      if (similar.length > 0) {
        const key = `${complaint.platform}-${complaint.category}-${complaint.title
          .toLowerCase()
          .split(/\s+/)
          .slice(0, 3)
          .join('-')}`
        if (!groups[key]) {
          groups[key] = [complaint, ...similar]
        }
      }
    })

    return Object.values(groups).filter((group) => group.length >= 3)
  }, [filteredComplaints])

  const handleCreateBulk = () => {
    if (selectedComplaints.length < 3) {
      alert('En az 3 şikayet seçmelisiniz')
      return
    }

    setIsCreating(true)
    const selected = filteredComplaints.filter((c) =>
      selectedComplaints.includes(c.id)
    )

    const bulk = createBulkComplaint(selected, 3)
    if (bulk) {
      addBulkComplaint(bulk)
      setCreatedBulkId(bulk.id)
      setIsCreating(false)
    } else {
      alert('Toplu şikayet oluşturulamadı')
      setIsCreating(false)
    }
  }

  const handleSubmitBulk = async (bulk: BulkComplaint) => {
    const bulkComplaintsList = filteredComplaints.filter((c) =>
      bulk.complaintIds.includes(c.id)
    )

    // İlk şikayeti temel alarak resmi şikayet oluştur
    const baseComplaint = bulkComplaintsList[0]
    const summary = generateBulkComplaintSummary(bulk, bulkComplaintsList)

    // Özet ile birleştirilmiş şikayet oluştur
    const combinedComplaint: Complaint = {
      ...baseComplaint,
      title: `${bulk.platform} - Toplu Şikayet (${bulk.totalComplaints} kullanıcı)`,
      description: summary,
    }

    // Rekabet Kurumu'na gönder (varsayılan)
    try {
      const result = await officialComplaintService.submitComplaint(
        combinedComplaint,
        OfficialInstitution.REKABET_KURUMU
      )

      if (result.success) {
        updateBulkComplaintStatus(bulk.id, 'submitted')
        alert(`Toplu şikayet başarıyla gönderildi! Takip Numarası: ${result.officialId}`)
      }
    } catch (error) {
      console.error('Toplu şikayet gönderilirken hata:', error)
      alert('Toplu şikayet gönderilirken bir hata oluştu')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Toplu Şikayet Oluştur</h1>
        <p className="text-gray-600">
          Benzer şikayetleri birleştirerek daha etkili resmi şikayetler oluşturun.
        </p>
      </div>

      {/* Filtreler */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Tüm Platformlar</option>
              {Array.from(new Set(complaints.map((c) => c.platform))).map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Tüm Kategoriler</option>
              <option value="restaurant">Restoran</option>
              <option value="customer">Müşteri</option>
              <option value="courier">Kurye</option>
            </select>
          </div>
        </div>
      </div>

      {/* Benzer Şikayet Grupları */}
      {groupedComplaints.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Benzer Şikayet Grupları ({groupedComplaints.length} grup)
          </h2>
          {groupedComplaints.map((group, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {group[0].platform} - {group.length} Benzer Şikayet
                  </h3>
                  <p className="text-sm text-gray-600">
                    Kategori: {group[0].category === 'restaurant' ? 'Restoran' : group[0].category === 'customer' ? 'Müşteri' : 'Kurye'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">
                    {group.reduce((sum, c) => sum + c.upvotes, 0)}
                  </div>
                  <div className="text-xs text-gray-500">Toplam Oy</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {group.slice(0, 3).map((complaint) => (
                  <div key={complaint.id} className="text-sm text-gray-700 border-l-2 border-gray-200 pl-3">
                    <span className="font-medium">{complaint.title}</span>
                    <span className="text-gray-500 ml-2">({complaint.upvotes} oy)</span>
                  </div>
                ))}
                {group.length > 3 && (
                  <div className="text-sm text-gray-500 pl-3">
                    +{group.length - 3} şikayet daha...
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={group.every((c) => selectedComplaints.includes(c.id))}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedComplaints([
                          ...selectedComplaints,
                          ...group.map((c) => c.id).filter((id) => !selectedComplaints.includes(id)),
                        ])
                      } else {
                        setSelectedComplaints(
                          selectedComplaints.filter((id) => !group.some((c) => c.id === id))
                        )
                      }
                    }}
                  />
                  <span className="text-sm">Tümünü Seç</span>
                </label>
              </div>
            </div>
          ))}

          {/* Toplu Şikayet Oluştur Butonu */}
          {selectedComplaints.length >= 3 && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {selectedComplaints.length} şikayet seçildi
                  </h3>
                  <p className="text-sm text-gray-600">
                    Seçilen şikayetleri birleştirerek toplu şikayet oluşturabilirsiniz.
                  </p>
                </div>
                <button
                  onClick={handleCreateBulk}
                  disabled={isCreating}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50"
                >
                  {isCreating ? 'Oluşturuluyor...' : 'Toplu Şikayet Oluştur'}
                </button>
              </div>
            </div>
          )}

          {/* Oluşturulan Toplu Şikayetler */}
          {createdBulkId && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">✓ Toplu Şikayet Oluşturuldu!</h3>
              <p className="text-sm text-gray-700 mb-4">
                Toplu şikayetinizi resmi kurumlara gönderebilirsiniz.
              </p>
              <button
                onClick={() => navigate('/resmi-sikayetlerim')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Resmi Şikayetlerim Sayfasına Git
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-lg shadow-md text-center">
          <p className="text-gray-600">
            {selectedPlatform || selectedCategory
              ? 'Seçilen kriterlere uygun benzer şikayet grubu bulunamadı.'
              : 'Benzer şikayet grupları bulmak için platform ve kategori seçin.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default BulkComplaintPage

