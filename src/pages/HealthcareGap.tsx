import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useCalculatorParams } from '../hooks/useCalculatorParams'
import { formatCurrency } from '../utils/calculations'
import { exportToExcel, prepareInputsForExport, prepareResultsForExport } from '../utils/excelExport'
import { AgeInput, CurrencyInput } from '../components/inputs'
import { Card, CardHeader, CardContent, ResultCard, UrlActions, Disclaimer, ExportButton } from '../components/ui'
import SEO from '../components/SEO'
import { calculatorSEO } from '../config/seo'

// Healthcare cost estimates by age (annual, US average) - for future use
// const HEALTHCARE_COSTS = {
//   under40: { min: 4000, avg: 6000, max: 10000 },
//   '40-49': { min: 5500, avg: 8000, max: 13000 },
//   '50-54': { min: 7000, avg: 10000, max: 16000 },
//   '55-59': { min: 9000, avg: 13000, max: 20000 },
//   '60-64': { min: 12000, avg: 17000, max: 25000 },
// }

function calculateHealthcareGap(
  currentAge: number,
  earlyRetirementAge: number,
  medicareAge: number,
  monthlyPremium: number,
  annualDeductible: number,
  annualOutOfPocket: number,
  inflationRate: number
) {
  const gapYears = Math.max(0, medicareAge - earlyRetirementAge)
  
  // Annual healthcare cost
  const annualCost = (monthlyPremium * 12) + annualDeductible + annualOutOfPocket
  
  // Calculate total cost with inflation
  let totalCost = 0
  const yearlyBreakdown = []
  
  for (let i = 0; i < gapYears; i++) {
    const age = earlyRetirementAge + i
    const yearCost = annualCost * Math.pow(1 + inflationRate, i)
    totalCost += yearCost
    yearlyBreakdown.push({
      age,
      year: new Date().getFullYear() + (earlyRetirementAge - currentAge) + i,
      cost: Math.round(yearCost),
      premium: Math.round(monthlyPremium * 12 * Math.pow(1 + inflationRate, i)),
      deductible: Math.round(annualDeductible * Math.pow(1 + inflationRate, i)),
      outOfPocket: Math.round(annualOutOfPocket * Math.pow(1 + inflationRate, i)),
    })
  }
  
  // ACA subsidy estimates (simplified)
  const calculateSubsidy = (income: number) => {
    // Very simplified - actual ACA subsidies are complex
    if (income < 30000) return annualCost * 0.7 // ~70% subsidy
    if (income < 50000) return annualCost * 0.5 // ~50% subsidy
    if (income < 75000) return annualCost * 0.3 // ~30% subsidy
    if (income < 100000) return annualCost * 0.15 // ~15% subsidy
    return 0
  }
  
  return {
    gapYears,
    annualCost,
    totalCost: Math.round(totalCost),
    avgAnnualCost: gapYears > 0 ? Math.round(totalCost / gapYears) : 0,
    yearlyBreakdown,
    estimatedSubsidy30k: Math.round(calculateSubsidy(30000)),
    estimatedSubsidy50k: Math.round(calculateSubsidy(50000)),
    estimatedSubsidy75k: Math.round(calculateSubsidy(75000)),
  }
}

export default function HealthcareGap() {
  const { t } = useTranslation()
  const { params, setParam, resetParams, copyUrl, hasCustomParams } = useCalculatorParams()
  
  // Healthcare-specific params with configurable defaults
  const [monthlyPremium, setMonthlyPremium] = useState(600) // Default ACA silver plan
  const [annualDeductible, setAnnualDeductible] = useState(2500)
  const [annualOutOfPocket, setAnnualOutOfPocket] = useState(2000)
  const medicareAge = 65

  const results = useMemo(() => {
    return calculateHealthcareGap(
      params.currentAge,
      params.retirementAge,
      medicareAge,
      monthlyPremium,
      annualDeductible,
      annualOutOfPocket,
      params.inflationRate
    )
  }, [params, monthlyPremium, annualDeductible, annualOutOfPocket])

  const handleExport = () => {
    const { values: inputValues, formats: inputFormats } = prepareInputsForExport({
      currentAge: params.currentAge,
      earlyRetirementAge: params.retirementAge,
      medicareAge,
      monthlyPremium,
      annualDeductible,
      annualOutOfPocket,
      inflationRate: params.inflationRate,
    })

    const { values: resultValues, formats: resultFormats } = prepareResultsForExport(results)

    // Define formulas for calculated results
    const resultFormulas: Record<string, string> = {
      // Years in Gap = Medicare Age - Early Retirement Age
      yearsInGap: '{medicareAge}-{earlyRetirementAge}',
      // Annual Base Cost = (Monthly Premium * 12) + Annual Deductible + Annual Out of Pocket
      annualBaseCost: '({monthlyPremium}*12)+{annualDeductible}+{annualOutOfPocket}',
    }

    exportToExcel({
      calculatorName: 'Healthcare Gap',
      inputs: inputValues,
      results: resultValues,
      projections: results.yearlyBreakdown,
      inputFormats,
      resultFormats,
      resultFormulas,
    })
  }

  return (
    <>
      <SEO {...calculatorSEO.healthcare} />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
              <span className="text-3xl" role="img" aria-label="Hospital emoji">🏥</span>
              {t('healthcareGap.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t('healthcareGap.subtitle')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ExportButton onExport={handleExport} />
            <UrlActions onReset={resetParams} onCopy={copyUrl} hasCustomParams={hasCustomParams} />
          </div>
        </div>

      {/* Warning Banner */}
      <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl p-4">
        <div className="flex gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="font-semibold text-rose-900 dark:text-rose-100">{t('healthcareGap.whatIs.title')}</h3>
            <p className="text-sm text-rose-700 dark:text-rose-300 mt-1">
              {t('healthcareGap.warning.content', { cost: formatCurrency(results.totalCost) })}
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('healthcareGap.yourSituation')}</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <AgeInput
              label={t('input.currentAge')}
              value={params.currentAge}
              onChange={(v) => setParam('currentAge', v)}
            />
            <AgeInput
              label={t('healthcareGap.earlyRetirementAge')}
              value={params.retirementAge}
              onChange={(v) => setParam('retirementAge', v)}
              tooltip={t('healthcareGap.earlyRetirementAgeTooltip')}
              max={64}
            />
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('healthcareGap.medicareEligibility')}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {t('healthcareGap.gapToCover', { years: results.gapYears })}
              </p>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                {t('healthcareGap.healthcareCostEstimates')}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                {t('healthcareGap.healthcareCostEstimatesNote')}
              </p>
              <div className="space-y-3">
                <CurrencyInput
                  label={t('healthcareGap.monthlyPremium')}
                  value={monthlyPremium}
                  onChange={setMonthlyPremium}
                  tooltip={t('healthcareGap.monthlyPremiumTooltip')}
                  max={3000}
                />
                <CurrencyInput
              label={t('healthcareGap.annualDeductible')}
                  value={annualDeductible}
                  onChange={setAnnualDeductible}
                  tooltip={t('healthcareGap.annualDeductibleTooltip')}
                  max={20000}
                />
                <CurrencyInput
                  label={t('healthcareGap.estOutOfPocket')}
                  value={annualOutOfPocket}
                  onChange={setAnnualOutOfPocket}
                  tooltip={t('healthcareGap.annualOutOfPocketTooltip')}
                  max={20000}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Total Cost Highlight */}
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-rose-100 text-sm">{t('healthcareGap.totalCostLabel')}</p>
                <p className="text-5xl font-bold">{formatCurrency(results.totalCost)}</p>
                <p className="text-rose-200 mt-1">{t('healthcareGap.overYearsUntilMedicare', { years: results.gapYears })}</p>
              </div>
              <div className="text-right">
                <p className="text-rose-100 text-sm">{t('healthcareGap.addToFireLabel')}</p>
                <p className="text-2xl font-bold">+{formatCurrency(results.totalCost)}</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid sm:grid-cols-3 gap-4">
            <ResultCard
              label={t('healthcareGap.gapYears')}
              value={results.gapYears}
              format="years"
              subtext={`Age ${params.retirementAge} to ${medicareAge}`}
            />
            <ResultCard
              label={t('healthcareGap.year1Cost')}
              value={results.annualCost}
              format="currency"
              subtext={t('healthcareGap.beforeInflation')}
            />
            <ResultCard
              label={t('healthcareGap.avgAnnualCost')}
              value={results.avgAnnualCost}
              format="currency"
              subtext={t('healthcareGap.withInflation')}
            />
          </div>

          {/* ACA Subsidy Info */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('healthcareGap.acaSubsidyPotential.title')}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {t('healthcareGap.acaSubsidyPotential.desc')}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300">$30k Income</p>
                  <p className="text-xl font-bold text-green-800 dark:text-green-200">
                    ~{formatCurrency(results.estimatedSubsidy30k)}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">{t('healthcareGap.annualSubsidyLabel')}</p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <p className="text-sm text-amber-700 dark:text-amber-300">$50k Income</p>
                  <p className="text-xl font-bold text-amber-800 dark:text-amber-200">
                    ~{formatCurrency(results.estimatedSubsidy50k)}
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400">{t('healthcareGap.annualSubsidyLabel')}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">$75k+ Income</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    ~{formatCurrency(results.estimatedSubsidy75k)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{t('healthcareGap.annualSubsidyLabel')}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                * Subsidies are estimates based on simplified calculations. Actual amounts depend on your state, 
                household size, plan type, and exact income. Check healthcare.gov for accurate quotes.
              </p>
            </CardContent>
          </Card>

          {/* Year by Year Breakdown */}
          {results.yearlyBreakdown.length > 0 && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('healthcareGap.yearByYearBreakdown')}</h2>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">{t('healthcareGap.table.age')}</th>
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">{t('healthcareGap.table.year')}</th>
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">{t('healthcareGap.table.premium')}</th>
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">{t('healthcareGap.table.deductible')}</th>
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">{t('healthcareGap.table.outOfPocket')}</th>
                        <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">{t('healthcareGap.table.total')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.yearlyBreakdown.slice(0, 10).map((row) => (
                        <tr key={row.age} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 px-3 font-medium text-gray-900 dark:text-gray-100">{row.age}</td>
                          <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{row.year}</td>
                          <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{formatCurrency(row.premium)}</td>
                          <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{formatCurrency(row.deductible)}</td>
                          <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{formatCurrency(row.outOfPocket)}</td>
                          <td className="py-2 px-3 font-medium text-gray-900 dark:text-gray-100">{formatCurrency(row.cost)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <td colSpan={5} className="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">
                          {t('healthcareGap.totalYears', { years: results.gapYears })}
                        </td>
                        <td className="py-2 px-3 font-bold text-rose-600 dark:text-rose-400">
                          {formatCurrency(results.totalCost)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tips */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('healthcareGap.strategiesTitle')}</h2>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <span className="text-xl">☕</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{t('healthcareGap.strategies.baristaFire.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('healthcareGap.strategies.baristaFire.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">💰</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{t('healthcareGap.strategies.hsaBridge.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('healthcareGap.strategies.hsaBridge.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">📉</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{t('healthcareGap.strategies.incomeManagement.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('healthcareGap.strategies.incomeManagement.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">🌍</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{t('healthcareGap.strategies.geoArbitrage.title')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('healthcareGap.strategies.geoArbitrage.desc')}</p>
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
