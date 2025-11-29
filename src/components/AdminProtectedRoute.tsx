import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

interface AdminProtectedRouteProps {
  children: React.ReactNode
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default AdminProtectedRoute

