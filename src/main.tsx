import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import './i18n' // Add i18n initialization
import i18n from './i18n'
import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'
import StandardFIRE from './pages/StandardFIRE'
import CoastFIRE from './pages/CoastFIRE'
import LeanFIRE from './pages/LeanFIRE'
import FatFIRE from './pages/FatFIRE'
import BaristaFIRE from './pages/BaristaFIRE'
import WithdrawalRate from './pages/WithdrawalRate'
import SavingsRate from './pages/SavingsRate'
import ReverseFIRE from './pages/ReverseFIRE'
import HealthcareGap from './pages/HealthcareGap'
import Books from './pages/Books'
import Apps from './pages/Apps'
import FIREQuiz from './pages/FIREQuiz'
import DebtPayoff from './pages/DebtPayoff'
import Privacy from './pages/Privacy'
import About from './pages/About'
import Terms from './pages/Terms'
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
      { path: 'standard', element: <StandardFIRE /> },
      { path: 'coast', element: <CoastFIRE /> },
      { path: 'lean', element: <LeanFIRE /> },
      { path: 'fat', element: <FatFIRE /> },
      { path: 'barista', element: <BaristaFIRE /> },
      { path: 'withdrawal', element: <WithdrawalRate /> },
      { path: 'savings-rate', element: <SavingsRate /> },
      { path: 'debt-payoff', element: <DebtPayoff /> },
      { path: 'reverse', element: <ReverseFIRE /> },
      { path: 'healthcare', element: <HealthcareGap /> },
      { path: 'books', element: <Books /> },
      { path: 'apps', element: <Apps /> },
      { path: 'quiz', element: <FIREQuiz /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'about', element: <About /> },
      { path: 'terms', element: <Terms /> },
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
