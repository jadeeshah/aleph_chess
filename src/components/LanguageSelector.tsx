import { useTranslation } from 'react-i18next'
import './LanguageSelector.css'

interface LanguageSelectorProps {
  currentLanguage: string
  onLanguageChange: (lang: string) => void
}

export default function LanguageSelector({
  currentLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  const { t } = useTranslation()

  const languages = [
    { code: 'ar', name: t('languages.ar') },
    { code: 'ur', name: t('languages.ur') },
    { code: 'fa', name: t('languages.fa') },
  ]

  return (
    <div className="language-selector">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`lang-btn ${currentLanguage === lang.code ? 'active' : ''}`}
          onClick={() => onLanguageChange(lang.code)}
        >
          {lang.name}
        </button>
      ))}
    </div>
  )
}
