import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import NotificationProvider from './components/NotificationProvider'
import HomePage from './pages/HomePage'
import ComplaintsPage from './pages/ComplaintsPage'
import CreateComplaintPage from './pages/CreateComplaintPage'
import PlatformsPage from './pages/PlatformsPage'
import AboutPage from './pages/AboutPage'
import MyOfficialComplaintsPage from './pages/MyOfficialComplaintsPage'
import BulkComplaintPage from './pages/BulkComplaintPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import EDevletCallbackPage from './pages/EDevletCallbackPage'
import ResmiSikayetCallbackPage from './pages/ResmiSikayetCallbackPage'

function App() {
  return (
    <Router>
      <NotificationProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
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
            </Routes>
          </main>
        </div>
      </NotificationProvider>
    </Router>
  )
}

export default App

