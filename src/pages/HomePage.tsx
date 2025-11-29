import { useStore } from '../store/useStore'

const HomePage = () => {
  const { complaints, platforms } = useStore()
  
  const totalComplaints = complaints.length
  const activePlatforms = platforms.length
  const resolvedComplaints = complaints.filter(c => c.status === 'reviewed' || c.status === 'escalated').length
  
  // Son 5 şikayeti göster
  const recentComplaints = complaints
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5)

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

