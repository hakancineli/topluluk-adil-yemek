import { useState } from 'react'
import { Complaint, OfficialInstitution } from '../types'
import { useStore } from '../store/useStore'
import {
  redirectToOfficialInstitution,
  officialInstitutionConfigs,
} from '../services/realOfficialComplaintService'
import { getEDevletInstitutionUrl, getAlternativeContactInfo } from '../utils/officialInstitutionHelper'

interface OfficialComplaintModalProps {
  complaint: Complaint
  onClose: () => void
}

const OfficialComplaintModal = ({ complaint, onClose }: OfficialComplaintModalProps) => {
  const { addOfficialComplaint } = useStore()
  const [selectedInstitution, setSelectedInstitution] = useState<OfficialInstitution | null>(null)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [editedComplaint, setEditedComplaint] = useState<{
    title: string
    description: string
  }>({
    title: complaint.title,
    description: complaint.description,
  })
  const [error, setError] = useState<string | null>(null)
  const [eDevletUserInfo, setEDevletUserInfo] = useState<{
    tcKimlik: string
    adSoyad: string
    email: string
    telefon: string
    adres: string
  } | null>(null)

  const institutionOptions = [
    {
      value: OfficialInstitution.REKABET_KURUMU,
      label: 'Rekabet Kurumu',
      description: 'Rekabet ihlalleri ve haksız rekabet uygulamaları için',
      icon: '⚖️',
    },
    {
      value: OfficialInstitution.TUKETICI_MAHKEMELERI,
      label: 'Tüketici Mahkemeleri',
      description: 'Hukuki başvurular ve tazminat talepleri için',
      icon: '🏛️',
    },
  ]

  // Form verilerini hazırla
  const getFormData = () => {
    if (!selectedInstitution) return null

    const updatedComplaint: Complaint = {
      ...complaint,
      title: editedComplaint.title,
      description: editedComplaint.description,
    }

    const redirectInfo = redirectToOfficialInstitution(
      updatedComplaint,
      selectedInstitution,
      eDevletUserInfo ? 'edevlet_token' : undefined
    )

    return {
      formData: redirectInfo.formData,
      instructions: redirectInfo.instructions,
      url: redirectInfo.url,
    }
  }

  const getInstitutionLabel = (institution: OfficialInstitution) => {
    return institutionOptions.find((opt) => opt.value === institution)?.label || institution
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Resmi Şikayet Oluştur</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Hata Mesajı */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Kurum Seçimi */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Kurum Seçimi ve E-devlet Girişi
            </h3>
            <p className="text-gray-600 mb-6">
              Şikayetinizi resmi bir kuruma ileteceksiniz. Kurum seçin ve e-devlet girişi yapın.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Resmi Kurum Seçin <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {institutionOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedInstitution(option.value)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      selectedInstitution === option.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{option.label}</div>
                        <div className="text-xs text-gray-600 mt-1">{option.description}</div>
                      </div>
                      {selectedInstitution === option.value && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* E-devlet Girişi (Kurum seçildikten sonra) */}
            {selectedInstitution && officialInstitutionConfigs[selectedInstitution].eDevletRequired && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
                <h4 className="font-semibold text-blue-900 mb-3">
                  E-devlet Girişi Gerekli
                </h4>
                <p className="text-sm text-blue-800 mb-4">
                  {officialInstitutionConfigs[selectedInstitution].name} başvurusu için 
                  e-devlet girişi yapmanız gerekmektedir. Aşağıdaki butona tıklayarak 
                  e-devlet'e giriş yapın.
                </p>
                <button
                  onClick={() => {
                    const url = getEDevletInstitutionUrl(selectedInstitution)
                    window.open(url, '_blank', 'noopener,noreferrer')
                  }}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  <span>E-devlet ile Giriş Yap</span>
                </button>
              </div>
            )}

            {/* Gizlilik Politikası */}
            <div className="bg-gray-50 p-4 rounded-lg mt-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="mt-1"
                />
                <div className="text-sm text-gray-700">
                  <span className="font-medium">Gizlilik Politikasını Kabul Ediyorum</span>
                  <p className="text-gray-600 mt-1">
                    Şikayetimin seçtiğim resmi kuruma iletilmesi ve işlenmesi için onay
                    veriyorum. Kişisel verilerim{' '}
                    <a href="#" className="text-primary-600 hover:underline">
                      gizlilik politikamız
                    </a>{' '}
                    kapsamında korunmaktadır.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Şikayet Düzenleme ve Form Verileri */}
          {selectedInstitution && (
            <div className="space-y-6 mt-8 border-t pt-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Şikayet Düzenleme ve Form Verileri
                </h3>
                <p className="text-gray-600 mb-6">
                  Şikayetinizi düzenleyin ve aşağıdaki form verilerini kopyalayarak resmi kurum sayfasındaki formu doldurun.
                </p>

                {/* E-devlet Giriş Yapıldı Bilgisi */}
                {officialInstitutionConfigs[selectedInstitution].eDevletRequired && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <div className="font-semibold text-green-900">
                          E-devlet girişi yapıldı
                        </div>
                        <div className="text-sm text-green-700">
                          E-devlet sayfasında giriş yaptıysanız, aşağıdaki form verilerini kullanarak başvurunuzu tamamlayabilirsiniz.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Seçilen Kurum Bilgisi */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {institutionOptions.find((opt) => opt.value === selectedInstitution)?.icon}
                    </span>
                    <div>
                      <div className="font-semibold text-blue-900">
                        {getInstitutionLabel(selectedInstitution)}
                      </div>
                      <div className="text-sm text-blue-700">
                        Form verileriniz aşağıda hazır
                      </div>
                    </div>
                  </div>
                </div>

                {/* Düzenlenebilir Form */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Başlık <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editedComplaint.title}
                      onChange={(e) =>
                        setEditedComplaint({ ...editedComplaint, title: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Şikayet başlığı"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Açıklama <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={editedComplaint.description}
                      onChange={(e) =>
                        setEditedComplaint({ ...editedComplaint, description: e.target.value })
                      }
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Şikayet detayları"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      {editedComplaint.description.length} karakter
                    </p>
                  </div>

                  {/* Orijinal Bilgiler */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>
                        <span className="font-medium">Platform:</span> {complaint.platform}
                      </div>
                      <div>
                        <span className="font-medium">Kategori:</span>{' '}
                        {complaint.category === 'restaurant'
                          ? 'Restoran'
                          : complaint.category === 'customer'
                          ? 'Müşteri'
                          : 'Kurye'}
                      </div>
                      <div>
                        <span className="font-medium">Oy Sayısı:</span> {complaint.upvotes}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Verileri */}
                {(() => {
                  const formInfo = getFormData()
                  if (!formInfo) return null

                  return (
                    <div className="space-y-4">
                      {/* Resmi Kurum Bilgisi */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="text-sm font-semibold text-blue-900 mb-3">
                          {officialInstitutionConfigs[selectedInstitution].name}
                        </div>
                        <p className="text-xs text-blue-700 mb-4">
                          Aşağıdaki form bilgilerini kopyalayarak resmi kurum sayfasındaki formu doldurabilirsiniz.
                        </p>
                      </div>

                      {/* Form Verileri */}
                      {formInfo.formData && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Form Bilgileri (Kopyalayın)
                          </h4>
                          <div className="space-y-2 mb-4">
                            {Object.entries(formInfo.formData).map(([key, value]) => (
                              <div key={key} className="text-sm">
                                <span className="font-medium text-gray-700">{key}:</span>{' '}
                                <span className="text-gray-900 bg-white px-2 py-1 rounded border">
                                  {value}
                                </span>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(value)
                                    alert(`${key} kopyalandı!`)
                                  }}
                                  className="ml-2 text-primary-600 hover:text-primary-700 text-xs"
                                >
                                  Kopyala
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => {
                              const allText = Object.entries(formInfo.formData || {})
                                .map(([key, value]) => `${key}: ${value}`)
                                .join('\n')
                              navigator.clipboard.writeText(allText)
                              alert('Tüm bilgiler kopyalandı!')
                            }}
                            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                          >
                            Tümünü Kopyala
                          </button>
                        </div>
                      )}

                      {/* Talimatlar */}
                      {formInfo.instructions && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <h4 className="font-semibold text-yellow-900 mb-2">Talimatlar</h4>
                          <pre className="text-xs text-yellow-800 whitespace-pre-wrap">
                            {formInfo.instructions}
                          </pre>
                        </div>
                      )}

                      {/* Alternatif İletişim Bilgileri */}
                      {(() => {
                        const contactInfo = getAlternativeContactInfo(selectedInstitution)
                        if (contactInfo.email || contactInfo.phone || contactInfo.address) {
                          return (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                                Alternatif İletişim
                              </h4>
                              <div className="text-xs text-gray-700 space-y-1">
                                {contactInfo.email && (
                                  <div>
                                    <strong>E-posta:</strong>{' '}
                                    <a
                                      href={`mailto:${contactInfo.email}`}
                                      className="text-primary-600 hover:underline"
                                    >
                                      {contactInfo.email}
                                    </a>
                                  </div>
                                )}
                                {contactInfo.phone && (
                                  <div>
                                    <strong>Telefon:</strong> {contactInfo.phone}
                                  </div>
                                )}
                                {contactInfo.address && (
                                  <div>
                                    <strong>Adres:</strong> {contactInfo.address}
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        }
                        return null
                      })()}
                    </div>
                  )
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OfficialComplaintModal
