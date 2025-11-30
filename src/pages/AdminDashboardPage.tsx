import { useMemo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { useAuthStore } from '../store/authStore'
import { contactService } from '../services/contactService'
import { FaEnvelope } from 'react-icons/fa'

const AdminDashboardPage = () => {
  const { complaints, platforms } = useStore()
  const { user } = useAuthStore()
  const [unreadMessages, setUnreadMessages] = useState(0)

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const messages = await contactService.getAllMessages()
        setUnreadMessages(messages.filter(m => !m.read).length)
      } catch (error) {
        console.error('Failed to fetch messages:', error)
      }
    }
    fetchUnreadCount()
  }, [])

  const stats = useMemo(() => {
    const totalComplaints = complaints.length
    const pendingComplaints = complaints.filter(c => c.status === 'pending').length
    const reviewedComplaints = complaints.filter(c => c.status === 'reviewed').length
    const escalatedComplaints = complaints.filter(c => c.status === 'escalated').length
    const totalPlatforms = platforms.length

    return {
      totalComplaints,
      pendingComplaints,
      reviewedComplaints,
      escalatedComplaints,
      totalPlatforms,
    }
  }, [complaints, platforms])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Paneli</h1>
          <p className="text-gray-600 mt-1">Hoş geldiniz, {user?.name}</p>
        </div>
        <Link
          to="/admin/complaints"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Şikayetleri Yönet
        </Link>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Toplam Şikayet</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalComplaints.toLocaleString('tr-TR')}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Bekleyen Şikayetler</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {stats.pendingComplaints}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">İncelenen Şikayetler</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {stats.reviewedComplaints}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Üst Seviyeye Taşınan</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {stats.escalatedComplaints}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Hızlı Erişim */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Hızlı Erişim</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/complaints"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900">Şikayet Yönetimi</h3>
            <p className="text-sm text-gray-600 mt-1">Şikayetleri görüntüle, onayla veya reddet</p>
          </Link>
          <Link
            to="/admin/platforms"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900">Platform Yönetimi</h3>
            <p className="text-sm text-gray-600 mt-1">Platformları görüntüle ve düzenle</p>
          </Link>
          <Link
            to="/admin/users"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900">Kullanıcı Yönetimi</h3>
            <p className="text-sm text-gray-600 mt-1">Kullanıcıları görüntüle ve yönet</p>
          </Link>
          <Link
            to="/admin/messages"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors relative"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-900">Gelen Mesajlar</h3>
              {unreadMessages > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">Kullanıcı mesajlarını görüntüle ve yönet</p>
          </Link>
        </div>
      </div>

      {/* Son Aktiviteler */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Son Şikayetler</h2>
        <div className="space-y-3">
          {complaints
            .sort((a, b) => {
              const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt)
              const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt)
              return dateB.getTime() - dateA.getTime()
            })
            .slice(0, 5)
            .map((complaint) => (
              <div key={complaint.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{complaint.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {complaint.platform} • {complaint.category === 'restaurant' ? 'Restoran' : complaint.category === 'customer' ? 'Müşteri' : 'Kurye'}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  complaint.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {complaint.status === 'pending' ? 'Beklemede' :
                   complaint.status === 'reviewed' ? 'İncelendi' : 'Üst Seviyeye Taşındı'}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage

