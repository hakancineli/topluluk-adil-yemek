import toast from 'react-hot-toast'
import { useNotificationStore } from '../store/notificationStore'

/**
 * Bildirim hook'u
 * Toast bildirimleri ve notification store yönetimi
 */
export const useNotifications = () => {
  const { addNotification } = useNotificationStore()

  return {
    showSuccess: (title: string, message?: string) => {
      toast.success(message || title)
      addNotification({ type: 'success', title, message })
    },
    showError: (title: string, message?: string) => {
      toast.error(message || title)
      addNotification({ type: 'error', title, message })
    },
    showInfo: (title: string, message?: string) => {
      toast(message || title, { icon: 'ℹ️' })
      addNotification({ type: 'info', title, message })
    },
    showWarning: (title: string, message?: string) => {
      toast(message || title, { icon: '⚠️' })
      addNotification({ type: 'warning', title, message })
    },
  }
}
