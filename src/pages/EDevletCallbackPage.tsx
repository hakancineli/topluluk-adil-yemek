import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { handleEDevletCallback, getEDevletUserInfo } from '../services/realOfficialComplaintService'

const EDevletCallbackPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const savedState = localStorage.getItem('edevlet_state')

    if (!code || !state || state !== savedState) {
      setStatus('error')
      setError('E-devlet girişi doğrulanamadı')
      return
    }

    const processCallback = async () => {
      try {
        // Code'u token'a çevir
        const token = await handleEDevletCallback(code, state)
        
        // Kullanıcı bilgilerini al
        const userInfo = await getEDevletUserInfo(token)
        
        // Kullanıcı bilgilerini localStorage'a kaydet
        localStorage.setItem('edevlet_user_info', JSON.stringify(userInfo))
        localStorage.setItem('edevlet_token', token)
        
        // State'i temizle
        localStorage.removeItem('edevlet_state')
        
        setStatus('success')
        
        // 2 saniye sonra ana sayfaya yönlendir
        setTimeout(() => {
          const redirectUri = localStorage.getItem('edevlet_redirect_uri')
          if (redirectUri) {
            window.location.href = redirectUri
          } else {
            navigate('/')
          }
        }, 2000)
      } catch (err) {
        console.error('E-devlet callback işleme hatası:', err)
        setStatus('error')
        setError('E-devlet girişi tamamlanamadı')
      }
    }

    processCallback()
  }, [searchParams, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">E-devlet Girişi İşleniyor</h2>
            <p className="text-gray-600">Lütfen bekleyin...</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Giriş Başarılı!</h2>
            <p className="text-gray-600">Yönlendiriliyorsunuz...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Hata Oluştu</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Ana Sayfaya Dön
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default EDevletCallbackPage

