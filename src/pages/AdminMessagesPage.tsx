import { useEffect, useState, useMemo } from 'react'
import { contactService } from '../services/contactService'
import { ContactMessage } from '../types'
import { useNotifications } from '../hooks/useNotifications'
import { FaEnvelope, FaEnvelopeOpen, FaTrashAlt, FaSearch, FaHourglassHalf } from 'react-icons/fa'

const AdminMessagesPage = () => {
  const { showSuccess, showError } = useNotifications()

  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRead, setFilterRead] = useState<'all' | 'read' | 'unread'>('all')
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [markingAsRead, setMarkingAsRead] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setLoading(true)
    setError(null)
    try {
      const fetchedMessages = await contactService.getAllMessages()
      setMessages(fetchedMessages)
    } catch (err) {
      setError('Mesajlar yüklenirken bir hata oluştu.')
      console.error('Failed to fetch messages:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const matchesSearch =
        searchTerm === '' ||
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesFilter =
        filterRead === 'all' ||
        (filterRead === 'read' && message.read) ||
        (filterRead === 'unread' && !message.read)

      return matchesSearch && matchesFilter
    }).sort((a, b) => {
      // Okunmamış mesajlar önce, sonra tarihe göre
      if (a.read !== b.read) {
        return a.read ? 1 : -1
      }
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt)
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt)
      return dateB.getTime() - dateA.getTime()
    })
  }, [messages, searchTerm, filterRead])

  const handleMarkAsRead = async (id: string) => {
    setMarkingAsRead(id)
    try {
      await contactService.markAsRead(id)
      await fetchMessages()
      showSuccess('Mesaj Okundu', 'Mesaj okundu olarak işaretlendi.')
      if (selectedMessage?.id === id) {
        const updated = await contactService.getMessageById(id)
        if (updated) setSelectedMessage(updated)
      }
    } catch (err) {
      showError('Hata', 'Mesaj güncellenirken bir hata oluştu.')
      console.error('Failed to mark as read:', err)
    } finally {
      setMarkingAsRead(null)
    }
  }

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Bu mesajı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      return
    }
    setDeletingId(id)
    try {
      await contactService.deleteMessage(id)
      await fetchMessages()
      if (selectedMessage?.id === id) {
        setSelectedMessage(null)
      }
      showSuccess('Mesaj Silindi', 'Mesaj başarıyla silindi.')
    } catch (err) {
      showError('Hata', 'Mesaj silinirken bir hata oluştu.')
      console.error('Failed to delete message:', err)
    } finally {
      setDeletingId(null)
    }
  }

  const unreadCount = useMemo(() => messages.filter(m => !m.read).length, [messages])
  const totalCount = useMemo(() => messages.length, [messages])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-10">
        <p>{error}</p>
        <button onClick={fetchMessages} className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md">
          Tekrar Dene
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Gelen Mesajlar</h1>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Toplam Mesaj</p>
              <h2 className="text-3xl font-bold text-gray-900">{totalCount}</h2>
            </div>
            <FaEnvelope className="text-primary-400 text-4xl" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Okunmamış Mesaj</p>
              <h2 className="text-3xl font-bold text-gray-900">{unreadCount}</h2>
            </div>
            <FaEnvelopeOpen className="text-yellow-400 text-4xl" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mesaj Listesi */}
        <div className="lg:col-span-1">
          {/* Filtreler */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md text-sm"
                  placeholder="Ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <select
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                value={filterRead}
                onChange={(e) => setFilterRead(e.target.value as 'all' | 'read' | 'unread')}
              >
                <option value="all">Tümü</option>
                <option value="unread">Okunmamış</option>
                <option value="read">Okunmuş</option>
              </select>
            </div>
          </div>

          {/* Mesaj Listesi */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto">
              {filteredMessages.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>Mesaj bulunamadı</p>
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => {
                      setSelectedMessage(message)
                      if (!message.read) {
                        handleMarkAsRead(message.id)
                      }
                    }}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                      !message.read ? 'bg-primary-50 border-l-4 border-l-primary-500' : ''
                    } ${selectedMessage?.id === message.id ? 'bg-primary-100' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{message.name}</h3>
                      {!message.read && (
                        <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-1 line-clamp-1">{message.subject}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Mesaj Detayı */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{selectedMessage.name}</span>
                    <span>•</span>
                    <a href={`mailto:${selectedMessage.email}`} className="text-primary-600 hover:text-primary-700">
                      {selectedMessage.email}
                    </a>
                    <span>•</span>
                    <span>
                      {new Date(selectedMessage.createdAt).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!selectedMessage.read && (
                    <button
                      onClick={() => handleMarkAsRead(selectedMessage.id)}
                      disabled={markingAsRead === selectedMessage.id}
                      className="px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm disabled:opacity-50"
                    >
                      {markingAsRead === selectedMessage.id ? (
                        <FaHourglassHalf className="animate-spin" />
                      ) : (
                        'Okundu İşaretle'
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                    disabled={deletingId === selectedMessage.id}
                    className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm disabled:opacity-50"
                  >
                    {deletingId === selectedMessage.id ? (
                      <FaHourglassHalf className="animate-spin" />
                    ) : (
                      <FaTrashAlt />
                    )}
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-lg shadow-md text-center">
              <FaEnvelope className="text-gray-300 text-6xl mx-auto mb-4" />
              <p className="text-gray-500">Bir mesaj seçin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminMessagesPage

