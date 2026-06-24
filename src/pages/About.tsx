import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function About() {
  return (
    <>
      <SEO
        title="About FIRE Calculator - Free Financial Independence Planning Tool"
        description="Learn about FIRE Calculator: a free, privacy-first, offline-capable tool for Financial Independence, Retire Early planning. Open source, no tracking, 100% browser-side calculations."
        keywords="FIRE calculator about, financial independence tool, open source calculator, privacy-first FIRE, free retirement calculator"
        canonicalPath="/about"
      />
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <span className="text-5xl mb-4 block">🔥</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            About FIRE Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A free, privacy-first tool for planning your path to financial independence
          </p>
        </header>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          {/* Mission */}
          <section className="bg-gradient-to-br from-fire-50 via-orange-50 to-amber-50 dark:from-fire-900/20 dark:via-orange-900/20 dark:to-amber-900/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              To provide accessible, privacy-respecting financial planning tools that help everyone pursue financial independence — 
              <strong className="text-fire-600 dark:text-fire-400"> without compromising their personal data.</strong>
            </p>
          </section>

          {/* What is FIRE */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              What is FIRE?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>FIRE</strong> (Financial Independence, Retire Early) is a lifestyle movement focused on achieving financial freedom through aggressive saving and smart investing. The goal is to accumulate enough wealth that your investments can cover your living expenses indefinitely, giving you the freedom to retire much earlier than traditional retirement age.
            </p>
            
            <div className="mt-6 grid sm:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">💡 The Core Principle</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  The "4% Rule" suggests that if you withdraw 4% of your portfolio annually, your savings should last 30+ years. This means you need approximately 25x your annual expenses to achieve FIRE.
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">🎯 The Goal</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Financial independence means having enough passive income (from investments) to cover your living expenses, giving you freedom to choose how you spend your time — whether that's early retirement, part-time work, or pursuing passion projects.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">Types of FIRE</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="text-2xl">💰</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Standard FIRE</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">The classic 25x annual expenses approach. Full financial independence with no need for additional income.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="text-2xl">🌿</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Coast FIRE</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Save enough now so compound growth carries you to traditional retirement. Stop saving early and "coast" to FI.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <span className="text-2xl"> minimalist</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Lean FIRE</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">FI with a frugal lifestyle. Lower expenses mean a smaller target number, achieved faster.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <span className="text-2xl">✨</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Fat FIRE</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">FI with a comfortable or luxurious lifestyle. Higher expenses require a larger portfolio.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <span className="text-2xl">☕</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Barista FIRE</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Partial FI combined with part-time work. Leave full-time corporate work earlier while maintaining some income.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Tools */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              Our Tools
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We offer a comprehensive suite of calculators to help you plan every aspect of your FIRE journey:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Standard FIRE Calculator</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Calculate your FIRE number and timeline to full financial independence.</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Coast FIRE Calculator</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Find your Coast FIRE number — when you can stop saving and let compound growth finish the job.</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Lean & Fat FIRE</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Calculate FI targets for minimalist or comfortable lifestyles.</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Barista FIRE Calculator</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Blend part-time work with investment income for earlier semi-retirement.</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Withdrawal Rate Calculator</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Test portfolio longevity and find your safe withdrawal rate.</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Savings Rate Calculator</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Calculate your savings rate and see how it impacts your FIRE timeline.</p>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              Why Choose FIRE Calculator?
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">100% Free</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">No subscriptions, no premium tiers, no hidden fees. All calculators are completely free to use.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Privacy First</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Your financial data stays in your browser. No accounts, no databases, no server processing.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Works Offline</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">After initial load, the app works without internet. Install as a PWA and calculate anywhere.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">No Tracking</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">No analytics, no cookies, no third-party trackers. Your usage is completely private.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Shareable URLs</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Save calculations in URLs. Bookmark, share with a partner, or revisit later — your data is in the link.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Open Source</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">All code is publicly available. Verify our privacy claims yourself — transparency is key.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Open Source */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              Open Source Project
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This calculator is open source, meaning anyone can inspect, verify, and contribute to the code. We believe transparency builds trust — especially for financial tools.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.181 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.657.242 2.878.118 3.181.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">GitHub Repository</h3>
                  <a 
                    href="https://github.com/jamesmontemagno/app-fire-calculator" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-fire-600 dark:text-fire-400 hover:underline"
                  >
                    github.com/jamesmontemagno/app-fire-calculator
                  </a>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Feel free to explore the code, report issues, suggest features, or contribute improvements. 
                We welcome community involvement and feedback.
              </p>
            </div>
          </section>

          {/* Resources */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              Learn More About FIRE
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Explore our curated resources to deepen your understanding of financial independence:
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/books" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-fire-100 dark:bg-fire-900/30 text-fire-700 dark:text-fire-300 rounded-lg hover:bg-fire-200 dark:hover:bg-fire-900/50 transition-colors"
              >
                <span>📚</span> Recommended Books
              </Link>
              <Link 
                to="/apps" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-fire-100 dark:bg-fire-900/30 text-fire-700 dark:text-fire-300 rounded-lg hover:bg-fire-200 dark:hover:bg-fire-900/50 transition-colors"
              >
                <span>📱</span> Recommended Apps
              </Link>
              <Link 
                to="/quiz" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-fire-100 dark:bg-fire-900/30 text-fire-700 dark:text-fire-300 rounded-lg hover:bg-fire-200 dark:hover:bg-fire-900/50 transition-colors"
              >
                <span>🧭</span> Find Your FIRE Path
              </Link>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Disclaimer</h2>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              This calculator is for <strong>educational and informational purposes only</strong>. It is not financial, investment, tax, or legal advice. 
              Results are hypothetical projections based on user inputs and assumed rates. <strong>Actual results will vary</strong>. 
              Please consult a qualified financial advisor before making any financial decisions.{' '}
              <Link to="/terms" className="text-fire-600 dark:text-fire-400 hover:underline">
                Read our full Terms of Service
              </Link>.
            </p>
          </section>

          {/* Navigation */}
          <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link 
              to="/" 
              className="text-fire-600 dark:text-fire-400 hover:underline"
            >
              ← Start Calculating
            </Link>
            <Link 
              to="/privacy" 
              className="text-fire-600 dark:text-fire-400 hover:underline"
            >
              Privacy Policy →
            </Link>
            <Link 
              to="/terms" 
              className="text-fire-600 dark:text-fire-400 hover:underline"
            >
              Terms of Service →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}