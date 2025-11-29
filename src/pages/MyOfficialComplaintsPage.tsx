import { useStore } from '../store/useStore'
import { useNotifications } from '../hooks/useNotifications'
import OfficialComplaintCard from '../components/OfficialComplaintCard'
import { OfficialComplaintStatus } from '../types'

const MyOfficialComplaintsPage = () => {
  const { officialComplaints } = useStore()

  // İstatistikler
  const totalComplaints = officialComplaints.length
  const statusCounts = officialComplaints.reduce(
    (acc, complaint) => {
      acc[complaint.status] = (acc[complaint.status] || 0) + 1
      return acc
    },
    {} as Record<OfficialComplaintStatus, number>
  )

  // Sıralama: En yeni önce
  const sortedComplaints = [...officialComplaints].sort(
    (a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Resmi Şikayetlerim</h1>
        <p className="text-gray-600">
          Resmi kurumlara gönderdiğiniz şikayetleri buradan takip edebilirsiniz.
        </p>
      </div>

      {/* İstatistikler */}
      {totalComplaints > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {totalComplaints}
            </div>
            <div className="text-sm text-gray-600">Toplam</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {statusCounts.pending || 0}
            </div>
            <div className="text-sm text-gray-600">Bekliyor</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {statusCounts.submitted || 0}
            </div>
            <div className="text-sm text-gray-600">Gönderildi</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {statusCounts.in_review || 0}
            </div>
            <div className="text-sm text-gray-600">İnceleniyor</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {(statusCounts.resolved || 0) + (statusCounts.rejected || 0)}
            </div>
            <div className="text-sm text-gray-600">Sonuçlanan</div>
          </div>
        </div>
      )}

      {/* Şikayet Listesi */}
      {totalComplaints === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-md text-center">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Henüz resmi şikayetiniz yok
          </h3>
          <p className="text-gray-600 mb-6">
            Resmi kurumlara şikayet göndermek için şikayetler sayfasından bir şikayet seçip "Resmi
            Şikayet Oluştur" butonuna tıklayın.
          </p>
          <a
            href="/sikayetler"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Şikayetlere Git
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedComplaints.map((complaint) => (
            <OfficialComplaintCard key={complaint.id} officialComplaint={complaint} />
          ))}
        </div>
      )}

      {/* Bilgilendirme */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Bilgilendirme</h3>
        <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
          <li>
            Resmi şikayetlerinizin durumunu "Durumu Güncelle" butonuna tıklayarak güncelleyebilirsiniz.
          </li>
          <li>
            Şikayet numaralarınızı not alın, resmi kurumlarla iletişimde bu numaraları kullanabilirsiniz.
          </li>
          <li>
            Durum güncellemeleri genellikle birkaç gün içinde yansır.
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MyOfficialComplaintsPage

