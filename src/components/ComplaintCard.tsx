import { useState } from 'react'
import { Complaint, ComplaintStatus } from '../types'
import { useStore } from '../store/useStore'
import { useNotifications } from '../hooks/useNotifications'
import OfficialComplaintButton from './OfficialComplaintButton'
import BulkComplaintBanner from './BulkComplaintBanner'

interface ComplaintCardProps {
  complaint: Complaint
  showAdminControls?: boolean
}

const ComplaintCard = ({ complaint, showAdminControls = true }: ComplaintCardProps) => {
  const { upvoteComplaint, updateComplaintStatus, complaints } = useStore()
  const { showSuccess, showError } = useNotifications()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpvote = async () => {
    try {
      await upvoteComplaint(complaint.id)
      showSuccess('Oy verildi', 'Şikayete başarıyla oy verdiniz')
    } catch (error) {
      showError('Hata', 'Oy verilirken bir hata oluştu')
    }
  }

  const handleStatusChange = async (newStatus: ComplaintStatus) => {
    setIsUpdating(true)
    try {
      await updateComplaintStatus(complaint.id, newStatus)
      const statusLabels: Record<ComplaintStatus, string> = {
        pending: 'Beklemede',
        reviewed: 'İncelendi',
        escalated: 'Üst Seviyeye Taşındı',
      }
      showSuccess('Durum güncellendi', `Şikayet durumu "${statusLabels[newStatus]}" olarak güncellendi`)
    } catch (error) {
      showError('Hata', 'Durum güncellenirken bir hata oluştu')
    } finally {
      setIsUpdating(false)
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'restaurant':
        return 'Restoran'
      case 'customer':
        return 'Müşteri'
      case 'courier':
        return 'Kurye'
      default:
        return category
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Beklemede', className: 'bg-yellow-100 text-yellow-800' },
      reviewed: { label: 'İncelendi', className: 'bg-blue-100 text-blue-800' },
      escalated: { label: 'Üst Seviyeye Taşındı', className: 'bg-green-100 text-green-800' },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    )
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <BulkComplaintBanner complaint={complaint} allComplaints={complaints} />
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{complaint.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{complaint.description}</p>
        </div>
        {getStatusBadge(complaint.status)}
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="font-medium mr-2">Platform:</span>
          <span className="bg-gray-100 px-2 py-1 rounded">{complaint.platform}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium mr-2">Kategori:</span>
          <span className="bg-gray-100 px-2 py-1 rounded">{getCategoryLabel(complaint.category)}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium mr-2">Tarih:</span>
          <span>{formatDate(complaint.createdAt)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <button
          onClick={handleUpvote}
          className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>Oy Ver</span>
          <span className="bg-primary-200 px-2 py-0.5 rounded-full text-sm">
            {complaint.upvotes}
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500">
            {complaint.upvotes} kişi bu şikayeti destekliyor
          </div>
          <OfficialComplaintButton
            complaintId={complaint.id}
            complaintData={complaint}
          />
        </div>
      </div>

      {/* Admin Kontrolleri - Durum Güncelleme */}
      {showAdminControls && (
        <div className="mt-4 pt-4 border-t">
          <label htmlFor={`status-${complaint.id}`} className="block text-sm font-medium text-gray-700 mb-2">
            Şikayet Durumunu Güncelle
          </label>
          <select
            id={`status-${complaint.id}`}
            value={complaint.status}
            onChange={(e) => handleStatusChange(e.target.value as ComplaintStatus)}
            disabled={isUpdating}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="pending">Beklemede</option>
            <option value="reviewed">İncelendi</option>
            <option value="escalated">Üst Seviyeye Taşındı</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Durum değişikliği resmi makamlara raporlama için kullanılır.
          </p>
        </div>
      )}
    </div>
  )
}

export default ComplaintCard

