import { useTranslation } from 'react-i18next'
import './Status.css'

interface StatusProps {
  game: any
}

export default function Status({ game }: StatusProps) {
  const { t } = useTranslation()
  const { gameState } = game

  const currentColor = gameState.turn === 'w' ? t('colors.white') : t('colors.black')

  const getStatusMessage = () => {
    if (gameState.isCheckmate) {
      const winner = gameState.turn === 'w' ? t('colors.black') : t('colors.white')
      return t('status.checkmate', { winner })
    }
    if (gameState.isStalemate) {
      return t('status.stalemate')
    }
    if (gameState.isDraw) {
      return t('status.draw')
    }
    if (gameState.isCheck) {
      return t('status.check')
    }
    return t('status.turn', { color: currentColor })
  }

  return (
    <div className="status">
      <div className="status-message">{getStatusMessage()}</div>

      <div className="captured-pieces">
        <div className="captured-section">
          <h3>{t('captured.white')}</h3>
          <div className="pieces-list">
            {gameState.capturedPieces.white.map((piece: string, index: number) => (
              <span key={index} className="captured-piece white">
                {getPieceUnicode('w', piece)}
              </span>
            ))}
          </div>
        </div>
        <div className="captured-section">
          <h3>{t('captured.black')}</h3>
          <div className="pieces-list">
            {gameState.capturedPieces.black.map((piece: string, index: number) => (
              <span key={index} className="captured-piece black">
                {getPieceUnicode('b', piece)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="move-history">
        <h3>{t('moveHistory.title')}</h3>
        <div className="moves-list">
          {gameState.moveHistory.length === 0 ? (
            <p className="no-moves">{t('moveHistory.noMoves')}</p>
          ) : (
            gameState.moveHistory.map((move: any, index: number) => (
              <div key={index} className="move-item">
                <span className="move-number">{Math.floor(index / 2) + 1}.</span>
                <span className="move-notation">
                  {move.piece.toUpperCase()}
                  {move.from}-{move.to}
                  {move.captured ? 'x' : ''}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function getPieceUnicode(color: string, piece: string): string {
  const pieces: Record<string, Record<string, string>> = {
    w: { k: '♔', q: '♕', r: '♖', b: '♗', n: '♘', p: '♙' },
    b: { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' },
  }
  return pieces[color]?.[piece] || ''
}
