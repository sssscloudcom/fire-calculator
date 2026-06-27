import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'

export default function Privacy() {
  const { t } = useTranslation()
  return (
    <>
      <SEO
        title="{t('legal.privacy.title')} - FIRE Calculator | 100% Private & No Data Collection"
        description="FIRE Calculator privacy policy: 100% browser-side calculations, no data collection, no tracking, no analytics. Your financial data never leaves your device. Learn how we protect your privacy."
        keywords="FIRE calculator privacy, financial calculator privacy, no tracking, offline calculator, privacy-first, no data collection"
        canonicalPath="/privacy"
      />
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            🔒 {t('legal.privacy.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('legal.privacy.lastUpdated')}
          </p>
        </header>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          {/* Summary */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <span>✅</span> {t('legal.privacy.summary.title')}
            </h2>
            <ul className="space-y-2 text-green-800 dark:text-green-200">
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                <span><strong>{t('legal.privacy.summary.points.browserSide')}</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                <span><strong>{t('legal.privacy.summary.points.noCollection')}</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                <span><strong>{t('legal.privacy.summary.points.noAccounts')}</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                <span><strong>{t('legal.privacy.summary.points.noTracking')}</strong></span>
              </li>
            </ul>
          </div>

          {/* Section 1: {t('legal.privacy.collectTitle')} */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              1. {t('legal.privacy.sections.infoCollect.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>{t('legal.privacy.sections.infoCollect.intro')}</strong>
            </p>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('legal.privacy.sections.infoCollect.dontCollect')}</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>{t('legal.privacy.sections.infoCollect.items.names')}</li>
                <li>{t('legal.privacy.sections.infoCollect.items.financial')}</li>
                <li>{t('legal.privacy.sections.infoCollect.items.ip')}</li>
                <li>{t('legal.privacy.sections.infoCollect.items.browsing')}</li>
                <li>{t('legal.privacy.sections.infoCollect.items.cookies')}</li>
              </ul>
            </div>
          </section>

          {/* Section 2: How Calculations Work */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              2. {t('legal.privacy.sections.howCalculations.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.privacy.sections.howCalculations.intro')}
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">{t('legal.privacy.sections.howCalculations.steps.browserSide.title')}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{t('legal.privacy.sections.howCalculations.steps.browserSide.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">{t('legal.privacy.sections.howCalculations.steps.urlStorage.title')}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{t('legal.privacy.sections.howCalculations.steps.urlStorage.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">{t('legal.privacy.sections.howCalculations.steps.noServer.title')}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{t('legal.privacy.sections.howCalculations.steps.noServer.desc')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Local Storage */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              3. {t('legal.privacy.sections.localStorage.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.privacy.sections.localStorage.intro')}
            </p>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">{t('legal.privacy.sections.localStorage.table.dataStored')}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">{t('legal.privacy.sections.localStorage.table.purpose')}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">{t('legal.privacy.sections.localStorage.table.containsFinancial')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  <tr>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{t('legal.privacy.sections.localStorage.table.theme')}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{t('legal.privacy.sections.localStorage.table.themePurpose')}</td>
                    <td className="px-4 py-3 text-green-600 dark:text-green-400 font-medium">{t('legal.privacy.sections.localStorage.table.no')}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{t('legal.privacy.sections.localStorage.table.language')}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{t('legal.privacy.sections.localStorage.table.languagePurpose')}</td>
                    <td className="px-4 py-3 text-green-600 dark:text-green-400 font-medium">{t('legal.privacy.sections.localStorage.table.no')}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{t('legal.privacy.sections.localStorage.table.sidebar')}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{t('legal.privacy.sections.localStorage.table.sidebarPurpose')}</td>
                    <td className="px-4 py-3 text-green-600 dark:text-green-400 font-medium">{t('legal.privacy.sections.localStorage.table.no')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
              {t('legal.privacy.sections.localStorage.clearNote')}
            </p>
          </section>

          {/* Section 4: {t('legal.privacy.thirdPartyTitle')} */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              4. {t('legal.privacy.sections.thirdParty.title')}
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{t('legal.privacy.sections.thirdParty.googleAdsense.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.privacy.sections.thirdParty.googleAdsense.intro')}
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 mb-4">
              <li>{t('legal.privacy.sections.thirdParty.googleAdsense.items.device')}</li>
              <li>{t('legal.privacy.sections.thirdParty.googleAdsense.items.location')}</li>
              <li>{t('legal.privacy.sections.thirdParty.googleAdsense.items.adInteraction')}</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>{t('legal.privacy.sections.thirdParty.googleAdsense.important')}</strong> For more information, see{' '}
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-fire-600 dark:text-fire-400 hover:underline"
              >
                Google's {t('legal.privacy.title')}
              </a>.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">{t('legal.privacy.sections.thirdParty.amazonAffiliate.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('legal.privacy.sections.thirdParty.amazonAffiliate.content')}
            </p>
          </section>

          {/* Section 5: No Tracking */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              5. {t('legal.privacy.sections.noTracking.title')}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="text-2xl">🚫</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">{t('legal.privacy.sections.noTracking.items.noAnalytics.title')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('legal.privacy.sections.noTracking.items.noAnalytics.desc')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="text-2xl">🚫</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">{t('legal.privacy.sections.noTracking.items.noPixel.title')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('legal.privacy.sections.noTracking.items.noPixel.desc')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="text-2xl">🚫</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">{t('legal.privacy.sections.noTracking.items.noUserTracking.title')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('legal.privacy.sections.noTracking.items.noUserTracking.desc')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="text-2xl">🚫</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">{t('legal.privacy.sections.noTracking.items.noCrossSite.title')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('legal.privacy.sections.noTracking.items.noCrossSite.desc')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: {t('legal.privacy.securityTitle')} */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              6. {t('legal.privacy.sections.dataSecurity.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('legal.privacy.sections.dataSecurity.content')}
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 mt-4">
              <li>{t('legal.privacy.sections.dataSecurity.recommendations.browser')}</li>
              <li>{t('legal.privacy.sections.dataSecurity.recommendations.device')}</li>
              <li>{t('legal.privacy.sections.dataSecurity.recommendations.urls')}</li>
            </ul>
          </section>

          {/* Section 7: Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              7. {t('legal.privacy.sections.yourRights.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.privacy.sections.yourRights.intro')}
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li><strong>{t('legal.privacy.sections.yourRights.rights.access')}</strong></li>
              <li><strong>{t('legal.privacy.sections.yourRights.rights.deletion')}</strong></li>
              <li><strong>{t('legal.privacy.sections.yourRights.rights.portability')}</strong></li>
              <li><strong>{t('legal.privacy.sections.yourRights.rights.object')}</strong></li>
            </ul>
          </section>

          {/* Section 8: Changes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              8. {t('legal.privacy.sections.changes.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('legal.privacy.sections.changes.content')}
            </p>
          </section>

          {/* Section 9: Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              9. {t('legal.privacy.sections.contact.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('legal.privacy.sections.contact.content')}
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 mt-2">
              <li>{t('legal.privacy.sections.contact.aboutPage')}{' '}
                <Link to="/about" className="text-fire-600 dark:text-fire-400 hover:underline">
                  About page
                </Link>
                {' '}{t('legal.privacy.sections.contact.aboutPageSuffix')}
              </li>
              <li>{t('legal.privacy.sections.contact.github')}{' '}
                <a 
                  href="https://github.com/jamesmontemagno/app-fire-calculator" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-fire-600 dark:text-fire-400 hover:underline"
                >
                  open-source code on GitHub
                </a>
              </li>
            </ul>
          </section>

          {/* Navigation */}
          <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link 
              to="/terms" 
              className="text-fire-600 dark:text-fire-400 hover:underline"
            >
              {t('legal.privacy.navigation.termsOfService')}
            </Link>
            <Link 
              to="/about" 
              className="text-fire-600 dark:text-fire-400 hover:underline"
            >
              {t('legal.privacy.navigation.aboutUs')}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
