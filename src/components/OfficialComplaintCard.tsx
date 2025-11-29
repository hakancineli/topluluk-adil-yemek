import { useState } from 'react'
import { OfficialComplaint, OfficialInstitution } from '../types'
import { officialComplaintService } from '../services/officialComplaintService'
import { useStore } from '../store/useStore'
import { useNotifications } from '../hooks/useNotifications'

interface OfficialComplaintCardProps {
  officialComplaint: OfficialComplaint
}

const OfficialComplaintCard = ({ officialComplaint }: OfficialComplaintCardProps) => {
  const { updateOfficialComplaintStatus } = useStore()
  const { showSuccess, showError } = useNotifications()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getInstitutionLabel = (institution: OfficialInstitution) => {
    const labels: Record<OfficialInstitution, string> = {
      [OfficialInstitution.REKABET_KURUMU]: 'Rekabet Kurumu',
      [OfficialInstitution.BTK_TUKETICI]: 'BTK Tüketici',
      [OfficialInstitution.TUKETICI_MAHKEMELERI]: 'Tüketici Mahkemeleri',
      [OfficialInstitution.BELEDIYE]: 'Belediye',
    }
    return labels[institution]
  }

  const getInstitutionIcon = (institution: OfficialInstitution) => {
    const icons: Record<OfficialInstitution, string> = {
      [OfficialInstitution.REKABET_KURUMU]: '⚖️',
      [OfficialInstitution.BTK_TUKETICI]: '📱',
      [OfficialInstitution.TUKETICI_MAHKEMELERI]: '🏛️',
      [OfficialInstitution.BELEDIYE]: '🏢',
    }
    return icons[institution]
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Bekliyor', className: 'bg-yellow-100 text-yellow-800' },
      submitted: { label: 'Gönderildi', className: 'bg-blue-100 text-blue-800' },
      in_review: { label: 'İnceleniyor', className: 'bg-purple-100 text-purple-800' },
      resolved: { label: 'Sonuçlandı', className: 'bg-green-100 text-green-800' },
      rejected: { label: 'Reddedildi', className: 'bg-red-100 text-red-800' },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.className}`}>
        {config.label}
      </span>
    )
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const handleRefreshStatus = async () => {
    setIsRefreshing(true)
    try {
      const result = await officialComplaintService.checkStatus(
        officialComplaint.officialComplaintId,
        officialComplaint.institution
      )
      updateOfficialComplaintStatus(officialComplaint.id, result.status)
      showSuccess('Durum güncellendi', 'Resmi şikayet durumu başarıyla güncellendi')
    } catch (error) {
      console.error('Durum güncellenirken hata:', error)
      showError('Hata', 'Durum güncellenirken bir hata oluştu.')
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{getInstitutionIcon(officialComplaint.institution)}</span>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {getInstitutionLabel(officialComplaint.institution)}
              </h3>
              <p className="text-sm text-gray-500">
                {officialComplaint.complaintData.title}
              </p>
            </div>
          </div>
        </div>
        {getStatusBadge(officialComplaint.status)}
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Resmi Şikayet Numarası:</span>
          <span className="font-mono font-semibold text-gray-900">
            {officialComplaint.officialComplaintId}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Platform:</span>
          <span className="font-medium text-gray-900">
            {officialComplaint.complaintData.platform}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Gönderim Tarihi:</span>
          <span className="text-gray-900">{formatDate(officialComplaint.submittedAt)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Son Güncelleme:</span>
          <span className="text-gray-900">{formatDate(officialComplaint.lastUpdated)}</span>
        </div>
      </div>

      <div className="pt-4 border-t">
        <button
          onClick={handleRefreshStatus}
          disabled={isRefreshing}
          className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isRefreshing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Güncelleniyor...</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Durumu Güncelle</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default OfficialComplaintCard

