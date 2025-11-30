import { useState, FormEvent } from 'react'
import { contactService } from '../services/contactService'
import { useNotifications } from '../hooks/useNotifications'
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa'

const ContactPage = () => {
  const { showSuccess, showError } = useNotifications()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'İsim zorunludur'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-posta zorunludur'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Konu zorunludur'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mesaj zorunludur'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mesaj en az 10 karakter olmalıdır'
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
      await contactService.createMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      })

      showSuccess('Mesaj Gönderildi', 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.')
      
      // Formu temizle
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      console.error('Mesaj gönderilirken hata:', error)
      showError('Hata', 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    <div className="max-w-4xl mx-auto px-2 md:px-0">
      <div className="space-y-6 md:space-y-8">
        {/* Hero Section */}
        <div className="text-center py-6 md:py-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            İletişim
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle iletişime geçin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* İletişim Bilgileri */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">İletişim Bilgileri</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-primary-600 text-xl mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">E-posta</p>
                    <a href="mailto:info@adilyemek.com" className="text-primary-600 hover:text-primary-700">
                      info@adilyemek.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-primary-600 text-xl mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Adres</p>
                    <p className="text-gray-600">Türkiye</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl shadow-lg border border-primary-200">
              <h3 className="font-semibold text-gray-900 mb-3">Sosyal Medya</h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-lg text-primary-600 hover:bg-primary-50 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-lg text-primary-600 hover:bg-primary-50 transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-lg text-primary-600 hover:bg-primary-50 transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>

          {/* İletişim Formu */}
          <div className="lg:col-span-2">
            <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bize Mesaj Gönderin</h2>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      İsim <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 md:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Adınız Soyadınız"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 md:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Konu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-3 md:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Mesajınızın konusu"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mesaj <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-3 md:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Mesajınızı buraya yazın..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.message.length} karakter (minimum 10 karakter)
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 bg-primary-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors text-sm md:text-base ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage

