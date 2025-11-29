import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Complaint } from '../types'
import { findSimilarComplaints } from '../utils/bulkComplaintUtils'

interface BulkComplaintBannerProps {
  complaint: Complaint
  allComplaints: Complaint[]
}

const BulkComplaintBanner = ({ complaint, allComplaints }: BulkComplaintBannerProps) => {
  const navigate = useNavigate()
  const [isDismissed, setIsDismissed] = useState(false)

  const similarComplaints = findSimilarComplaints(complaint, allComplaints, 3)

  if (similarComplaints.length === 0 || isDismissed) {
    return null
  }

  const handleViewBulk = () => {
    // Toplu şikayet sayfasına yönlendir (platform ve kategori filtresi ile)
    navigate('/toplu-sikayet', {
      state: {
        platform: complaint.platform,
        category: complaint.category,
      },
    })
  }

  return (
    <div className="bg-gradient-to-r from-primary-50 to-blue-50 border-l-4 border-primary-500 p-4 rounded-lg mb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">👥</span>
            <h4 className="font-semibold text-gray-900">
              Bu şikayete benzer {similarComplaints.length} şikayet daha var!
            </h4>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            Benzer şikayetleri birleştirerek toplu resmi şikayet oluşturabilirsiniz. Toplu şikayetler
            daha etkili sonuçlar verebilir.
          </p>
          <button
            onClick={handleViewBulk}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            Toplu Şikayet Oluştur
          </button>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-gray-400 hover:text-gray-600 ml-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default BulkComplaintBanner



