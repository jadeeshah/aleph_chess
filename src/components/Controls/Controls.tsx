import { useTranslation } from 'react-i18next'
import './Controls.css'

interface ControlsProps {
  game: any
  timer?: any
  onNewGame?: () => void
  onOpenTimeSettings?: () => void
}

export default function Controls({ game, timer, onNewGame, onOpenTimeSettings }: ControlsProps) {
  const { t } = useTranslation()

  const handleNewGame = () => {
    if (
      !game.gameState.isGameOver ||
      window.confirm(t('messages.confirmResign') || 'Start a new game?')
    ) {
      if (onNewGame) {
        onNewGame()
      } else {
        game.resetGame()
      }
    }
  }

  const handleUndo = () => {
    game.undoMove()
  }

  const handlePauseResume = () => {
    if (timer) {
      if (timer.timerState.isPaused) {
        timer.resumeTimer()
      } else {
        timer.pauseTimer()
      }
    }
  }

  return (
    <div className="controls">
      <button className="btn btn-primary" onClick={handleNewGame}>
        {t('controls.newGame')}
      </button>
      <button
        className="btn btn-secondary"
        onClick={handleUndo}
        disabled={game.gameState.moveHistory.length === 0}
      >
        {t('controls.undo')}
      </button>
      {timer && (
        <button
          className="btn btn-secondary"
          onClick={handlePauseResume}
          disabled={!timer.timerState.isRunning}
        >
          {timer.timerState.isPaused ? t('timeControl.resume') : t('timeControl.pause')}
        </button>
      )}
      {onOpenTimeSettings && (
        <button className="btn btn-secondary" onClick={onOpenTimeSettings}>
          ⏱️ {t('timeControl.title')}
        </button>
      )}
    </div>
  )
}
