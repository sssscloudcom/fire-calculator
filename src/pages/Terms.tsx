import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'

export default function Terms() {
  const { t } = useTranslation()
  return (
    <>
      <SEO
        title="{t('legal.terms.title')} - FIRE Calculator"
        description="{t('legal.terms.title')} for FIRE Calculator. Free financial independence planning tool. Read our usage terms, disclaimers, intellectual property rights, and acceptable use policy."
        keywords="FIRE calculator terms, financial calculator terms of service, legal disclaimer, acceptable use policy"
        canonicalPath="/terms"
      />
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            📜 {t('legal.terms.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('legal.terms.lastUpdated')}
          </p>
        </header>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          {/* Agreement */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              1. {t('legal.terms.sections.agreement.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('legal.terms.sections.agreement.content')}
            </p>
          </section>

          {/* {t('legal.terms.disclaimerTitle')} */}
          <section className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
              <span>⚠️</span> {t('legal.terms.sections.disclaimer.title')}
            </h2>
            <div className="space-y-3 text-red-800 dark:text-red-200">
              <p>
                <strong>{t('legal.terms.sections.disclaimer.content')}</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>{t('legal.terms.sections.disclaimer.items.notAdvice')}</li>
                <li>{t('legal.terms.sections.disclaimer.items.hypothetical')}</li>
                <li>{t('legal.terms.sections.disclaimer.items.vary')}</li>
                <li>{t('legal.terms.sections.disclaimer.items.past')}</li>
                <li>{t('legal.terms.sections.disclaimer.items.consult')}</li>
              </ul>
              <p className="font-semibold mt-4">
                {t('legal.terms.sections.disclaimer.notResponsible')}
              </p>
            </div>
          </section>

          {/* {t('legal.terms.descriptionTitle')} */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              2. {t('legal.terms.sections.serviceDescription.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.terms.sections.serviceDescription.content')}
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>{t('legal.terms.sections.serviceDescription.items.calculators')}</li>
              <li>{t('legal.terms.sections.serviceDescription.items.withdrawal')}</li>
              <li>{t('legal.terms.sections.serviceDescription.items.reverse')}</li>
              <li>{t('legal.terms.sections.serviceDescription.items.healthcare')}</li>
              <li>{t('legal.terms.sections.serviceDescription.items.resources')}</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              {t('legal.terms.sections.serviceDescription.allClientSide')}
            </p>
          </section>

          {/* No Professional Advice */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              3. {t('legal.terms.sections.notProfessionalAdvice.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.terms.sections.notProfessionalAdvice.content')}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">❌ {t('legal.terms.sections.notProfessionalAdvice.types.financial.title')}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('legal.terms.sections.notProfessionalAdvice.types.financial.desc')}</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">❌ {t('legal.terms.sections.notProfessionalAdvice.types.investment.title')}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('legal.terms.sections.notProfessionalAdvice.types.investment.desc')}</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">❌ {t('legal.terms.sections.notProfessionalAdvice.types.tax.title')}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('legal.terms.sections.notProfessionalAdvice.types.tax.desc')}</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">❌ {t('legal.terms.sections.notProfessionalAdvice.types.legal.title')}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('legal.terms.sections.notProfessionalAdvice.types.legal.desc')}</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              {t('legal.terms.sections.notProfessionalAdvice.consult')}
            </p>
          </section>

          {/* {t('legal.terms.responsibilitiesTitle')} */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              4. {t('legal.terms.sections.userResponsibilities.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t('legal.terms.sections.userResponsibilities.intro')}</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>{t('legal.terms.sections.userResponsibilities.items.personal')}</li>
              <li>{t('legal.terms.sections.userResponsibilities.items.noReverse')}</li>
              <li>{t('legal.terms.sections.userResponsibilities.items.noScrape')}</li>
              <li>{t('legal.terms.sections.userResponsibilities.items.verify')}</li>
              <li>{t('legal.terms.sections.userResponsibilities.items.accept')}</li>
            </ul>
          </section>

          {/* {t('legal.terms.ipTitle')} */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              5. {t('legal.terms.sections.intellectualProperty.title')}
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{t('legal.terms.sections.intellectualProperty.ourRights.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.terms.sections.intellectualProperty.ourRights.content')}
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 mb-6">
              <li>{t('legal.terms.sections.intellectualProperty.ourRights.items.view')}</li>
              <li>{t('legal.terms.sections.intellectualProperty.ourRights.items.branding')}</li>
              <li>{t('legal.terms.sections.intellectualProperty.ourRights.items.claim')}</li>
              <li>{t('legal.terms.sections.intellectualProperty.ourRights.items.derivative')}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{t('legal.terms.sections.intellectualProperty.thirdParty.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('legal.terms.sections.intellectualProperty.thirdParty.content')}
            </p>
          </section>

          {/* {t('legal.terms.liabilityTitle')} */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              6. {t('legal.terms.sections.limitationOfLiability.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.terms.sections.limitationOfLiability.intro')}
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{t('legal.terms.sections.limitationOfLiability.items.noWarranty.title')}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('legal.terms.sections.limitationOfLiability.items.noWarranty.desc')}</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{t('legal.terms.sections.limitationOfLiability.items.noGuarantee.title')}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('legal.terms.sections.limitationOfLiability.items.noGuarantee.desc')}</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{t('legal.terms.sections.limitationOfLiability.items.limitation.title')}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('legal.terms.sections.limitationOfLiability.items.limitation.desc')}</p>
              </div>
            </div>
          </section>

          {/* Disclaimer of Financial Outcomes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              7. {t('legal.terms.sections.disclaimerOutcomes.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.terms.sections.disclaimerOutcomes.intro')}
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 mb-4">
              <li>{t('legal.terms.sections.disclaimerOutcomes.items.inputs')}</li>
              <li>{t('legal.terms.sections.disclaimerOutcomes.items.assumed')}</li>
              <li>{t('legal.terms.sections.disclaimerOutcomes.items.historical')}</li>
              <li>{t('legal.terms.sections.disclaimerOutcomes.items.simplified')}</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>{t('legal.terms.sections.disclaimerOutcomes.actualDepends')}</strong>
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              8. {t('legal.terms.sections.thirdPartyServices.title')}
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{t('legal.terms.sections.thirdPartyServices.googleAdsense.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.terms.sections.thirdPartyServices.googleAdsense.content')}
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{t('legal.terms.sections.thirdPartyServices.affiliate.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('legal.terms.sections.thirdPartyServices.affiliate.content')}
            </p>
          </section>

          {/* {t('legal.terms.changesTitle')} */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              9. {t('legal.terms.sections.changes.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('legal.terms.sections.changes.content')}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              {t('legal.terms.sections.changes.material')}
            </p>
          </section>

          {/* {t('legal.terms.terminationTitle')} */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              10. {t('legal.terms.sections.termination.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('legal.terms.sections.termination.content')}
            </p>
          </section>

          {/* {t('legal.terms.governingTitle')} */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              11. {t('legal.terms.sections.governingLaw.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('legal.terms.sections.governingLaw.content')}
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              12. {t('legal.terms.sections.contact.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('legal.terms.sections.contact.content')}
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 mt-2">
              <li>{t('legal.terms.sections.contact.aboutPage')}{' '}
                <Link to="/about" className="text-fire-600 dark:text-fire-400 hover:underline">
                  About page
                </Link>
                {' '}{t('legal.terms.sections.contact.aboutPageSuffix')}
              </li>
              <li>{t('legal.terms.sections.contact.github')}{' '}
                <a 
                  href="https://github.com/jamesmontemagno/app-fire-calculator" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-fire-600 dark:text-fire-400 hover:underline"
                >
                  open-source code on GitHub
                </a>
              </li>
              <li>{t('legal.terms.sections.contact.privacy')}{' '}
                <Link to="/privacy" className="text-fire-600 dark:text-fire-400 hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </section>

          {/* Acceptance */}
          <section className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              {t('legal.terms.sections.acknowledgment.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('legal.terms.sections.acknowledgment.content')}
            </p>
          </section>

          {/* Navigation */}
          <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link 
              to="/privacy" 
              className="text-fire-600 dark:text-fire-400 hover:underline"
            >
              {t('legal.terms.navigation.privacyPolicy')}
            </Link>
            <Link 
              to="/about" 
              className="text-fire-600 dark:text-fire-400 hover:underline"
            >
              {t('legal.terms.navigation.aboutUs')}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
