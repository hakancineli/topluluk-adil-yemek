import { useState, useEffect, useMemo } from 'react'
import { platformService } from '../services/platformService'
import { useStore } from '../store/useStore'
import { Platform } from '../types'
import { useNotifications } from '../hooks/useNotifications'

const AdminPlatformsPage = () => {
  const { complaints } = useStore()
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
  })
  const { showSuccess, showError } = useNotifications()

  useEffect(() => {
    loadPlatforms()
  }, [])

  const loadPlatforms = async () => {
    setIsLoading(true)
    try {
      // Önce localStorage'dan yükle
      const storedPlatforms = await platformService.getAll()
      
      // Eğer localStorage'da platform yoksa, şikayetlerden oluştur
      if (storedPlatforms.length === 0) {
        const platformMap = new Map<string, number>()
        complaints.forEach((complaint) => {
          const count = platformMap.get(complaint.platform) || 0
          platformMap.set(complaint.platform, count + 1)
        })
        
        const newPlatforms: Platform[] = []
        let id = 1
        platformMap.forEach((totalComplaints, name) => {
          newPlatforms.push({
            id: id.toString(),
            name,
            logo: `https://via.placeholder.com/150x80?text=${encodeURIComponent(name)}`,
            totalComplaints,
          })
          id++
        })
        
        // Platformları localStorage'a kaydet
        for (const platform of newPlatforms) {
          try {
            await platformService.create(platform)
          } catch (error) {
            console.error('Platform kaydedilirken hata:', error)
          }
        }
        
        setPlatforms(newPlatforms)
      } else {
        // Şikayet sayılarını güncelle
        const platformMap = new Map<string, number>()
        complaints.forEach((complaint) => {
          const count = platformMap.get(complaint.platform) || 0
          platformMap.set(complaint.platform, count + 1)
        })
        
        const updatedPlatforms = storedPlatforms.map((platform) => ({
          ...platform,
          totalComplaints: platformMap.get(platform.name) || 0,
        }))
        
        setPlatforms(updatedPlatforms)
      }
    } catch (error) {
      console.error('Platformlar yüklenirken hata:', error)
      showError('Hata', 'Platformlar yüklenirken bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      showError('Hata', 'Platform adı zorunludur')
      return
    }

    try {
      const newPlatform = await platformService.create({
        name: formData.name.trim(),
        logo: formData.logo.trim() || `https://via.placeholder.com/150x80?text=${encodeURIComponent(formData.name.trim())}`,
        totalComplaints: 0,
      })
      
      setPlatforms([...platforms, newPlatform])
      setFormData({ name: '', logo: '' })
      setIsCreating(false)
      showSuccess('Başarılı', 'Platform oluşturuldu')
    } catch (error) {
      console.error('Platform oluşturulurken hata:', error)
      showError('Hata', 'Platform oluşturulurken bir hata oluştu')
    }
  }

  const handleUpdate = async (id: string) => {
    const platform = platforms.find(p => p.id === id)
    if (!platform) return

    if (!formData.name.trim()) {
      showError('Hata', 'Platform adı zorunludur')
      return
    }

    try {
      const updated = await platformService.update(id, {
        name: formData.name.trim(),
        logo: formData.logo.trim() || platform.logo,
      })
      
      setPlatforms(platforms.map(p => p.id === id ? updated : p))
      setEditingId(null)
      setFormData({ name: '', logo: '' })
      showSuccess('Başarılı', 'Platform güncellendi')
    } catch (error) {
      console.error('Platform güncellenirken hata:', error)
      showError('Hata', 'Platform güncellenirken bir hata oluştu')
    }
  }

  const handleDelete = async (id: string) => {
    const platform = platforms.find(p => p.id === id)
    if (!platform) return

    if (platform.totalComplaints > 0) {
      showError('Hata', 'Bu platforma ait şikayetler var, silinemez')
      return
    }

    if (!confirm(`"${platform.name}" platformunu silmek istediğinizden emin misiniz?`)) {
      return
    }

    try {
      await platformService.delete(id)
      setPlatforms(platforms.filter(p => p.id !== id))
      showSuccess('Başarılı', 'Platform silindi')
    } catch (error) {
      console.error('Platform silinirken hata:', error)
      showError('Hata', 'Platform silinirken bir hata oluştu')
    }
  }

  const startEdit = (platform: Platform) => {
    setEditingId(platform.id)
    setFormData({
      name: platform.name,
      logo: platform.logo,
    })
    setIsCreating(false)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setIsCreating(false)
    setFormData({ name: '', logo: '' })
  }

  const filteredPlatforms = useMemo(() => {
    if (!searchTerm) return platforms
    const search = searchTerm.toLowerCase()
    return platforms.filter(p => p.name.toLowerCase().includes(search))
  }, [platforms, searchTerm])

  const totalComplaints = useMemo(() => {
    return platforms.reduce((sum, p) => sum + p.totalComplaints, 0)
  }, [platforms])

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
          <h1 className="text-3xl font-bold text-gray-900">Platform Yönetimi</h1>
          <p className="text-gray-600 mt-1">
            Toplam {platforms.length} platform, {totalComplaints.toLocaleString('tr-TR')} şikayet
          </p>
        </div>
        <button
          onClick={() => {
            setIsCreating(true)
            setEditingId(null)
            setFormData({ name: '', logo: '' })
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          + Yeni Platform
        </button>
      </div>

      {/* Yeni Platform Formu */}
      {isCreating && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Yeni Platform Ekle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform Adı <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Örn: Yemeksepeti"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo URL (Opsiyonel)
              </label>
              <input
                type="text"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleCreate}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Kaydet
            </button>
            <button
              onClick={cancelEdit}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Arama */}
      <div className="bg-white p-4 rounded-lg shadow">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Platform ara..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Platform Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlatforms.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            Platform bulunamadı
          </div>
        ) : (
          filteredPlatforms.map((platform) => (
            <div key={platform.id} className="bg-white p-6 rounded-lg shadow">
              {editingId === platform.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Platform Adı <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo URL
                    </label>
                    <input
                      type="text"
                      value={formData.logo}
                      onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(platform.id)}
                      className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Kaydet
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      İptal
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(platform)}
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDelete(platform.id)}
                        disabled={platform.totalComplaints > 0}
                        className={`text-sm ${
                          platform.totalComplaints > 0
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-red-600 hover:text-red-700'
                        }`}
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <img
                      src={platform.logo}
                      alt={platform.name}
                      className="w-full h-24 object-contain bg-gray-50 rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/150x80?text=${encodeURIComponent(platform.name)}`
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Şikayet Sayısı</span>
                    <span className="text-lg font-bold text-primary-600">
                      {platform.totalComplaints.toLocaleString('tr-TR')}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AdminPlatformsPage

