import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { useNotifications } from '../hooks/useNotifications'
import { ComplaintCategory } from '../types'

const ComplaintForm = () => {
  const navigate = useNavigate()
  const { addComplaint, platforms } = useStore()
  const { showSuccess, showError } = useNotifications()
  
  // Sabit platform listesi - tüm popüler yemek sipariş platformları
  const allPlatforms = [
    'Yemeksepeti',
    'GetirYemek',
    'Trendyol Yemek',
    'Banabi',
    'Migros Yemek',
    'CarrefourSA Yemek',
    'Yemek.com',
    'Siparişim',
    'Yemek Diyarı',
    'Yemek Kapında',
    'Yemeksepeti Go',
    'Getir',
    'Trendyol Go',
    'Diğer'
  ]
  
  // Store'daki platformları ve sabit listeyi birleştir (benzersiz ve sıralı)
  const availablePlatforms = Array.from(
    new Set([...allPlatforms, ...platforms.map(p => p.name)])
  ).sort()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'customer' as ComplaintCategory,
    platform: '',
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Başlık zorunludur'
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Başlık en az 5 karakter olmalıdır'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Açıklama zorunludur'
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Açıklama en az 20 karakter olmalıdır'
    }

    if (!formData.platform) {
      newErrors.platform = 'Platform seçimi zorunludur'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Store'a şikayeti ekle
      await addComplaint({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        platform: formData.platform,
      })

      // Formu sıfırla
      setFormData({
        title: '',
        description: '',
        category: 'customer',
        platform: '',
      })
      setErrors({})

      // Başarı mesajı göster
      showSuccess('Şikayet oluşturuldu', 'Şikayetiniz başarıyla oluşturuldu!')

      // Yönlendir
      setTimeout(() => {
        navigate('/sikayetler', { state: { message: 'Şikayetiniz başarıyla oluşturuldu!' } })
      }, 500)
    } catch (error) {
      console.error('Şikayet oluşturulurken hata:', error)
      showError('Hata', 'Şikayet oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.')
      setErrors({ submit: 'Bir hata oluştu. Lütfen tekrar deneyin.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Hata varsa temizle
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-2 md:px-0">
      <form onSubmit={handleSubmit} className="bg-white p-4 md:p-8 rounded-lg shadow-lg space-y-4 md:space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Yeni Şikayet Oluştur</h2>

        {/* Başlık */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Başlık <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 md:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Örn: Yemeksepeti Yüksek Komisyon Oranı"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* Açıklama */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Açıklama <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            className={`w-full px-3 md:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Şikayetinizi detaylı bir şekilde açıklayın..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            {formData.description.length}/500 karakter (minimum 20 karakter)
          </p>
        </div>

        {/* Kim Şikayetçi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kim Şikayetçi? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {(['restaurant', 'customer', 'courier'] as ComplaintCategory[]).map((category) => (
              <label
                key={category}
                className={`flex items-center p-3 md:p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.category === category
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={formData.category === category}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="font-medium">
                  {category === 'restaurant' ? 'Restoran' : category === 'customer' ? 'Müşteri' : 'Kurye'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Platform */}
        <div>
          <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-2">
            Platform <span className="text-red-500">*</span>
          </label>
          <select
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.platform ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Platform seçin...</option>
            {availablePlatforms.map((platformName) => (
              <option key={platformName} value={platformName}>
                {platformName}
              </option>
            ))}
          </select>
          {errors.platform && (
            <p className="mt-1 text-sm text-red-600">{errors.platform}</p>
          )}
        </div>

        {/* Hata mesajı */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {errors.submit}
          </div>
        )}

        {/* Gönder butonu */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 bg-primary-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors text-sm md:text-base ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Gönderiliyor...' : 'Şikayeti Gönder'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/sikayetler')}
            className="px-4 md:px-6 py-2 md:py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors text-sm md:text-base"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  )
}

export default ComplaintForm

