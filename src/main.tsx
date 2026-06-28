import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import './i18n' // Add i18n initialization
import i18n from './i18n'
import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'

// Lazy-loaded pages for code splitting
const StandardFIRE = lazy(() => import('./pages/StandardFIRE'))
const CoastFIRE = lazy(() => import('./pages/CoastFIRE'))
const LeanFIRE = lazy(() => import('./pages/LeanFIRE'))
const FatFIRE = lazy(() => import('./pages/FatFIRE'))
const BaristaFIRE = lazy(() => import('./pages/BaristaFIRE'))
const WithdrawalRate = lazy(() => import('./pages/WithdrawalRate'))
const SavingsRate = lazy(() => import('./pages/SavingsRate'))
const ReverseFIRE = lazy(() => import('./pages/ReverseFIRE'))
const HealthcareGap = lazy(() => import('./pages/HealthcareGap'))
const Books = lazy(() => import('./pages/Books'))
const Apps = lazy(() => import('./pages/Apps'))
const FIREQuiz = lazy(() => import('./pages/FIREQuiz'))
const DebtPayoff = lazy(() => import('./pages/DebtPayoff'))
const Privacy = lazy(() => import('./pages/Privacy'))
const About = lazy(() => import('./pages/About'))
const Terms = lazy(() => import('./pages/Terms'))

// Loading fallback for lazy-loaded pages
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-pulse text-2xl">🔥</div>
    </div>
  )
}

function LazyPage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}
import './index.css'

// Dynamic SEO meta tags based on language
function updateSEO() {
  const lang = i18n.language || 'en'
  document.documentElement.lang = lang
  
  // Update meta locale
  const ogLocale = document.querySelector('meta[property="og:locale"]')
  if (ogLocale) {
    const localeMap: Record<string, string> = {
      en: 'en_US', zh: 'zh_CN', es: 'es_ES', ja: 'ja_JP',
      de: 'de_DE', fr: 'fr_FR', ru: 'ru_RU', pt: 'pt_BR', id: 'id_ID', ar: 'ar_SA'
    }
    ogLocale.setAttribute('content', localeMap[lang] || 'en_US')
  }
}

// Update SEO on initial load
updateSEO()

// Update SEO when language changes
i18n.on('languageChanged', updateSEO)

const basename = import.meta.env.BASE_URL

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'standard', element: <LazyPage><StandardFIRE /></LazyPage> },
      { path: 'coast', element: <LazyPage><CoastFIRE /></LazyPage> },
      { path: 'lean', element: <LazyPage><LeanFIRE /></LazyPage> },
      { path: 'fat', element: <LazyPage><FatFIRE /></LazyPage> },
      { path: 'barista', element: <LazyPage><BaristaFIRE /></LazyPage> },
      { path: 'withdrawal', element: <LazyPage><WithdrawalRate /></LazyPage> },
      { path: 'savings-rate', element: <LazyPage><SavingsRate /></LazyPage> },
      { path: 'debt-payoff', element: <LazyPage><DebtPayoff /></LazyPage> },
      { path: 'reverse', element: <LazyPage><ReverseFIRE /></LazyPage> },
      { path: 'healthcare', element: <LazyPage><HealthcareGap /></LazyPage> },
      { path: 'books', element: <LazyPage><Books /></LazyPage> },
      { path: 'apps', element: <LazyPage><Apps /></LazyPage> },
      { path: 'quiz', element: <LazyPage><FIREQuiz /></LazyPage> },
      { path: 'privacy', element: <LazyPage><Privacy /></LazyPage> },
      { path: 'about', element: <LazyPage><About /></LazyPage> },
      { path: 'terms', element: <LazyPage><Terms /></LazyPage> },
    ],
  },
], { basename })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
