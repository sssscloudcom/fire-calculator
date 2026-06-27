import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useCalculatorParams } from '../hooks/useCalculatorParams'
import { calculateCoastFIRE, formatCurrency } from '../utils/calculations'
import { exportToExcel, prepareInputsForExport, prepareResultsForExport } from '../utils/excelExport'
import { CurrencyInput, PercentageInput, AgeInput } from '../components/inputs'
import { Card, CardHeader, CardContent, ResultCard, UrlActions, ProgressToFIRE, Disclaimer, ExportButton } from '../components/ui'
import { ProjectionChart } from '../components/charts'
import SEO from '../components/SEO'
import { calculatorSEO } from '../config/seo'

export default function CoastFIRE() {
  const { t } = useTranslation()
  const { params, setParam, resetParams, copyUrl, hasCustomParams } = useCalculatorParams()

  const results = useMemo(() => {
    return calculateCoastFIRE(
      params.currentAge,
      params.retirementAge,
      params.currentSavings,
      params.annualContribution,
      params.expectedReturn,
      params.inflationRate,
      params.annualExpenses,
      params.withdrawalRate
    )
  }, [params])

  const coastStatus = results.alreadyCoasting
    ? { text: "You're already Coast FIRE!", color: 'text-green-600 dark:text-green-400' }
    : { text: `${results.yearsToCoast.toFixed(1)} years to Coast FIRE`, color: 'text-fire-600 dark:text-fire-400' }

  const handleExport = () => {
    const { values: inputValues, formats: inputFormats } = prepareInputsForExport({
      currentAge: params.currentAge,
      retirementAge: params.retirementAge,
      currentSavings: params.currentSavings,
      annualContribution: params.annualContribution,
      expectedReturn: params.expectedReturn,
      inflationRate: params.inflationRate,
      annualExpenses: params.annualExpenses,
      withdrawalRate: params.withdrawalRate,
    })

    const { values: resultValues, formats: resultFormats } = prepareResultsForExport(results)

    // Define formulas for calculated results
    const resultFormulas: Record<string, string> = {
      // FIRE Number = Annual Expenses / Withdrawal Rate
      fireNumber: '{annualExpenses}/{withdrawalRate}',
      // Coast Number uses complex present value calculation, so we use calculated value
    }

    exportToExcel({
      calculatorName: 'Coast FIRE',
      inputs: inputValues,
      results: resultValues,
      projections: results.projections,
      additionalSheets: [{
        name: 'With Contributions',
        data: results.projectionsWithContributions,
      }],
      inputFormats,
      resultFormats,
      resultFormulas,
    })
  }

  return (
    <>
      <SEO {...calculatorSEO.coast} />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
              <span className="text-3xl" role="img" aria-label="Sailboat emoji">⛵</span>
              {t('coastFire.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t('coastFire.subtitle')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ExportButton onExport={handleExport} />
            <UrlActions onReset={resetParams} onCopy={copyUrl} hasCustomParams={hasCustomParams} />
        </div>
      </div>

      {/* Progress to Coast FIRE */}
      <ProgressToFIRE 
        currentSavings={params.currentSavings} 
        fireNumber={results.coastNumber}
        yearsToFIRE={results.yearsToCoast}
        label={t('common.progressToCoastFire')}
        targetLabel="Coast Number"
      />

      {/* Coast FIRE Explanation Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">{t('coastFire.whatIs.title')}</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              {t('coastFire.bannerContent')}
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
              tooltip={t('coastFire.targetRetirementAgeTooltip')}
              min={params.currentAge + 1}
              max={80}
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
              tooltip={t('input.annualContributionTooltip')}
            />
            <CurrencyInput
              label={t('coastFire.annualExpensesInRetirement')}
              value={params.annualExpenses}
              onChange={(v) => setParam('annualExpenses', v)}
            />
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
              min={0.02}
              max={0.06}
            />
          </CardContent>
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Banner */}
          <div className={`text-center p-4 rounded-xl ${
            results.alreadyCoasting 
              ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700' 
              : 'bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700'
          }`}>
            <p className={`text-xl font-bold ${coastStatus.color}`}>
              {coastStatus.text}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              label={t('coastFire.coastFireNumber')}
              value={results.coastNumber}
              format="currency"
              highlight
              subtext={t('coastFire.amountNeededToday')}
            />
            <ResultCard
              label={t('coastFire.fullFireNumber')}
              value={results.fireNumber}
              format="currency"
              subtext={`At age ${params.retirementAge}`}
            />
            <ResultCard
              label={t('coastFire.currentProgress')}
              value={Math.min(1, params.currentSavings / results.coastNumber)}
              format="percent"
              subtext={`${formatCurrency(params.currentSavings)} saved`}
            />
          </div>

          {/* Chart */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('coastFire.coastVsContinue')}</h2>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-gray-600 dark:text-gray-400">{t('coastFire.coastNoMore')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                  <span className="text-gray-600 dark:text-gray-400">{t('coastFire.continueContributing')}</span>
                </div>
              </div>
              <ProjectionChart
                data={results.projectionsWithContributions}
                fireNumber={results.fireNumber}
                colorScheme="blue"
                height={350}
              />
            </CardContent>
          </Card>

          {/* Explanation */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('coastFire.howWorksTitle')}</h2>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none text-sm">
              <p>
                {t('coastFire.howWorksContent', {
                  coastNumber: formatCurrency(results.coastNumber),
                  fireNumber: formatCurrency(results.fireNumber),
                  retirementAge: params.retirementAge
                })}
              </p>
              {results.alreadyCoasting ? (
                <p className="text-green-600 dark:text-green-400">
                  {t('coastFire.alreadyCoasting', {
                    fireNumber: formatCurrency(results.fireNumber),
                    retirementAge: params.retirementAge
                  })}
                </p>
              ) : (
                <p>
                  You need {formatCurrency(results.coastNumber - params.currentSavings)} more to reach Coast FIRE. 
                  At your current savings rate, this will take approximately {results.yearsToCoast.toFixed(1)} years.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Disclaimer />
    </div>
    </>
  )
}
