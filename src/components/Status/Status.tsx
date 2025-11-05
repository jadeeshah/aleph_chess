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
            Array.from({ length: Math.ceil(gameState.moveHistory.length / 2) }, (_, i) => {
              const whiteMove = gameState.moveHistory[i * 2]
              const blackMove = gameState.moveHistory[i * 2 + 1]

              const formatMove = (move: any) => {
                if (!move) return ''
                const piece = move.piece === 'p' ? '' : move.piece.toUpperCase()
                const capture = move.captured ? 'x' : ''
                return `${piece}${capture}${move.to}`
              }

              return (
                <div key={i} className="move-item">
                  <span className="move-number">{i + 1}.</span>
                  <span className="move-notation white-move">{formatMove(whiteMove)}</span>
                  {blackMove && <span className="move-notation black-move">{formatMove(blackMove)}</span>}
                </div>
              )
            })
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
