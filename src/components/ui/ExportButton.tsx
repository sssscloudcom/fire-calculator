import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from './Button'

interface ExportButtonProps {
  onExport: () => void | Promise<void>
  disabled?: boolean
  className?: string
}

/**
 * Button component for exporting calculator data to Excel
 * Shows loading state during export and success feedback
 */
export default function ExportButton({ onExport, disabled = false, className = '' }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { t } = useTranslation()

  const handleExport = async () => {
    setIsExporting(true)
    
    try {
      const result = onExport()
      if (result instanceof Promise) {
        await result
      }
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button
      onClick={handleExport}
      disabled={disabled || isExporting}
      variant="secondary"
      className={className}
      title={t('components.exportButton.title')}
    >
      {isExporting ? (
        <>
          <span className="animate-spin">⏳</span>
          <span className="ml-2">{t('components.exportButton.exporting')}</span>
        </>
      ) : showSuccess ? (
        <>
          <span>✅</span>
          <span className="ml-2">{t('components.exportButton.exported')}</span>
        </>
      ) : (
        <>
          <span>📊</span>
          <span className="ml-2">{t('components.exportButton.exportToExcel')}</span>
        </>
      )}
    </Button>
  )
}