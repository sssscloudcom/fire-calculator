import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useCalculatorParams } from '../hooks/useCalculatorParams'
import { calculateWithdrawal, formatCurrency } from '../utils/calculations'
import { exportToExcel, prepareInputsForExport, prepareResultsForExport } from '../utils/excelExport'
import { CurrencyInput, PercentageInput, InputGroup } from '../components/inputs'
import { Card, CardHeader, CardContent, ResultCard, UrlActions, Disclaimer, ExportButton } from '../components/ui'
import { WithdrawalChart } from '../components/charts'
import SEO from '../components/SEO'
import { calculatorSEO } from '../config/seo'

export default function WithdrawalRate() {
  const { t } = useTranslation()
  const { params, setParam, resetParams, copyUrl, hasCustomParams } = useCalculatorParams()

  const results = useMemo(() => {
    return calculateWithdrawal(
      params.portfolioValue,
      params.withdrawalRate,
      params.expectedReturn,
      params.inflationRate,
      params.retirementYears
    )
  }, [params])

  const handleExport = () => {
    const { values: inputValues, formats: inputFormats } = prepareInputsForExport({
      portfolioValue: params.portfolioValue,
      withdrawalRate: params.withdrawalRate,
      expectedReturn: params.expectedReturn,
      inflationRate: params.inflationRate,
      retirementYears: params.retirementYears,
    })

    const { values: resultValues, formats: resultFormats } = prepareResultsForExport(results)

    // Define formulas for calculated results
    const resultFormulas: Record<string, string> = {
      // Annual Withdrawal = Portfolio Value * Withdrawal Rate
      annualWithdrawal: '{portfolioValue}*{withdrawalRate}',
      // Monthly Withdrawal = Annual Withdrawal / 12
      monthlyWithdrawal: '({portfolioValue}*{withdrawalRate})/12',
    }

    exportToExcel({
      calculatorName: 'Withdrawal Rate Calculator',
      inputs: inputValues,
      results: resultValues,
      projections: results.withdrawalProjections,
      additionalSheets: [{
        name: 'Rate Analysis',
        data: results.rateAnalysis,
      }],
      inputFormats,
      resultFormats,
      resultFormulas,
    })
  }

  const getSuccessColor = (rate: number) => {
    const analysis = results.rateAnalysis.find(a => a.rate === rate)
    if (!analysis) return 'text-gray-600'
    if (analysis.years >= params.retirementYears) return 'text-green-600 dark:text-green-400'
    if (analysis.years >= params.retirementYears * 0.8) return 'text-amber-600 dark:text-amber-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <>
      <SEO {...calculatorSEO.withdrawal} />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
              <span className="text-3xl" role="img" aria-label="Chart emoji">📊</span>
              {t('withdrawalRate.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t('withdrawalRate.subtitle')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ExportButton onExport={handleExport} />
            <UrlActions onReset={resetParams} onCopy={copyUrl} hasCustomParams={hasCustomParams} />
        </div>
      </div>

      {/* 4% Rule Explanation Banner */}
      <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-xl p-4">
        <div className="flex gap-3">
          <span className="text-2xl">📚</span>
          <div>
            <h3 className="font-semibold text-sky-900 dark:text-sky-100">The 4% Rule</h3>
            <p className="text-sm text-sky-700 dark:text-sky-300 mt-1">
              {t('withdrawalRate.fourPercentRule.content')}
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('common.yourPortfolio')}</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <CurrencyInput
              label="{t('withdrawalRate.portfolioValueLabel')}"
              value={params.portfolioValue}
              onChange={(v) => setParam('portfolioValue', v)}
              tooltip={t('withdrawalRate.portfolioValueTooltip')}
            />
            <PercentageInput
              label="{t('withdrawalRate.withdrawalRateLabel')}"
              value={params.withdrawalRate}
              onChange={(v) => setParam('withdrawalRate', v)}
              tooltip={t('withdrawalRate.withdrawalRateTooltip')}
              min={0.02}
              max={0.08}
              step={0.005}
            />
            <InputGroup
              label={t('withdrawalRate.retirementDuration')}
              value={params.retirementYears}
              onChange={(v) => setParam('retirementYears', v)}
              tooltip={t('withdrawalRate.retirementDurationTooltip')}
              suffix="years"
              min={10}
              max={60}
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
          </CardContent>
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ResultCard
              label={t('withdrawalRate.annualWithdrawalLabel')}
              value={results.annualWithdrawal}
              format="currency"
              highlight
            />
            <ResultCard
              label={t('withdrawalRate.rateAnalysis.monthly')}
              value={results.monthlyWithdrawal}
              format="currency"
            />
            <ResultCard
              label={t('withdrawalRate.rateAnalysis.portfolioLasts')}
              value={results.portfolioLongevity}
              format="years"
              subtext={results.portfolioLongevity >= params.retirementYears ? t('withdrawalRate.rateAnalysis.sustainable') : t('withdrawalRate.rateAnalysis.tooHigh')}
            />
            <ResultCard
              label={t('withdrawalRate.rateAnalysis.status')}
              value={results.successRate}
              format="percent"
              subtext={results.successRate >= 1 ? t('output.good') : t('output.risky')}
            />
          </div>

          {/* Chart */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('withdrawalRate.portfolioBalanceOverTime')}</h2>
            </CardHeader>
            <CardContent>
              <WithdrawalChart
                data={results.withdrawalProjections}
                height={300}
              />
            </CardContent>
          </Card>

          {/* Rate Analysis Table */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('withdrawalRate.withdrawalRateLabel')} Analysis</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {t('withdrawalRate.rateAnalysis.desc', { portfolioValue: formatCurrency(params.portfolioValue) })}
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">{t('withdrawalRate.rateAnalysis.rate')}</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">{t('withdrawalRate.rateAnalysis.annualWithdrawal')}</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">{t('withdrawalRate.rateAnalysis.monthly')}</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">{t('withdrawalRate.rateAnalysis.portfolioLasts')}</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">{t('withdrawalRate.rateAnalysis.status')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.rateAnalysis.map((analysis) => {
                      const annualWithdrawal = params.portfolioValue * analysis.rate
                      const meetsGoal = analysis.years >= params.retirementYears
                      return (
                        <tr 
                          key={analysis.rate} 
                          className={`border-b border-gray-100 dark:border-gray-800 ${
                            analysis.rate === params.withdrawalRate ? 'bg-sky-50 dark:bg-sky-900/20' : ''
                          }`}
                        >
                          <td className="py-3 px-4">
                            <span className={`font-medium ${getSuccessColor(analysis.rate)}`}>
                              {(analysis.rate * 100).toFixed(1)}%
                            </span>
                            {analysis.rate === params.withdrawalRate && (
                              <span className="ml-2 text-xs bg-sky-100 dark:bg-sky-800 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded">
                                {t('reverseFire.selected')}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                            {formatCurrency(annualWithdrawal)}
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                            {formatCurrency(annualWithdrawal / 12)}
                          </td>
                          <td className="py-3 px-4">
                            <span className={getSuccessColor(analysis.rate)}>
                              {analysis.years >= 50 ? '50+ years' : `${analysis.years} years`}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {meetsGoal ? (
                              <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {t('withdrawalRate.rateAnalysis.sustainable')}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                {t('withdrawalRate.rateAnalysis.tooHigh')}
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('withdrawalRate.recommendations.title')}</h2>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none text-sm">
              {results.portfolioLongevity >= params.retirementYears ? (
                <div className="flex gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-xl">✅</span>
                  <p className="text-green-800 dark:text-green-200 m-0">
                    {t('withdrawalRate.recommendations.sustainable.content', {
                      rate: (params.withdrawalRate * 100).toFixed(1),
                      portfolioValue: formatCurrency(params.portfolioValue),
                      longevity: results.portfolioLongevity,
                      retirementYears: params.retirementYears
                    })}
                  </p>
                </div>
              ) : (
                <div className="flex gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <span className="text-xl">⚠️</span>
                  <p className="text-amber-800 dark:text-amber-200 m-0">
                    {t('withdrawalRate.recommendations.considerLowering.content', {
                      rate: (params.withdrawalRate * 100).toFixed(1),
                      longevity: results.portfolioLongevity
                    })}
                  </p>
                </div>
              )}
              
              <div className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
                <p>
                  {t('withdrawalRate.recommendations.earlyRetirees')}
                </p>
                <p>
                  {t('withdrawalRate.recommendations.flexibleSpending')}
                </p>
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
