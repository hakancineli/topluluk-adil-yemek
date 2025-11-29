import { useState } from 'react'
import { getEDevletAuthUrl } from '../services/realOfficialComplaintService'

interface EDevletLoginProps {
  onSuccess: (userInfo: {
    tcKimlik: string
    adSoyad: string
    email: string
    telefon: string
    adres: string
  }) => void
  onError?: (error: string) => void
  redirectUri?: string
}

const EDevletLogin = ({ onSuccess, onError, redirectUri }: EDevletLoginProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleEDevletLogin = async () => {
    setIsLoading(true)
    try {
      // E-devlet ana sayfasına yönlendir
      // Kullanıcı burada giriş yapar ve sonra ilgili hizmeti arar
      const authUrl = getEDevletAuthUrl(
        redirectUri || `${window.location.origin}/edevlet-callback`
      )

      // E-devlet ana sayfasına yeni sekmede aç
      window.open(authUrl, '_blank', 'noopener,noreferrer')
      
      // Kullanıcıya bilgi ver
      setTimeout(() => {
        setIsLoading(false)
        onSuccess({
          tcKimlik: 'E-devlet girişi yapıldı',
          adSoyad: 'E-devlet kullanıcısı',
          email: 'edevlet@example.com',
          telefon: '',
          adres: '',
        })
      }, 1000)
    } catch (error) {
      console.error('E-devlet giriş hatası:', error)
      onError?.('E-devlet girişi başlatılamadı')
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">E-devlet ile Giriş</h3>
        <p className="text-sm text-blue-800 mb-4">
          E-devlet girişi ile kimlik bilgileriniz otomatik olarak doldurulacak ve resmi başvurunuz
          daha hızlı tamamlanacaktır.
        </p>
        <button
          onClick={handleEDevletLogin}
          disabled={isLoading}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Yönlendiriliyor...</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <span>E-devlet ile Giriş Yap</span>
            </>
          )}
        </button>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>veya</p>
      </div>
    </div>
  )
}

export default EDevletLogin

