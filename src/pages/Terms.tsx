import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service - FIRE Calculator"
        description="Terms of Service for FIRE Calculator. Free financial independence planning tool. Read our usage terms, disclaimers, intellectual property rights, and acceptable use policy."
        keywords="FIRE calculator terms, financial calculator terms of service, legal disclaimer, acceptable use policy"
        canonicalPath="/terms"
      />
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            📜 Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: June 2025
          </p>
        </header>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          {/* Agreement */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              1. Agreement to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              By accessing and using FIRE Calculator (available at <a href="https://firecalc.nextapi.pro" target="_blank" rel="noopener noreferrer" className="text-fire-600 dark:text-fire-400 hover:underline">firecalc.nextapi.pro</a> and <a href="https://myfirenumber.com" target="_blank" rel="noopener noreferrer" className="text-fire-600 dark:text-fire-400 hover:underline">myfirenumber.com</a>), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          {/* Important Disclaimer */}
          <section className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
              <span>⚠️</span> Important Disclaimer
            </h2>
            <div className="space-y-3 text-red-800 dark:text-red-200">
              <p>
                <strong>This calculator is provided for educational and informational purposes only.</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>It is NOT financial, investment, tax, or legal advice.</li>
                <li>Results are hypothetical projections based on user inputs and assumed rates.</li>
                <li>Actual investment returns, inflation rates, and outcomes will vary.</li>
                <li>Past performance does not guarantee future results.</li>
                <li>You should consult with qualified professionals before making any financial decisions.</li>
              </ul>
              <p className="font-semibold mt-4">
                We are not responsible for any financial decisions you make based on calculations from this tool.
              </p>
            </div>
          </section>

          {/* Description of Service */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              2. Description of Service
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              FIRE Calculator provides free, browser-based financial planning calculators for the FIRE (Financial Independence, Retire Early) community. Our services include:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>Various FIRE calculators (Standard, Coast, Lean, Fat, Barista)</li>
              <li>Withdrawal rate and savings rate calculators</li>
              <li>Reverse FIRE and debt payoff calculators</li>
              <li>Healthcare gap planning tools</li>
              <li>Educational resources and book recommendations</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              All calculations are performed client-side (in your browser). We do not store your financial data on our servers.
            </p>
          </section>

          {/* No Professional Advice */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              3. Not Professional Advice
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The information provided by FIRE Calculator does not constitute:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">❌ Financial Advice</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">We do not recommend specific investments, savings strategies, or financial products.</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">❌ Investment Advice</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">We do not advise on buying, selling, or holding any securities or assets.</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">❌ Tax Advice</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">We do not provide guidance on tax strategies or obligations.</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">❌ Legal Advice</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">We do not provide legal guidance on any matters.</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Always consult with qualified professionals (financial advisors, tax professionals, attorneys) before making financial decisions.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              4. User Responsibilities
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">By using our service, you agree to:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>Use the calculator for personal, non-commercial purposes</li>
              <li>Not attempt to reverse engineer, copy, or redistribute the software</li>
              <li>Not use automated tools to scrape or abuse the service</li>
              <li>Verify all calculations with qualified professionals before making financial decisions</li>
              <li>Accept responsibility for your own financial decisions</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              5. Intellectual Property
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Our Rights</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The FIRE Calculator software, including its design, code, logos, and content (excluding third-party content and user-generated data), is protected by intellectual property laws. While the core calculator code is open source, the following restrictions apply:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 mb-6">
              <li>You may view and fork the open-source code on GitHub</li>
              <li>You may not use our branding, logos, or domain names without permission</li>
              <li>You may not claim the calculator as your own work</li>
              <li>Derivative works must comply with the applicable open-source license</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Third-Party Content</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Some content on our site, such as book recommendations and affiliate links, may link to third-party websites. We are not responsible for the content, privacy practices, or terms of third-party sites.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              6. Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW:
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">No Warranty</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">The calculator is provided "AS IS" without warranties of any kind, express or implied, including but not limited to accuracy, fitness for a particular purpose, or non-infringement.</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">No Guarantee of Results</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">We do not guarantee that calculations will be accurate or that any financial outcomes will be achieved.</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Limitation of Damages</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">We shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of the calculator.</p>
              </div>
            </div>
          </section>

          {/* Disclaimer of Financial Outcomes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              7. Disclaimer of Financial Outcomes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The projections and calculations provided by FIRE Calculator are based on:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 mb-4">
              <li>User-provided inputs which may be inaccurate</li>
              <li>Assumed rates (investment returns, inflation) that may not reflect reality</li>
              <li>Historical data that may not predict future performance</li>
              <li>Simplified models that do not account for all real-world factors</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Actual financial outcomes depend on numerous factors beyond our control,</strong> including but not limited to: market conditions, tax laws, healthcare costs, inflation, unexpected expenses, and individual circumstances. Never rely solely on this calculator for financial planning.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              8. Third-Party Services & Affiliate Links
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Google AdSense</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We use Google AdSense to display advertisements. Google may use cookies and similar technologies to serve ads. Your use of our service is also subject to Google's terms and privacy policy.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Affiliate Links</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Some links on our site (such as book recommendations) are affiliate links. If you make a purchase through these links, we may receive a small commission at no additional cost to you. This helps support the free calculator. We are not responsible for the products, services, or terms of third-party vendors.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              9. Changes to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this page. Your continued use of the service after changes constitutes acceptance of the new terms. We encourage you to review these terms periodically.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Material changes will be indicated by updating the "Last updated" date at the top of this page.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              10. Termination
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We reserve the right to terminate or suspend access to our service at any time, without notice, for any reason, including but not limited to violation of these Terms. Since this is a free, client-side application with no user accounts, termination means you may no longer be able to access our website.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              11. Governing Law
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising from these terms or use of the service shall be resolved in the appropriate courts of jurisdiction.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              12. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              If you have questions about these Terms of Service, please:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 mt-2">
              <li>Visit our{' '}
                <Link to="/about" className="text-fire-600 dark:text-fire-400 hover:underline">
                  About page
                </Link>
                {' '}for more information
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
              <li>Read our{' '}
                <Link to="/privacy" className="text-fire-600 dark:text-fire-400 hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </section>

          {/* Acceptance */}
          <section className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Acknowledgment
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              By using FIRE Calculator, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, including the important disclaimers about financial advice.
            </p>
          </section>

          {/* Navigation */}
          <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link 
              to="/privacy" 
              className="text-fire-600 dark:text-fire-400 hover:underline"
            >
              ← Privacy Policy
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
