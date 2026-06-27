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
              <span>✅</span> {t('legal.privacy.tldrTitle')}
            </h2>
            <ul className="space-y-2 text-green-800 dark:text-green-200">
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                <span><strong>All calculations happen 100% in your browser</strong> — your financial data never leaves your device</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                <span><strong>We do not collect, store, or transmit any personal or financial information</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                <span><strong>No user accounts, no databases, no server-side processing</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                <span><strong>No tracking, no analytics, no cookies for user data</strong></span>
              </li>
            </ul>
          </div>

          {/* Section 1: {t('legal.privacy.collectTitle')} */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              1. {t('legal.privacy.collectTitle')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>We do not collect any personal or financial information.</strong> This FIRE Calculator is designed with privacy as a core principle. Here's what that means:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">What We DON'T Collect:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>Names, email addresses, or contact information</li>
                <li>Financial data (income, expenses, savings, investments)</li>
                <li>IP addresses or location data</li>
                <li>Browsing history or usage patterns</li>
                <li>Cookies for tracking purposes</li>
              </ul>
            </div>
          </section>

          {/* Section 2: How Calculations Work */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              2. {t('legal.privacy.howWorkTitle')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              All calculations are performed entirely within your web browser (client-side). When you enter financial information:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Browser-Side Processing</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">All mathematical calculations happen in JavaScript running in your browser. No data is sent to our servers.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">URL-Based Storage (Optional)</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Your calculation inputs are encoded in the URL when you share or bookmark. This is the only way your data persists — and it's entirely under your control.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">No Server Transmission</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Your financial data is never transmitted to our servers for processing, storage, or any other purpose.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Local Storage */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              3. {t('legal.privacy.localStorageTitle')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We use browser local storage to save non-sensitive preferences only. This data never leaves your device:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">Data Stored</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">Purpose</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">Contains Financial Data?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  <tr>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Theme preference</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Remember dark/light mode</td>
                    <td className="px-4 py-3 text-green-600 dark:text-green-400 font-medium">No</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Language preference</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Remember language selection</td>
                    <td className="px-4 py-3 text-green-600 dark:text-green-400 font-medium">No</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Sidebar collapsed state</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Remember UI layout</td>
                    <td className="px-4 py-3 text-green-600 dark:text-green-400 font-medium">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
              You can clear this data at any time through your browser settings. Clearing local storage will not affect your calculations — it only resets your preferences to defaults.
            </p>
          </section>

          {/* Section 4: {t('legal.privacy.thirdPartyTitle')} */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              4. {t('legal.privacy.thirdPartyTitle')}
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Google AdSense</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We use Google AdSense to display advertisements. Google AdSense may collect certain information to serve relevant ads, including:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 mb-4">
              <li>Device information (browser type, operating system)</li>
              <li>General location (country/region level)</li>
              <li>Ad interaction data</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Important:</strong> Google's ad tracking is independent of our calculator. Your financial calculations and inputs are never shared with Google or any advertiser. For more information, see{' '}
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-fire-600 dark:text-fire-400 hover:underline"
              >
                Google's {t('legal.privacy.title')}
              </a>.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">Amazon Affiliate Links</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Some book recommendations include Amazon affiliate links. When you click these links, Amazon may collect data according to their privacy policy. This does not affect your calculator usage or data.
            </p>
          </section>

          {/* Section 5: No Tracking */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              5. {t('legal.privacy.noTrackingTitle')}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="text-2xl">🚫</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">No Google Analytics</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">We don't use Google Analytics or similar tracking tools.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="text-2xl">🚫</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">No Facebook Pixel</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">No social media tracking pixels.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="text-2xl">🚫</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">No User Tracking</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">We don't track individual users or sessions.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="text-2xl">🚫</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">No Cross-Site Tracking</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">We don't follow you across other websites.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: {t('legal.privacy.securityTitle')} */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              6. {t('legal.privacy.securityTitle')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Since all calculations happen locally in your browser and we don't collect any data, there's no database to breach. Your financial information is as secure as your own device. We recommend:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 mt-4">
              <li>Using a secure, up-to-date browser</li>
              <li>Keeping your device protected with a password or biometric lock</li>
              <li>Being cautious when sharing URLs that contain your financial calculations</li>
            </ul>
          </section>

          {/* Section 7: Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              7. Your Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Because we don't collect or store your personal data, many data protection rights are automatically satisfied:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li><strong>Right to Access:</strong> All your data is in your browser — you have complete access.</li>
              <li><strong>Right to Deletion:</strong> Clear your browser data to delete everything.</li>
              <li><strong>Right to Portability:</strong> Your calculation URLs contain all your data in portable form.</li>
              <li><strong>Right to Object:</strong> No processing to object to — your data stays with you.</li>
            </ul>
          </section>

          {/* Section 8: Changes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              8. Changes to This Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We may update this privacy policy from time to time. We will notify users of any material changes by posting the new policy on this page with an updated "Last updated" date.
            </p>
          </section>

          {/* Section 9: Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              9. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              If you have questions about this privacy policy, you can:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 mt-2">
              <li>Visit our{' '}
                <Link to="/about" className="text-fire-600 dark:text-fire-400 hover:underline">
                  About page
                </Link>
                {' '}for more information about the project
              </li>
              <li>View the{' '}
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
              Terms of Service →
            </Link>
            <Link 
              to="/about" 
              className="text-fire-600 dark:text-fire-400 hover:underline"
            >
              About Us →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
