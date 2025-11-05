import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ChessBoard from './components/Board/ChessBoard'
import Controls from './components/Controls/Controls'
import Status from './components/Status/Status'
import LanguageSelector from './components/LanguageSelector'
import ChessTimer from './components/Timer/ChessTimer'
import TimeControlSettings from './components/Timer/TimeControlSettings'
import { useChessGame } from './hooks/useChessGame'
import { useChessTimer, type TimeControl } from './hooks/useChessTimer'
import './styles/App.css'

function App() {
  const { i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
  const [showTimeSettings, setShowTimeSettings] = useState(false)

  const timer = useChessTimer({ minutes: 10, increment: 0 })
  const chessGame = useChessGame({
    onMove: () => {
      if (timer.timerState.isRunning) {
        timer.switchTurn()
      }
    },
  })

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

  const handleNewGame = () => {
    chessGame.resetGame()
    timer.resetTimer()
  }

  const handleTimeControlApply = (timeControl: TimeControl) => {
    timer.resetTimer(timeControl)
    chessGame.resetGame()
  }

  // Start timer on first move
  useEffect(() => {
    if (chessGame.gameState.moveHistory.length === 1 && !timer.timerState.isRunning) {
      timer.startTimer()
    }
  }, [chessGame.gameState.moveHistory.length, timer])

  // Check for timeout
  useEffect(() => {
    if (timer.hasTimedOut('w') || timer.hasTimedOut('b')) {
      timer.stopTimer()
    }
  }, [timer])

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
            <div className="left-panel">
              <Status game={chessGame} />
              <ChessTimer
                time={timer.timerState.black}
                color="b"
                isActive={timer.timerState.activeColor === 'b' && timer.timerState.isRunning}
                isLowTime={timer.isLowTime('b')}
                hasTimedOut={timer.hasTimedOut('b')}
              />
            </div>
            <ChessBoard game={chessGame} />
            <div className="right-panel">
              <ChessTimer
                time={timer.timerState.white}
                color="w"
                isActive={timer.timerState.activeColor === 'w' && timer.timerState.isRunning}
                isLowTime={timer.isLowTime('w')}
                hasTimedOut={timer.hasTimedOut('w')}
              />
              <Controls game={chessGame} timer={timer} onNewGame={handleNewGame} onOpenTimeSettings={() => setShowTimeSettings(true)} />
            </div>
          </div>
        </main>

        {showTimeSettings && (
          <TimeControlSettings
            onApply={handleTimeControlApply}
            onClose={() => setShowTimeSettings(false)}
          />
        )}

        <footer className="app-footer">
          <p>© 2025 Aleph Chess</p>
        </footer>
      </div>
    </DndProvider>
  )
}

export default App
