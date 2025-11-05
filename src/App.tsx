import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ChessBoard from './components/Board/ChessBoard'
import Controls from './components/Controls/Controls'
import Status from './components/Status/Status'
import LanguageSelector from './components/LanguageSelector'
import { useChessGame } from './hooks/useChessGame'
import './styles/App.css'

function App() {
  const { i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

  const chessGame = useChessGame()

  useEffect(() => {
    // Update HTML dir and lang attributes when language changes
    const dir = ['ar', 'ur', 'fa'].includes(i18n.language) ? 'rtl' : 'ltr'
    document.documentElement.dir = dir
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
    setCurrentLanguage(lang)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">
            {i18n.language === 'ar' && 'شطرنج الألف'}
            {i18n.language === 'ur' && 'الف شطرنج'}
            {i18n.language === 'fa' && 'شطرنج الف'}
          </h1>
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
          />
        </header>

        <main className="app-main">
          <div className="game-container">
            <Status game={chessGame} />
            <ChessBoard game={chessGame} />
            <Controls game={chessGame} />
          </div>
        </main>

        <footer className="app-footer">
          <p>© 2025 Aleph Chess</p>
        </footer>
      </div>
    </DndProvider>
  )
}

export default App
