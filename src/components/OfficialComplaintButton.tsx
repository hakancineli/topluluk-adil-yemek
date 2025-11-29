import { useState } from 'react'
import { Complaint, OfficialInstitution } from '../types'
import { officialComplaintService } from '../services/officialComplaintService'
import { useStore } from '../store/useStore'
import OfficialComplaintModal from './OfficialComplaintModal'

interface OfficialComplaintButtonProps {
  complaintId: string
  complaintData: Complaint
  className?: string
}

const OfficialComplaintButton = ({
  complaintId,
  complaintData,
  className = '',
}: OfficialComplaintButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center gap-2 ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          />
        </svg>
        <span>Resmi Şikayet Oluştur</span>
      </button>

      {isModalOpen && (
        <OfficialComplaintModal
          complaint={complaintData}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

export default OfficialComplaintButton

