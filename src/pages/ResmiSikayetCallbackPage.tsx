import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { redirectToOfficialInstitution, handleEDevletCallback, getEDevletUserInfo } from '../services/realOfficialComplaintService'
import { OfficialInstitution } from '../types'
import { useStore } from '../store/useStore'

const ResmiSikayetCallbackPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { complaints } = useStore()
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const institution = searchParams.get('institution') as OfficialInstitution
    const complaintId = searchParams.get('complaintId')
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (!institution || !complaintId) {
      setStatus('error')
      setError('Eksik parametreler')
      return
    }

    const processCallback = async () => {
      try {
        setStatus('redirecting')

        // Şikayeti bul
        const complaint = complaints.find((c) => c.id === complaintId)
        if (!complaint) {
          setStatus('error')
          setError('Şikayet bulunamadı')
          return
        }

        // E-devlet token'ı al (varsa)
        let eDevletToken: string | undefined

        if (code && state) {
          try {
            const token = await handleEDevletCallback(code, state)
            eDevletToken = token

            // Kullanıcı bilgilerini al ve kaydet
            const userInfo = await getEDevletUserInfo(token)
            localStorage.setItem('edevlet_user_info', JSON.stringify(userInfo))
            localStorage.setItem('edevlet_token', token)
          } catch (err) {
            console.warn('E-devlet token alınamadı, devam ediliyor:', err)
            // Token alınamazsa da devam et
          }
        }

        // Resmi kurum sayfasına yönlendir
        const targetUrl = redirectToOfficialInstitution(complaint, institution, eDevletToken)

        // Başarı mesajı göster
        setTimeout(() => {
          // Yönlendirme zaten yapıldı, bu sayfa sadece loading gösteriyor
        }, 1000)
      } catch (err) {
        console.error('Callback işleme hatası:', err)
        setStatus('error')
        setError('Yönlendirme yapılamadı')
      }
    }

    processCallback()
  }, [searchParams, complaints])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">İşleniyor</h2>
            <p className="text-gray-600">Lütfen bekleyin...</p>
          </>
        )}

        {status === 'redirecting' && (
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
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Yönlendiriliyorsunuz</h2>
            <p className="text-gray-600 mb-4">
              Resmi kurum sayfasına yönlendiriliyorsunuz. Yeni pencerede form açılacaktır.
            </p>
            <p className="text-sm text-gray-500">
              Eğer yeni pencere açılmadıysa, pop-up engelleyicinizi kontrol edin.
            </p>
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
              onClick={() => navigate('/sikayetler')}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Şikayetlere Dön
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ResmiSikayetCallbackPage

