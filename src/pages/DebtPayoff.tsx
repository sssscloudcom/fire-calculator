import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useCalculatorParams } from '../hooks/useCalculatorParams'
import { 
  calculateSnowballPayoff, 
  calculateAvalanchePayoff, 
  formatCurrency,
} from '../utils/calculations'
import { exportToExcel, prepareInputsForExport, prepareResultsForExport } from '../utils/excelExport'
import type { DebtItem } from '../utils/calculations'
import { CurrencyInput } from '../components/inputs'
import DebtListInput from '../components/inputs/DebtListInput'
import { Card, CardHeader, CardContent, ResultCard, UrlActions, Disclaimer, ExportButton } from '../components/ui'
import DebtBalanceChart from '../components/charts/DebtBalanceChart'
import DebtBreakdownChart from '../components/charts/DebtBreakdownChart'
import SEO from '../components/SEO'
import { calculatorSEO } from '../config/seo'

export default function DebtPayoff() {
  const { t } = useTranslation()
  const { params, resetParams, copyUrl, hasCustomParams } = useCalculatorParams()
  
  // Local state for debts (will sync with URL params)
  const [debts, setDebts] = useState<DebtItem[]>(params.debts || [])
  const [mode, setMode] = useState<'fixed' | 'target'>(params.debtMode || 'fixed')
  const [strategy, setStrategy] = useState<'snowball' | 'avalanche'>(params.debtStrategy || 'snowball')
  const [monthlyBudget, setMonthlyBudget] = useState(params.debtBudget || 1000)
  const [targetMonths, setTargetMonths] = useState(params.debtMonths || 36)
  const [extraPayment, setExtraPayment] = useState(params.debtExtra || 0)

  // Calculate results
  const results = useMemo(() => {
    if (debts.length === 0 || debts.some(d => d.balance <= 0)) {
      return null
    }

    const totalMinPayments = debts.reduce((sum, d) => sum + d.minPayment, 0)
    
    if (mode === 'fixed' && monthlyBudget < totalMinPayments) {
      return null // Can't afford minimum payments
    }

    const baseResult = strategy === 'snowball'
      ? calculateSnowballPayoff(debts, monthlyBudget, 0)
      : calculateAvalanchePayoff(debts, monthlyBudget, 0)

    const withExtraResult = extraPayment > 0
      ? (strategy === 'snowball'
          ? calculateSnowballPayoff(debts, monthlyBudget, extraPayment)
          : calculateAvalanchePayoff(debts, monthlyBudget, extraPayment))
      : null

    return { base: baseResult, withExtra: withExtraResult }
  }, [debts, mode, monthlyBudget, targetMonths, strategy, extraPayment])

  const comparisonResults = useMemo(() => {
    if (debts.length === 0 || debts.some(d => d.balance <= 0)) {
      return null
    }

    const totalMinPayments = debts.reduce((sum, d) => sum + d.minPayment, 0)
    if (monthlyBudget < totalMinPayments) return null

    const snowball = calculateSnowballPayoff(debts, monthlyBudget, extraPayment)
    const avalanche = calculateAvalanchePayoff(debts, monthlyBudget, extraPayment)

    return { snowball, avalanche }
  }, [debts, monthlyBudget, extraPayment])

  const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0)
  const totalMinPayments = debts.reduce((sum, d) => sum + d.minPayment, 0)
  const canCalculate = debts.length > 0 && totalDebt > 0 && monthlyBudget >= totalMinPayments

  const extraPaymentSavings = useMemo(() => {
    if (!results?.base || !results?.withExtra) return null
    
    const monthsSaved = results.base.totalMonths - results.withExtra.totalMonths
    const interestSaved = results.base.totalInterest - results.withExtra.totalInterest
    
    return { monthsSaved, interestSaved }
  }, [results])

  const handleExport = () => {
    if (!results?.base) return

    const { values: inputValues, formats: inputFormats } = prepareInputsForExport({
      strategy,
      mode,
      monthlyBudget,
      targetMonths,
      extraPayment,
      totalDebts: debts.length,
      totalDebt,
    })

    const baseResults = results.base
    const { values: resultValues, formats: resultFormats } = prepareResultsForExport(baseResults)

    const additionalSheets = []

    // Add debt list (keep formatted for display)
    if (debts.length > 0) {
      additionalSheets.push({
        name: 'Debt List',
        data: debts.map(d => ({
          name: d.name,
          balance: d.balance,
          rate: d.rate,
          minPayment: d.minPayment,
        })),
      })
    }

    // Add payoff projections
    if (baseResults.projections) {
      additionalSheets.push({
        name: 'Payoff Projections',
        data: baseResults.projections,
      })
    }

    // Note: Debt payoff calculations are complex iterative algorithms,
    // so we don't provide formulas for the results
    exportToExcel({
      calculatorName: 'Debt Payoff',
      inputs: inputValues,
      results: resultValues,
      additionalSheets,
      inputFormats,
      resultFormats,
    })
  }

  return (
    <>
      <SEO {...calculatorSEO['debt-payoff']} />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
              <span className="text-3xl" role="img" aria-label="Credit card emoji">💳</span>
              {t('debtPayoff.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t('debtPayoff.subtitle')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ExportButton onExport={handleExport} disabled={!canCalculate} />
            <UrlActions onReset={resetParams} onCopy={copyUrl} hasCustomParams={hasCustomParams} />
          </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">💪</span>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {t('debtPayoff.twoMethodsTitle')}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>{t('debtPayoff.snowballLabel')}</strong> {t('debtPayoff.snowballDesc')} 
              <strong className="ml-2">{t('debtPayoff.avalancheLabel')}</strong> {t('debtPayoff.avalancheDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setMode('fixed')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              mode === 'fixed'
                ? 'bg-white dark:bg-gray-700 text-fire-700 dark:text-fire-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            Fixed Budget
          </button>
          <button
            onClick={() => setMode('target')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              mode === 'target'
                ? 'bg-white dark:bg-gray-700 text-fire-700 dark:text-fire-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            {t('debtPayoff.targetTimeline')}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('debtPayoff.debtInfoTitle')}</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <DebtListInput debts={debts} onChange={setDebts} />

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              {mode === 'fixed' ? (
                <>
                  <CurrencyInput
                    label={t('debtPayoff.totalMonthlyBudget')}
                    value={monthlyBudget}
                    onChange={setMonthlyBudget}
                    tooltip={t('debtPayoff.totalMonthlyBudgetTooltip')}
                    min={totalMinPayments}
                    showInvalidState={true}
                  />
                  {monthlyBudget < totalMinPayments && totalMinPayments > 0 && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                      {t('debtPayoff.budgetMustBeAtLeast', { minPayments: totalMinPayments.toFixed(0) })}
                    </p>
                  )}
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('debtPayoff.targetPayoffTimeline')}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={targetMonths}
                      onChange={(e) => setTargetMonths(Number(e.target.value))}
                      min={1}
                      max={360}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fire-500 focus:border-transparent text-gray-900 dark:text-gray-100"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('output.months')}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {(targetMonths / 12).toFixed(1)} {t('output.years')}
                  </p>
                </div>
              )}

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('debtPayoff.extraMonthlyPayment', { amount: extraPayment })}
                </label>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  step={25}
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-fire-600"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>$0</span>
                  <span>$1,000</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {!canCalculate ? (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-4xl mb-3">📝</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t('debtPayoff.addDebtsToStart.title')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('debtPayoff.addDebtsToStart.desc')}
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Strategy Toggle */}
              <div className="flex justify-center">
                <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setStrategy('snowball')}
                    className={`px-6 py-2 rounded-md font-medium transition-colors ${
                      strategy === 'snowball'
                        ? 'bg-white dark:bg-gray-700 text-fire-700 dark:text-fire-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    💪 {t('debtPayoff.snowballMethod')}
                  </button>
                  <button
                    onClick={() => setStrategy('avalanche')}
                    className={`px-6 py-2 rounded-md font-medium transition-colors ${
                      strategy === 'avalanche'
                        ? 'bg-white dark:bg-gray-700 text-fire-700 dark:text-fire-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    🎯 {t('debtPayoff.avalancheMethod')}
                  </button>
                </div>
              </div>

              {/* Strategy Explanation Card */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  {strategy === 'snowball' ? (
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">💪</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {t('debtPayoff.snowballMethod')}
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {t('debtPayoff.snowballDesc')}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">🎯</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {t('debtPayoff.avalancheMethod')}
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {t('debtPayoff.avalancheDesc')}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Key Results */}
              <div className="grid sm:grid-cols-3 gap-4">
                <ResultCard
                  label={t('debtPayoff.debtFreeIn')}
                  value={`${results?.base.totalMonths || 0} months`}
                  subtext={`${((results?.base.totalMonths || 0) / 12).toFixed(1)} years`}
                  icon="🎯"
                />
                <ResultCard
                  label={t('debtPayoff.totalInterest')}
                  value={formatCurrency(results?.base.totalInterest || 0)}
                  subtext={t('debtPayoff.plusPrincipal', { principal: formatCurrency(totalDebt) })}
                  icon="💰"
                />
                <ResultCard
                  label={t('debtPayoff.monthlyPayment')}
                  value={formatCurrency(monthlyBudget + extraPayment)}
                  subtext={t('debtPayoff.basePlusExtra', { base: formatCurrency(monthlyBudget), extra: formatCurrency(extraPayment) })}
                  icon="📅"
                />
              </div>

              {/* {t('debtPayoff.extraPaymentLabel')} Impact */}
              {extraPaymentSavings && (
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      💡 {t('debtPayoff.extraPaymentLabel')} Impact
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('debtPayoff.extraPaymentLabel')}</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {formatCurrency(extraPayment)}/mo
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('debtPayoff.timeSavedLabel')}</div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {extraPaymentSavings.monthsSaved} months
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('debtPayoff.interestSavedLabel')}</div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(extraPaymentSavings.interestSaved)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Payoff Order */}
              {results?.base.payoffOrder && results.base.payoffOrder.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {t('debtPayoff.payoffOrder')}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {results.base.payoffOrder.map((debtName, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-fire-100 dark:bg-fire-900/30 text-fire-700 dark:text-fire-400 rounded-full flex items-center justify-center font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-gray-100">
                              {debtName}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {t('debtPayoff.paidOffInMonth', { month: results.base.debtMilestones.find(m => m.debtName === debtName)?.month })}
                            </div>
                          </div>
                          <div className="text-green-600 dark:text-green-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Charts */}
              {results?.base && (
                <>
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {t('debtPayoff.debtPayoffTimeline')}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <DebtBalanceChart
                        data={results.base.projections}
                        milestones={results.base.debtMilestones}
                        comparisonData={results.withExtra?.projections}
                        height={350}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {t('debtPayoff.paymentBreakdown')}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <DebtBreakdownChart
                        data={results.base.projections}
                        height={350}
                      />
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              {t('debtPayoff.totalPrincipal')}
                            </div>
                            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                              {formatCurrency(results.base.totalPrincipal)}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              {t('debtPayoff.totalInterestPaid')}
                            </div>
                            <div className="text-xl font-bold text-red-600 dark:text-red-400">
                              {formatCurrency(results.base.totalInterest)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Strategy Comparison */}
              {comparisonResults && (
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      📊 {t('debtPayoff.snowballVsAvalanche.title')}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">💪</span>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{t('debtPayoff.snowballMethod')}</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">{t('debtPayoff.snowballVsAvalanche.payoffTime')}:</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {comparisonResults.snowball.totalMonths} {t('output.months')}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">{t('debtPayoff.snowballVsAvalanche.totalInterest')}:</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {formatCurrency(comparisonResults.snowball.totalInterest)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">🎯</span>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{t('debtPayoff.avalancheMethod')}</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">{t('debtPayoff.snowballVsAvalanche.payoffTime')}:</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {comparisonResults.avalanche.totalMonths} {t('output.months')}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">{t('debtPayoff.snowballVsAvalanche.totalInterest')}:</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {formatCurrency(comparisonResults.avalanche.totalInterest)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {t('debtPayoff.snowballVsAvalanche.winner', {
                          method: comparisonResults.avalanche.totalInterest < comparisonResults.snowball.totalInterest ? t('debtPayoff.avalancheMethod') : t('debtPayoff.snowballMethod'),
                          savings: formatCurrency(Math.abs(comparisonResults.snowball.totalInterest - comparisonResults.avalanche.totalInterest)),
                          monthsDiff: Math.abs(comparisonResults.snowball.totalMonths - comparisonResults.avalanche.totalMonths),
                          direction: comparisonResults.avalanche.totalMonths < comparisonResults.snowball.totalMonths ? t('debtPayoff.faster') : t('debtPayoff.slower')
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>

      <Disclaimer />
    </div>
    </>
  )
}
