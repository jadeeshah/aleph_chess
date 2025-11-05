import { useTranslation } from 'react-i18next'
import './Controls.css'

interface ControlsProps {
  game: any
}

export default function Controls({ game }: ControlsProps) {
  const { t } = useTranslation()

  const handleNewGame = () => {
    if (
      !game.gameState.isGameOver ||
      window.confirm(t('messages.confirmResign') || 'Start a new game?')
    ) {
      game.resetGame()
    }
  }

  const handleUndo = () => {
    game.undoMove()
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
    </div>
  )
}
