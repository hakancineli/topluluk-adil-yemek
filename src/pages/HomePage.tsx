import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { complaintApi } from '../services/complaintApi'
import { Complaint, Platform } from '../types'

const HomePage = () => {
  // Store'dan sadece ihtiyaç duyulan verileri al - selector kullanarak gereksiz re-render'ları önle
  const storeComplaints = useStore((state) => state.complaints)
  const storePlatforms = useStore((state) => state.platforms)
  const [complaints, setComplaints] = useState<Complaint[]>(storeComplaints)
  const [platforms, setPlatforms] = useState(storePlatforms)
  
  // Şikayetleri API'den yükle ve store'u güncelle
  useEffect(() => {
    const loadComplaints = async () => {
      try {
        console.log('[HomePage] Şikayetler yükleniyor...')
        const apiComplaints = await complaintApi.getAll()
        console.log(`[HomePage] API'den ${apiComplaints.length} şikayet alındı`)
        
        if (apiComplaints.length > 0) {
          // En yeni şikayetleri önce göster
          const sortedComplaints = apiComplaints
            .filter(c => c.createdAt) // createdAt olmayanları filtrele
            .sort((a, b) => {
              // Güvenli Date karşılaştırması
              const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt)
              const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt)
              return dateB.getTime() - dateA.getTime()
            })
          
          setComplaints(sortedComplaints)
          
          // Platform listesini güncelle
          const platformMap = new Map<string, number>()
          apiComplaints.forEach((complaint) => {
            const count = platformMap.get(complaint.platform) || 0
            platformMap.set(complaint.platform, count + 1)
          })
          
          const updatedPlatforms: Platform[] = []
          let id = 1
          platformMap.forEach((totalComplaints, name) => {
            updatedPlatforms.push({
              id: id.toString(),
              name,
              logo: `https://via.placeholder.com/150x80?text=${encodeURIComponent(name)}`,
              totalComplaints,
            })
            id++
          })
          
          setPlatforms(updatedPlatforms)
          
          // Store'u da güncelle
          useStore.setState({ complaints: sortedComplaints, platforms: updatedPlatforms })
          console.log(`[HomePage] ${sortedComplaints.length} şikayet ve ${updatedPlatforms.length} platform güncellendi`)
        } else {
          console.warn('[HomePage] API\'den şikayet gelmedi, store\'daki veriler kullanılıyor')
        }
      } catch (error) {
        console.error('[HomePage] Şikayetler yüklenirken hata:', error)
      }
    }
    
    loadComplaints()
  }, [])
  
  // useMemo ile hesaplamaları cache'le - gereksiz re-render'ları önle
  const totalComplaints = useMemo(() => complaints.length, [complaints.length])
  const activePlatforms = useMemo(() => platforms.length, [platforms.length])
  const resolvedComplaints = useMemo(
    () => complaints.filter(c => c.status === 'reviewed' || c.status === 'escalated').length,
    [complaints]
  )
  
  // Son 5 şikayeti göster (en yeni önce) - useMemo ile cache'le
  const recentComplaints = useMemo(
    () => {
      if (complaints.length === 0) return []
      
      return [...complaints]
        .filter(c => c.createdAt) // createdAt olmayanları filtrele
        .sort((a, b) => {
          // Güvenli Date karşılaştırması
          const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt)
          const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt)
          return dateB.getTime() - dateA.getTime()
        })
        .slice(0, 5)
    },
    [complaints]
  )

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-2xl shadow-2xl">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-6 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            AdilYemek'e Hoş Geldiniz
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Yemek sipariş platformlarındaki sorunları birlikte çözelim
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/sikayet-olustur"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg shadow-lg hover:bg-primary-50 transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Şikayet Oluştur
            </Link>
            <Link
              to="/sikayetler"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg shadow-lg hover:bg-primary-400 transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Şikayetleri Görüntüle
            </Link>
          </div>
        </div>
      </div>
      
      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-primary-500">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-primary-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {totalComplaints.toLocaleString('tr-TR')}
          </h2>
          <p className="text-gray-600 font-medium">Toplam Şikayet</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {activePlatforms}
          </h2>
          <p className="text-gray-600 font-medium">Aktif Platform</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {resolvedComplaints}
          </h2>
          <p className="text-gray-600 font-medium">İncelenen/Üst Seviyeye Taşınan</p>
        </div>
      </div>

      {/* Son Şikayetler */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Son Şikayetler</h2>
          <Link
            to="/sikayetler"
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 transition-colors"
          >
            Tümünü Gör
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="space-y-4">
          {recentComplaints.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 text-lg">Henüz şikayet bulunmuyor.</p>
              <Link
                to="/sikayet-olustur"
                className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                İlk şikayeti oluşturun →
              </Link>
            </div>
          ) : (
            recentComplaints.map((complaint) => (
              <Link
                key={complaint.id}
                to="/sikayetler"
                className="block border-l-4 border-primary-500 bg-gray-50 hover:bg-gray-100 pl-6 pr-4 py-4 rounded-r-lg transition-all duration-200 hover:shadow-md group"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                      {complaint.title || 'Başlıksız Şikayet'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {complaint.description ? `${complaint.description.substring(0, 120)}...` : 'Açıklama yok'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {complaint.platform}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {complaint.category === 'restaurant' ? 'Restoran' : complaint.category === 'customer' ? 'Müşteri' : 'Kurye'}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        {complaint.upvotes} oy
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    complaint.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {complaint.status === 'pending' ? 'Beklemede' :
                     complaint.status === 'reviewed' ? 'İncelendi' : 'Üst Seviyeye Taşındı'}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Amaçlarımız ve Özellikler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Amaçlarımız</h2>
          </div>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary-600 mt-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="flex-1">Restoran sahiplerinin, müşterilerin ve kuryelerin sesini duyurmak</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-600 mt-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="flex-1">Şikayetleri organize etmek ve resmi makamlara iletmek</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-600 mt-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="flex-1">Adil ve şeffaf bir yemek sipariş ekosistemi oluşturmak</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-xl shadow-lg border border-primary-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary-600 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Hızlı Erişim</h2>
          </div>
          <div className="space-y-3">
            <Link
              to="/sikayet-olustur"
              className="block bg-white p-4 rounded-lg hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-100 p-2 rounded group-hover:bg-primary-200 transition-colors">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Şikayet Oluştur</span>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
            <Link
              to="/sikayetler"
              className="block bg-white p-4 rounded-lg hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-100 p-2 rounded group-hover:bg-primary-200 transition-colors">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Tüm Şikayetler</span>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
            <Link
              to="/platformlar"
              className="block bg-white p-4 rounded-lg hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-100 p-2 rounded group-hover:bg-primary-200 transition-colors">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Platformlar</span>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

