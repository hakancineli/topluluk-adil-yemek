import { useState, useMemo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useStore } from '../store/useStore'
import ComplaintCard from '../components/ComplaintCard'
import { ComplaintCategory } from '../types'

const ComplaintsPage = () => {
  const location = useLocation()
  const { complaints, platforms } = useStore()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<ComplaintCategory | 'all'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'mostVoted'>('newest')

  // Başarı mesajını göster (form'dan yönlendirme sonrası)
  const successMessage = location.state?.message

  // Platform filtresi yönlendirmesi (PlatformCard'dan geliyorsa)
  useEffect(() => {
    const platformFilter = location.state?.platformFilter
    if (platformFilter) {
      setSelectedPlatform(platformFilter)
      // State'i temizle (geri butonuna basıldığında tekrar filtreleme yapmasın)
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  // Filtrelenmiş ve sıralanmış şikayetler
  const filteredAndSortedComplaints = useMemo(() => {
    let filtered = [...complaints]

    // Arama filtresi
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (complaint) =>
          complaint.title.toLowerCase().includes(query) ||
          complaint.description.toLowerCase().includes(query)
      )
    }

    // Platform filtresi
    if (selectedPlatform) {
      filtered = filtered.filter((complaint) => complaint.platform === selectedPlatform)
    }

    // Kategori filtresi
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((complaint) => complaint.category === selectedCategory)
    }

    // Sıralama
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime()
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime()
        case 'mostVoted':
          return b.upvotes - a.upvotes
        default:
          return 0
      }
    })

    return filtered
  }, [complaints, searchQuery, selectedPlatform, selectedCategory, sortBy])

  const getCategoryLabel = (category: ComplaintCategory | 'all') => {
    if (category === 'all') return 'Tümü'
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Şikayetler</h1>
        <div className="text-sm text-gray-600">
          Toplam <span className="font-bold text-primary-600">{filteredAndSortedComplaints.length}</span> şikayet
        </div>
      </div>

      {/* Başarı mesajı */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Filtreleme ve Arama */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        {/* Arama çubuğu */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Arama
          </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Başlık veya açıklamada ara..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Filtreler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Platform filtresi */}
          <div>
            <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-2">
              Platforma Göre Filtrele
            </label>
            <select
              id="platform"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Tüm Platformlar</option>
              {platforms.map((platform) => (
                <option key={platform.id} value={platform.name}>
                  {platform.name}
                </option>
              ))}
            </select>
          </div>

          {/* Kategori filtresi */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Kategoriye Göre Filtrele
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ComplaintCategory | 'all')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">Tümü</option>
              <option value="restaurant">Restoran</option>
              <option value="customer">Müşteri</option>
              <option value="courier">Kurye</option>
            </select>
          </div>

          {/* Sıralama */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
              Sırala
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'mostVoted')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="newest">En Yeni</option>
              <option value="oldest">En Eski</option>
              <option value="mostVoted">En Çok Oy Alan</option>
            </select>
          </div>
        </div>

        {/* Aktif filtreleri temizle */}
        {(selectedPlatform || selectedCategory !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedPlatform('')
              setSelectedCategory('all')
              setSearchQuery('')
            }}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Filtreleri Temizle
          </button>
        )}
      </div>

      {/* Şikayet Listesi */}
      {filteredAndSortedComplaints.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-md text-center">
          <p className="text-gray-600 text-lg">Şikayet bulunamadı.</p>
          <p className="text-gray-500 mt-2">
            Filtreleri değiştirerek tekrar deneyin veya yeni bir şikayet oluşturun.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedComplaints.map((complaint) => (
            <ComplaintCard key={complaint.id} complaint={complaint} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ComplaintsPage
