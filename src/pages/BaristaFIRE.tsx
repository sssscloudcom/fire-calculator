import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useCalculatorParams } from '../hooks/useCalculatorParams'
import { calculateBaristaFIRE, formatCurrency } from '../utils/calculations'
import { exportToExcel, prepareInputsForExport, prepareResultsForExport } from '../utils/excelExport'
import { CurrencyInput, PercentageInput, AgeInput } from '../components/inputs'
import { Card, CardHeader, CardContent, ResultCard, UrlActions, ProgressToFIRE, Disclaimer, ExportButton } from '../components/ui'
import { ProjectionChart } from '../components/charts'
import SEO from '../components/SEO'
import { calculatorSEO } from '../config/seo'

export default function BaristaFIRE() {
  const { t } = useTranslation()
  const { params, setParam, resetParams, copyUrl, hasCustomParams } = useCalculatorParams()

  const results = useMemo(() => {
    return calculateBaristaFIRE(
      params.currentAge,
      params.currentSavings,
      params.annualContribution,
      params.expectedReturn,
      params.inflationRate,
      params.annualExpenses,
      params.withdrawalRate,
      params.partTimeIncome
    )
  }, [params])

  const portfolioReduction = results.fullFireNumber - results.baristaNumber
  const reductionPercent = (portfolioReduction / results.fullFireNumber) * 100

  const handleExport = () => {
    const { values: inputValues, formats: inputFormats } = prepareInputsForExport({
      currentAge: params.currentAge,
      currentSavings: params.currentSavings,
      annualContribution: params.annualContribution,
      expectedReturn: params.expectedReturn,
      inflationRate: params.inflationRate,
      annualExpenses: params.annualExpenses,
      withdrawalRate: params.withdrawalRate,
      partTimeIncome: params.partTimeIncome,
    })

    const { values: resultValues, formats: resultFormats } = prepareResultsForExport(results)

    // Define formulas for calculated results
    const resultFormulas: Record<string, string> = {
      // Full FIRE Number = Annual Expenses / Withdrawal Rate
      fullFireNumber: '{annualExpenses}/{withdrawalRate}',
      // Barista Number = (Annual Expenses - Part Time Income) / Withdrawal Rate
      baristaNumber: '({annualExpenses}-{partTimeIncome})/{withdrawalRate}',
      // Part Time Income Needed = Annual Expenses - Barista Number * Withdrawal Rate
      // This simplifies to: Annual Expenses - Part Time Income (same as input)
      // So we just reference the input value
    }

    exportToExcel({
      calculatorName: 'Barista FIRE',
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
      <SEO {...calculatorSEO.barista} />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
              <span className="text-3xl" role="img" aria-label="Coffee emoji">☕</span>
              {t('baristaFire.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t('baristaFire.subtitle')}
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
        fireNumber={results.baristaNumber}
        yearsToFIRE={results.yearsToBaristaFIRE}
        label={t('common.progressToBaristaFire')}
        targetLabel="Barista Number"
      />

      {/* Barista FIRE Explanation Banner */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
        <div className="flex gap-3">
          <span className="text-2xl">☕</span>
          <div>
            <h3 className="font-semibold text-amber-900 dark:text-amber-100">{t('baristaFire.whatIs.title')}</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              {t('baristaFire.content')}
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
            <CurrencyInput
              label={t('input.annualExpenses')}
              value={params.annualExpenses}
              onChange={(v) => setParam('annualExpenses', v)}
              tooltip={t('input.annualExpensesTooltip')}
            />
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                ☕ {t('baristaFire.partTimeWork')}
              </h3>
              <CurrencyInput
                label={t('baristaFire.partTimeAnnualIncome')}
                value={params.partTimeIncome}
                onChange={(v) => setParam('partTimeIncome', v)}
                tooltip={t('baristaFire.partTimeIncomeTooltip')}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {t('baristaFire.partTimeTip')}
              </p>
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
              min={0.02}
              max={0.06}
            />
          </CardContent>
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Comparison Banner */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-amber-700 dark:text-amber-300">{t('baristaFire.portfolioSavings')}</p>
                <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                  {formatCurrency(portfolioReduction)} {t('baristaFire.lessNeeded')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-amber-700 dark:text-amber-300">{t('baristaFire.reduction')}</p>
                <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                  {reductionPercent.toFixed(0)}%
                </p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              label={t('baristaFire.baristaFireNumber')}
              value={results.baristaNumber}
              format="currency"
              highlight
              subtext={t('output.targetPortfolioValue')}
            />
            <ResultCard
              label={t('baristaFire.fullFireNumber')}
              value={results.fullFireNumber}
              format="currency"
              subtext={t('baristaFire.withoutPartTimeWork')}
            />
            <ResultCard
              label={t('baristaFire.yearsToBaristaFire')}
              value={results.yearsToBaristaFIRE}
              format="years"
              icon="⏱️"
              subtext={`At age ${Math.round(params.currentAge + results.yearsToBaristaFIRE)}`}
            />
          </div>

          {/* Income Breakdown */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Income Breakdown in Barista FIRE</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Portfolio Withdrawals</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(params.annualExpenses - params.partTimeIncome)}/year
                      </span>
                    </div>
                    <div className="h-3 bg-amber-100 dark:bg-amber-900/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500"
                        style={{ width: `${((params.annualExpenses - params.partTimeIncome) / params.annualExpenses) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Part-Time Income</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(params.partTimeIncome)}/year
                      </span>
                    </div>
                    <div className="h-3 bg-green-100 dark:bg-green-900/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500"
                        style={{ width: `${(params.partTimeIncome / params.annualExpenses) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900 dark:text-gray-100">Total Annual Income</span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">{formatCurrency(params.annualExpenses)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('common.portfolioProjection')}</h2>
            </CardHeader>
            <CardContent>
              <ProjectionChart
                data={results.projections}
                fireNumber={results.baristaNumber}
                colorScheme="amber"
                height={350}
              />
            </CardContent>
          </Card>

          {/* {t('baristaFire.benefitsTitle')} */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('baristaFire.benefitsTitle')}</h2>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <span className="text-xl">🏥</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{t('baristaFire.benefits.healthInsurance.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('baristaFire.benefits.healthInsurance.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">🤝</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{t('baristaFire.benefits.socialConnection.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('baristaFire.benefits.socialConnection.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">⚡</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{t('baristaFire.benefits.earlierFreedom.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('baristaFire.benefits.earlierFreedom.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">🎯</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{t('baristaFire.benefits.lowerTarget.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Need {reductionPercent.toFixed(0)}% less in your portfolio</p>
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
