import { useEffect, useState, useMemo } from 'react'
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
          const sortedComplaints = apiComplaints.sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
          )
          
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
    () => [...complaints]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5),
    [complaints]
  )

  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AdilYemek'e Hoş Geldiniz
        </h1>
        <p className="text-xl text-gray-600">
          Yemek sipariş platformlarındaki sorunları birlikte çözelim
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-primary-600 mb-2">
            {totalComplaints.toLocaleString('tr-TR')}
          </h2>
          <p className="text-gray-600">Toplam Şikayet</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-primary-600 mb-2">
            {activePlatforms}
          </h2>
          <p className="text-gray-600">Aktif Platform</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-primary-600 mb-2">
            {resolvedComplaints}
          </h2>
          <p className="text-gray-600">İncelenen/Üst Seviyeye Taşınan</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Son Şikayetler</h2>
        <div className="space-y-4">
          {recentComplaints.map((complaint) => (
            <div key={complaint.id} className="border-l-4 border-primary-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{complaint.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{complaint.description.substring(0, 100)}...</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>{complaint.platform}</span>
                    <span>•</span>
                    <span>{complaint.category === 'restaurant' ? 'Restoran' : complaint.category === 'customer' ? 'Müşteri' : 'Kurye'}</span>
                    <span>•</span>
                    <span>{complaint.upvotes} oy</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  complaint.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {complaint.status === 'pending' ? 'Beklemede' :
                   complaint.status === 'reviewed' ? 'İncelendi' : 'Üst Seviyeye Taşındı'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow mt-8">
        <h2 className="text-2xl font-bold mb-4">Amaçlarımız</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">✓</span>
            <span>Restoran sahiplerinin, müşterilerin ve kuryelerin sesini duyurmak</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">✓</span>
            <span>Şikayetleri organize etmek ve resmi makamlara iletmek</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">✓</span>
            <span>Adil ve şeffaf bir yemek sipariş ekosistemi oluşturmak</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HomePage

