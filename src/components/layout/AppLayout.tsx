import { Outlet, Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useState, useEffect } from 'react'
import UpdatePrompt from '../UpdatePrompt'
import { useTranslation } from 'react-i18next'

export default function AppLayout() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed')
    return saved === 'true'
  })

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(sidebarCollapsed))
  }, [sidebarCollapsed])

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <>
      <UpdatePrompt />
      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center gap-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 h-16">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
            aria-controls="sidebar-navigation"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">FIRE Calculator</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <Link 
                  to="/privacy" 
                  className="hover:text-fire-600 dark:hover:text-fire-400 transition-colors"
                >
                  {t('footer.privacy')}
                </Link>
                <span className="text-gray-300 dark:text-gray-700">|</span>
                <Link 
                  to="/terms" 
                  className="hover:text-fire-600 dark:hover:text-fire-400 transition-colors"
                >
                  {t('footer.terms')}
                </Link>
                <span className="text-gray-300 dark:text-gray-700">|</span>
                <Link 
                  to="/about" 
                  className="hover:text-fire-600 dark:hover:text-fire-400 transition-colors"
                >
                  {t('footer.about')}
                </Link>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                © {new Date().getFullYear()} FIRE Calculator. 100% Private.
              </p>
            </div>
          </div>
        </footer>
      </div>
      </div>
    </>
  )
}
