import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useCalculatorParams } from '../hooks/useCalculatorParams'
import { calculateFatFIRE, formatCurrency } from '../utils/calculations'
import { exportToExcel, prepareInputsForExport, prepareResultsForExport } from '../utils/excelExport'
import { CurrencyInput, PercentageInput, AgeInput } from '../components/inputs'
import { Card, CardHeader, CardContent, ResultCard, UrlActions, ProgressToFIRE, Disclaimer, ExportButton } from '../components/ui'
import { ProjectionChart } from '../components/charts'
import SEO from '../components/SEO'
import { calculatorSEO } from '../config/seo'

const FAT_THRESHOLD = 100000

export default function FatFIRE() {
  const { t } = useTranslation()
  const { params, setParam, resetParams, copyUrl, hasCustomParams } = useCalculatorParams()

  const results = useMemo(() => {
    return calculateFatFIRE({
      currentAge: params.currentAge,
      retirementAge: params.retirementAge,
      currentSavings: params.currentSavings,
      annualContribution: params.annualContribution,
      annualIncome: params.annualIncome,
      expectedReturn: params.expectedReturn,
      inflationRate: params.inflationRate,
      withdrawalRate: params.withdrawalRate,
      annualExpenses: params.annualExpenses,
    })
  }, [params])

  const isFat = params.annualExpenses >= FAT_THRESHOLD

  const handleExport = () => {
    const { values: inputValues, formats: inputFormats } = prepareInputsForExport({
      currentAge: params.currentAge,
      retirementAge: params.retirementAge,
      currentSavings: params.currentSavings,
      annualContribution: params.annualContribution,
      expectedReturn: params.expectedReturn,
      inflationRate: params.inflationRate,
      withdrawalRate: params.withdrawalRate,
      annualExpenses: params.annualExpenses,
    })

    const { values: resultValues, formats: resultFormats } = prepareResultsForExport(results)

    // Define formulas for calculated results
    const resultFormulas: Record<string, string> = {
      // FIRE Number = Annual Expenses / Withdrawal Rate
      fireNumber: '{annualExpenses}/{withdrawalRate}',
      // Savings Rate = Annual Contribution / (Annual Contribution + Annual Expenses)
      savingsRate: '{annualContribution}/({annualContribution}+{annualExpenses})',
      // Monthly Contribution = Annual Contribution / 12
      monthlyContribution: '{annualContribution}/12',
    }

    exportToExcel({
      calculatorName: 'Fat FIRE',
      inputs: inputValues,
      results: resultValues,
      projections: results.projections,
      inputFormats,
      resultFormats,
      resultFormulas,
    })
  }

  return (
    <>
      <SEO {...calculatorSEO.fat} />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
              <span className="text-3xl" role="img" aria-label="Diamond emoji">💎</span>
              {t('fatFire.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t('fatFire.subtitle')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ExportButton onExport={handleExport} />
            <UrlActions onReset={resetParams} onCopy={copyUrl} hasCustomParams={hasCustomParams} />
          </div>
      </div>

      {/* Progress Bar */}
      <ProgressToFIRE 
        currentSavings={params.currentSavings} 
        fireNumber={results.fireNumber}
        yearsToFIRE={results.yearsToFIRE}
      />

      {/* Fat FIRE Explanation Banner */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
        <div className="flex gap-3">
          <span className="text-2xl">💎</span>
          <div>
            <h3 className="font-semibold text-purple-900 dark:text-purple-100">{t('fatFire.whatIs.title')}</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
              {t('fatFire.bannerContent')}
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('common.yourInformation')}</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <AgeInput
              label={t('input.currentAge')}
              value={params.currentAge}
              onChange={(v) => setParam('currentAge', v)}
            />
            <AgeInput
              label={t('input.targetRetirementAge')}
              value={params.retirementAge}
              onChange={(v) => setParam('retirementAge', v)}
            />
            <CurrencyInput
              label={t('input.currentSavings')}
              value={params.currentSavings}
              onChange={(v) => setParam('currentSavings', v)}
            />
            <CurrencyInput
              label={t('input.annualContribution')}
              value={params.annualContribution}
              onChange={(v) => setParam('annualContribution', v)}
            />
            <div>
              <CurrencyInput
                label={t('fatFire.annualExpensesFat')}
                value={params.annualExpenses}
                onChange={(v) => setParam('annualExpenses', v)}
                tooltip={t('fatFire.annualExpensesFatTooltip')}
              />
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>{t('fatFire.fatThreshold')}</span>
                  <span>{formatCurrency(FAT_THRESHOLD)}</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${
                      isFat ? 'bg-purple-500' : 'bg-gray-400'
                    }`}
                    style={{ width: `${Math.min(100, (params.annualExpenses / FAT_THRESHOLD) * 100)}%` }}
                  />
                </div>
                {isFat && (
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">{t('fatFire.fatTerritory')}</p>
                )}
              </div>
            </div>
            <PercentageInput
              label={t('input.expectedReturn')}
              value={params.expectedReturn}
              onChange={(v) => setParam('expectedReturn', v)}
              min={0}
              max={0.15}
            />
            <PercentageInput
              label={t('input.inflationRate')}
              value={params.inflationRate}
              onChange={(v) => setParam('inflationRate', v)}
              min={0}
              max={0.10}
            />
            <PercentageInput
              label={t('input.safeWithdrawalRate')}
              value={params.withdrawalRate}
              onChange={(v) => setParam('withdrawalRate', v)}
              tooltip={t('fatFire.swrTooltip')}
              min={0.02}
              max={0.06}
            />
          </CardContent>
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              label={t('fatFire.fatFireNumber')}
              value={results.fireNumber}
              format="currency"
              highlight
              subtext={t('output.targetPortfolioValue')}
            />
            <ResultCard
              label={t('fatFire.yearsToFatFire')}
              value={results.yearsToFIRE}
              format="years"
              subtext={`At age ${Math.round(results.fireAge)}`}
            />
            <ResultCard
              label={t('fatFire.monthlyLifestyle')}
              value={params.annualExpenses / 12}
              format="currency"
              subtext={t('fatFire.inRetirement')}
            />
          </div>

          {/* Chart */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('common.portfolioProjection')}</h2>
            </CardHeader>
            <CardContent>
              <ProjectionChart
                data={results.projections}
                fireNumber={results.fireNumber}
                colorScheme="purple"
                height={350}
              />
            </CardContent>
          </Card>

          {/* Fat FIRE Lifestyle Examples */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('fatFire.lifestyleTitle')}</h2>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <span className="text-xl">🏡</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{t('fatFire.lifestyle.premiumHousing.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('fatFire.lifestyle.premiumHousing.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">✈️</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{t('fatFire.lifestyle.travelFreedom.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('fatFire.lifestyle.travelFreedom.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">🍽️</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">Dining & Entertainment</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('fatFire.lifestyle.dining.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">🏥</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{t('fatFire.lifestyle.healthcare.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('fatFire.lifestyle.healthcare.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">🎁</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{t('fatFire.lifestyle.generosity.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('fatFire.lifestyle.generosity.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">🛡️</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{t('fatFire.lifestyle.securityBuffer.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('fatFire.lifestyle.securityBuffer.desc')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Disclaimer />
    </div>
    </>
  )
}
