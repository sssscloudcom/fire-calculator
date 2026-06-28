/**
 * SEO metadata for all calculator pages
 * Uses i18n keys for translatable content
 */

export interface PageSEO {
  titleKey: string
  descKey: string
  keywordsKey: string
  canonicalPath: string
}

export const calculatorSEO: Record<string, PageSEO> = {
  standard: {
    titleKey: 'seo.standard.title',
    descKey: 'seo.standard.description',
    keywordsKey: 'seo.standard.keywords',
    canonicalPath: '/standard',
  },
  coast: {
    titleKey: 'seo.coast.title',
    descKey: 'seo.coast.description',
    keywordsKey: 'seo.coast.keywords',
    canonicalPath: '/coast',
  },
  lean: {
    titleKey: 'seo.lean.title',
    descKey: 'seo.lean.description',
    keywordsKey: 'seo.lean.keywords',
    canonicalPath: '/lean',
  },
  fat: {
    titleKey: 'seo.fat.title',
    descKey: 'seo.fat.description',
    keywordsKey: 'seo.fat.keywords',
    canonicalPath: '/fat',
  },
  barista: {
    titleKey: 'seo.barista.title',
    descKey: 'seo.barista.description',
    keywordsKey: 'seo.barista.keywords',
    canonicalPath: '/barista',
  },
  reverse: {
    titleKey: 'seo.reverse.title',
    descKey: 'seo.reverse.description',
    keywordsKey: 'seo.reverse.keywords',
    canonicalPath: '/reverse',
  },
  withdrawal: {
    titleKey: 'seo.withdrawal.title',
    descKey: 'seo.withdrawal.description',
    keywordsKey: 'seo.withdrawal.keywords',
    canonicalPath: '/withdrawal',
  },
  'savings-rate': {
    titleKey: 'seo.savingsRate.title',
    descKey: 'seo.savingsRate.description',
    keywordsKey: 'seo.savingsRate.keywords',
    canonicalPath: '/savings-rate',
  },
  'debt-payoff': {
    titleKey: 'seo.debtPayoff.title',
    descKey: 'seo.debtPayoff.description',
    keywordsKey: 'seo.debtPayoff.keywords',
    canonicalPath: '/debt-payoff',
  },
  healthcare: {
    titleKey: 'seo.healthcare.title',
    descKey: 'seo.healthcare.description',
    keywordsKey: 'seo.healthcare.keywords',
    canonicalPath: '/healthcare',
  },
  books: {
    titleKey: 'seo.books.title',
    descKey: 'seo.books.description',
    keywordsKey: 'seo.books.keywords',
    canonicalPath: '/books',
  },
  apps: {
    titleKey: 'seo.apps.title',
    descKey: 'seo.apps.description',
    keywordsKey: 'seo.apps.keywords',
    canonicalPath: '/apps',
  },
  quiz: {
    titleKey: 'seo.quiz.title',
    descKey: 'seo.quiz.description',
    keywordsKey: 'seo.quiz.keywords',
    canonicalPath: '/quiz',
  },
}
