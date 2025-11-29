import { Link, useLocation } from 'react-router-dom'
import { useMemo, memo, useCallback } from 'react'
import { useAuthStore } from '../store/authStore'

const Navbar = memo(() => {
  const location = useLocation()
  // Store'dan sadece ihtiyaç duyulan değerleri al - selector kullanarak
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname])

  const navLinks = useMemo(() => [
    { path: '/', label: 'Ana Sayfa' },
    { path: '/sikayetler', label: 'Şikayetler' },
    { path: '/sikayet-olustur', label: 'Şikayet Oluştur' },
    { path: '/platformlar', label: 'Platformlar' },
    { path: '/resmi-sikayetlerim', label: 'Resmi Şikayetlerim', protected: true },
    { path: '/hakkimizda', label: 'Hakkımızda' },
  ], [])

  // Filtered navLinks'i memoize et
  const visibleNavLinks = useMemo(
    () => navLinks.filter((link) => !link.protected || isAuthenticated),
    [navLinks, isAuthenticated]
  )

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">AdilYemek</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-4">
              {visibleNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
            </div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3 border-l pl-4">
                <span className="text-sm text-gray-700">{user?.name}</span>
                <button
                  onClick={logout}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Çıkış Yap
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 border-l pl-4">
                <Link
                  to="/giris"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/kayit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
})

Navbar.displayName = 'Navbar'

export default Navbar

