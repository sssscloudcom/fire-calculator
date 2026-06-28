/**
 * Centralized calculator metadata
 * i18n keys are used for translatable fields (name, description, audience)
 */

export interface CalculatorMetadata {
  path: string
  icon: string
  nameKey: string
  label: string
  descKey: string
  audienceKey: string
  color: string
  bgColor: string
  borderColor: string
}

export const calculators: CalculatorMetadata[] = [
  {
    path: '/standard',
    icon: '🎯',
    nameKey: 'calculators.standard.name',
    label: 'Standard FIRE',
    descKey: 'calculators.standard.desc',
    audienceKey: 'calculators.standard.audience',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
  },
  {
    path: '/coast',
    icon: '⛵',
    nameKey: 'calculators.coast.name',
    label: 'Coast FIRE',
    descKey: 'calculators.coast.desc',
    audienceKey: 'calculators.coast.audience',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
  {
    path: '/lean',
    icon: '🌿',
    nameKey: 'calculators.lean.name',
    label: 'Lean FIRE',
    descKey: 'calculators.lean.desc',
    audienceKey: 'calculators.lean.audience',
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
  },
  {
    path: '/fat',
    icon: '💎',
    nameKey: 'calculators.fat.name',
    label: 'Fat FIRE',
    descKey: 'calculators.fat.desc',
    audienceKey: 'calculators.fat.audience',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
  },
  {
    path: '/barista',
    icon: '☕',
    nameKey: 'calculators.barista.name',
    label: 'Barista FIRE',
    descKey: 'calculators.barista.desc',
    audienceKey: 'calculators.barista.audience',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    borderColor: 'border-amber-200 dark:border-amber-800',
  },
  {
    path: '/reverse',
    icon: '🔄',
    nameKey: 'calculators.reverse.name',
    label: 'Reverse FIRE',
    descKey: 'calculators.reverse.desc',
    audienceKey: 'calculators.reverse.audience',
    color: 'text-teal-500',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    borderColor: 'border-teal-200 dark:border-teal-800',
  },
  {
    path: '/withdrawal',
    icon: '📊',
    nameKey: 'calculators.withdrawal.name',
    label: 'Withdrawal Rate',
    descKey: 'calculators.withdrawal.desc',
    audienceKey: 'calculators.withdrawal.audience',
    color: 'text-sky-500',
    bgColor: 'bg-sky-50 dark:bg-sky-900/20',
    borderColor: 'border-sky-200 dark:border-sky-800',
  },
  {
    path: '/savings-rate',
    icon: '🧮',
    nameKey: 'calculators.savingsRate.name',
    label: 'Savings & Investment Rate',
    descKey: 'calculators.savingsRate.desc',
    audienceKey: 'calculators.savingsRate.audience',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
  },
  {
    path: '/debt-payoff',
    icon: '💳',
    nameKey: 'calculators.debtPayoff.name',
    label: 'Debt Payoff',
    descKey: 'calculators.debtPayoff.desc',
    audienceKey: 'calculators.debtPayoff.audience',
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
  },
  {
    path: '/healthcare',
    icon: '🏥',
    nameKey: 'calculators.healthcare.name',
    label: 'Healthcare Gap',
    descKey: 'calculators.healthcare.desc',
    audienceKey: 'calculators.healthcare.audience',
    color: 'text-rose-500',
    bgColor: 'bg-rose-50 dark:bg-rose-900/20',
    borderColor: 'border-rose-200 dark:border-rose-800',
  },
]

export function getCalculatorByPath(path: string): CalculatorMetadata | undefined {
  return calculators.find(calc => calc.path === path)
}

export function getCalculatorByName(name: string): CalculatorMetadata | undefined {
  return calculators.find(calc => calc.label.toLowerCase() === name.toLowerCase())
}
