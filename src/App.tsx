import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import NotificationProvider from './components/NotificationProvider'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminLoginPage from './pages/AdminLoginPage'

// Lazy load sayfalar - code splitting için
const ComplaintsPage = lazy(() => import('./pages/ComplaintsPage'))
const CreateComplaintPage = lazy(() => import('./pages/CreateComplaintPage'))
const PlatformsPage = lazy(() => import('./pages/PlatformsPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const MyOfficialComplaintsPage = lazy(() => import('./pages/MyOfficialComplaintsPage'))
const BulkComplaintPage = lazy(() => import('./pages/BulkComplaintPage'))
const EDevletCallbackPage = lazy(() => import('./pages/EDevletCallbackPage'))
const ResmiSikayetCallbackPage = lazy(() => import('./pages/ResmiSikayetCallbackPage'))
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'))
const AdminComplaintsPage = lazy(() => import('./pages/AdminComplaintsPage'))
const AdminUsersPage = lazy(() => import('./pages/AdminUsersPage'))
const AdminPlatformsPage = lazy(() => import('./pages/AdminPlatformsPage'))

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
)

function App() {
  return (
    <Router>
      <NotificationProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/giris" element={<LoginPage />} />
                <Route path="/kayit" element={<RegisterPage />} />
                <Route path="/sikayetler" element={<ComplaintsPage />} />
                <Route path="/sikayet-olustur" element={<CreateComplaintPage />} />
                <Route path="/platformlar" element={<PlatformsPage />} />
                <Route path="/hakkimizda" element={<AboutPage />} />
                <Route
                  path="/resmi-sikayetlerim"
                  element={
                    <ProtectedRoute>
                      <MyOfficialComplaintsPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/toplu-sikayet" element={<BulkComplaintPage />} />
                <Route path="/edevlet-callback" element={<EDevletCallbackPage />} />
                <Route path="/resmi-sikayet-callback" element={<ResmiSikayetCallbackPage />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminProtectedRoute>
                      <AdminDashboardPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/complaints"
                  element={
                    <AdminProtectedRoute>
                      <AdminComplaintsPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <AdminProtectedRoute>
                      <AdminUsersPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/platforms"
                  element={
                    <AdminProtectedRoute>
                      <AdminPlatformsPage />
                    </AdminProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
          </main>
        </div>
      </NotificationProvider>
      <Analytics />
    </Router>
  )
}

export default App

