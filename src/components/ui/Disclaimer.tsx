import { useTranslation } from 'react-i18next'

export default function Disclaimer() {
  const { t } = useTranslation()
  
  return (
    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-xs text-gray-500 dark:text-gray-400">
        <p className="font-semibold text-gray-600 dark:text-gray-300 mb-2">{t('components.disclaimer.title')}</p>
        <p className="mb-2">
          {t('components.disclaimer.para1')}
        </p>
        <p className="mb-2">
          {t('components.disclaimer.para2')}
        </p>
        <p>
          {t('components.disclaimer.para3')}
        </p>
      </div>
    </div>
  )
}
