import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useCalculatorParams } from '../hooks/useCalculatorParams'
import { formatCurrency, generateProjections } from '../utils/calculations'
import { exportToExcel, prepareInputsForExport, prepareResultsForExport } from '../utils/excelExport'
import { CurrencyInput, PercentageInput, AgeInput } from '../components/inputs'
import { Card, CardHeader, CardContent, ResultCard, UrlActions, Disclaimer, ExportButton } from '../components/ui'
import ProgressToFIRE from '../components/ui/ProgressToFIRE'
import { ProjectionChart } from '../components/charts'
import SEO from '../components/SEO'
import { calculatorSEO } from '../config/seo'

// Calculate required monthly savings to reach FIRE by target age
function calculateReverseFIRE(
  currentAge: number,
  targetRetirementAge: number,
  currentSavings: number,
  annualExpenses: number,
  expectedReturn: number,
  inflationRate: number,
  withdrawalRate: number
) {
  const yearsToFIRE = Math.max(1, targetRetirementAge - currentAge)
  const fireNumber = annualExpenses / withdrawalRate
  
  // Real return
  const realReturn = (1 + expectedReturn) / (1 + inflationRate) - 1
  
  // Calculate required annual savings using future value formula
  // FV = PV(1+r)^n + PMT * (((1+r)^n - 1) / r)
  // Solve for PMT: PMT = (FV - PV(1+r)^n) * r / ((1+r)^n - 1)
  
  const compoundFactor = Math.pow(1 + realReturn, yearsToFIRE)
  const futureValueOfCurrent = currentSavings * compoundFactor
  
  let requiredAnnualSavings = 0
  if (futureValueOfCurrent >= fireNumber) {
    // Already have enough, no savings needed
    requiredAnnualSavings = 0
  } else if (realReturn === 0) {
    requiredAnnualSavings = (fireNumber - currentSavings) / yearsToFIRE
  } else {
    const deficit = fireNumber - futureValueOfCurrent
    requiredAnnualSavings = deficit * realReturn / (compoundFactor - 1)
  }
  
  const requiredMonthlySavings = requiredAnnualSavings / 12
  
  // Generate projections with required savings
  const projections = generateProjections(
    currentAge,
    currentSavings,
    requiredAnnualSavings,
    expectedReturn,
    inflationRate,
    yearsToFIRE + 10
  )
  
  // Check if already achievable
  const alreadyAchievable = futureValueOfCurrent >= fireNumber
  
  return {
    fireNumber,
    yearsToFIRE,
    requiredAnnualSavings: Math.max(0, requiredAnnualSavings),
    requiredMonthlySavings: Math.max(0, requiredMonthlySavings),
    projections,
    alreadyAchievable,
    currentWillGrowTo: Math.round(futureValueOfCurrent),
  }
}

export default function ReverseFIRE() {
  const { t } = useTranslation()
  const { params, setParam, resetParams, copyUrl, hasCustomParams } = useCalculatorParams()

  const results = useMemo(() => {
    return calculateReverseFIRE(
      params.currentAge,
      params.retirementAge,
      params.currentSavings,
      params.annualExpenses,
      params.expectedReturn,
      params.inflationRate,
      params.withdrawalRate
    )
  }, [params])

  const handleExport = () => {
    const { values: inputValues, formats: inputFormats } = prepareInputsForExport({
      currentAge: params.currentAge,
      targetRetirementAge: params.retirementAge,
      currentSavings: params.currentSavings,
      annualExpenses: params.annualExpenses,
      expectedReturn: params.expectedReturn,
      inflationRate: params.inflationRate,
      withdrawalRate: params.withdrawalRate,
    })

    const { values: resultValues, formats: resultFormats } = prepareResultsForExport(results)

    // Define formulas for calculated results
    const resultFormulas: Record<string, string> = {
      // FIRE Number = Annual Expenses / Withdrawal Rate
      fireNumber: '{annualExpenses}/{withdrawalRate}',
    }

    exportToExcel({
      calculatorName: 'Reverse FIRE',
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
      <SEO {...calculatorSEO.reverse} />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
              <span className="text-3xl" role="img" aria-label="Recycle emoji">🔄</span>
              {t('reverseFire.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t('reverseFire.subtitle')}
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

      {/* Explanation Banner */}
      <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-xl p-4">
        <div className="flex gap-3">
          <span className="text-2xl">🔄</span>
          <div>
            <h3 className="font-semibold text-teal-900 dark:text-teal-100">How Reverse FIRE Works</h3>
            <p className="text-sm text-teal-700 dark:text-teal-300 mt-1">
              {t('reverseFire.howWorks.content')}
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('common.yourGoals')}</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <AgeInput
              label={t('input.currentAge')}
              value={params.currentAge}
              onChange={(v) => setParam('currentAge', v)}
            />
            <AgeInput
              label={t('reverseFire.targetFireAge')}
              value={params.retirementAge}
              onChange={(v) => setParam('retirementAge', v)}
              tooltip={t('reverseFire.targetFireAgeTooltip')}
              min={params.currentAge + 1}
            />
            <CurrencyInput
              label="{t('reverseFire.currentSavingsLabel')}"
              value={params.currentSavings}
              onChange={(v) => setParam('currentSavings', v)}
            />
            <CurrencyInput
              label={t('reverseFire.annualExpensesInRetirement')}
              value={params.annualExpenses}
              onChange={(v) => setParam('annualExpenses', v)}
            />
            <PercentageInput
              label="{t('reverseFire.expectedReturnLabel')}"
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
          {/* Main Result */}
          {results.alreadyAchievable ? (
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-green-100 text-sm">{t('reverseFire.greatNews')}</p>
                  <p className="text-2xl font-bold">{t('reverseFire.alreadyOnTrack')}</p>
                  <p className="text-green-100 mt-1">
                    {t('reverseFire.onTrackDesc', { savings: formatCurrency(params.currentSavings), willGrow: formatCurrency(results.currentWillGrowTo), targetAge: params.retirementAge, fireNumber: formatCurrency(results.fireNumber) })}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-teal-100 text-sm">{t('reverseFire.toFireByAgeYouNeed', { targetAge: params.retirementAge })}</p>
                  <p className="text-5xl font-bold">{formatCurrency(results.requiredMonthlySavings)}</p>
                  <p className="text-teal-200 text-lg">{t('reverseFire.perMonth')}</p>
                </div>
                <div className="text-right">
                  <p className="text-teal-100 text-sm">{t('reverseFire.orAnnually')}</p>
                  <p className="text-3xl font-bold">{formatCurrency(results.requiredAnnualSavings)}</p>
                  <p className="text-teal-200 text-sm">{t('reverseFire.perYear')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Key Metrics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              label={t('reverseFire.fireNumber')}
              value={results.fireNumber}
              format="currency"
              highlight
              subtext={t('reverseFire.targetPortfolio')}
            />
            <ResultCard
              label="{t('reverseFire.yearsToFireLabel')}"
              value={results.yearsToFIRE}
              format="years"
              subtext={`At age ${params.retirementAge}`}
            />
            <ResultCard
              label={t('reverseFire.currentSavingsWillGrowTo')}
              value={results.currentWillGrowTo}
              format="currency"
              subtext={`By age ${params.retirementAge}`}
            />
          </div>

          {/* Scenario Comparison */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('reverseFire.differentTargetAges')}</h2>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">{t('reverseFire.targetAge')}</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">{t('reverseFire.yearsAway')}</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">{t('reverseFire.monthlySavings')}</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">{t('reverseFire.annualSavings')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[40, 45, 50, 55, 60, 65].filter(age => age > params.currentAge).map((targetAge) => {
                      const calc = calculateReverseFIRE(
                        params.currentAge,
                        targetAge,
                        params.currentSavings,
                        params.annualExpenses,
                        params.expectedReturn,
                        params.inflationRate,
                        params.withdrawalRate
                      )
                      return (
                        <tr 
                          key={targetAge}
                          className={`border-b border-gray-100 dark:border-gray-800 ${
                            targetAge === params.retirementAge ? 'bg-teal-50 dark:bg-teal-900/20' : ''
                          }`}
                        >
                          <td className="py-2 px-3 font-medium text-gray-900 dark:text-gray-100">
                            Age {targetAge}
                            {targetAge === params.retirementAge && (
                              <span className="ml-2 text-xs bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded">
                                {t('reverseFire.selected')}
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{targetAge - params.currentAge} years</td>
                          <td className="py-2 px-3 text-gray-900 dark:text-gray-100 font-medium">
                            {calc.alreadyAchievable ? (
                              <span className="text-green-600 dark:text-green-400">{t('reverseFire.onTrack')}</span>
                            ) : (
                              formatCurrency(calc.requiredMonthlySavings)
                            )}
                          </td>
                          <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                            {calc.alreadyAchievable ? '-' : formatCurrency(calc.requiredAnnualSavings)}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
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
                fireNumber={results.fireNumber}
                colorScheme="blue"
                height={350}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Disclaimer />
    </div>
    </>
  )
}
