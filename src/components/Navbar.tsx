import { Link, useLocation } from 'react-router-dom'
import { useMemo, memo, useCallback, useState } from 'react'
import { useAuthStore } from '../store/authStore'

const Navbar = memo(() => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
    { path: '/iletisim', label: 'İletişim' },
  ], [])

  // Filtered navLinks'i memoize et
  const visibleNavLinks = useMemo(
    () => navLinks.filter((link) => !link.protected || isAuthenticated),
    [navLinks, isAuthenticated]
  )

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <span className="text-xl md:text-2xl font-bold text-primary-600">AdilYemek</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex space-x-2">
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
                {user?.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="px-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    Admin Paneli
                  </Link>
                )}
                <span className="text-sm text-gray-700 hidden xl:inline">{user?.name}</span>
                <button
                  onClick={handleLogout}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {visibleNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-base font-medium text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                    >
                      Admin Paneli
                    </Link>
                  )}
                  <div className="px-4 py-2 text-sm text-gray-600">
                    {user?.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Çıkış Yap
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/giris"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    to="/kayit"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-base font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors text-center"
                  >
                    Kayıt Ol
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
})

Navbar.displayName = 'Navbar'

export default Navbar

