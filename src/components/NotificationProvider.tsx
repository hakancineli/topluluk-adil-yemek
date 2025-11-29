import { useEffect } from 'react'
import { useNotifications } from '../hooks/useNotifications'

/**
 * Notification Provider Component
 * Bildirim sistemini başlatır ve olayları dinler
 */
const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  useNotifications() // Bildirim hook'unu aktif et

  return <>{children}</>
}

export default NotificationProvider

