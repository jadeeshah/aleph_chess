import { useState, useCallback } from 'react'
import { Chess } from 'chess.js'
import type { Square, PieceSymbol } from 'chess.js'
import type { GameState } from '../types/chess'

interface UseChessGameOptions {
  onMove?: () => void
}

export function useChessGame(options?: UseChessGameOptions) {
  const [game, setGame] = useState(() => new Chess())
  const [gameState, setGameState] = useState<GameState>(() => getGameState(new Chess()))

  function getGameState(chessInstance: Chess): GameState {
    const history = chessInstance.history({ verbose: true })
    const capturedPieces = {
      white: [] as PieceSymbol[],
      black: [] as PieceSymbol[],
    }

    // Calculate captured pieces from move history
    history.forEach((move: any) => {
      if (move.captured) {
        if (move.color === 'w') {
          capturedPieces.black.push(move.captured)
        } else {
          capturedPieces.white.push(move.captured)
        }
      }
    })

    return {
      fen: chessInstance.fen(),
      turn: chessInstance.turn(),
      isCheck: chessInstance.isCheck(),
      isCheckmate: chessInstance.isCheckmate(),
      isStalemate: chessInstance.isStalemate(),
      isDraw: chessInstance.isDraw(),
      isGameOver: chessInstance.isGameOver(),
      capturedPieces,
      moveHistory: history.map((m: any) => ({
        from: m.from,
        to: m.to,
        piece: m.piece,
        captured: m.captured,
        promotion: m.promotion,
        flags: m.flags,
      })),
    }
  }

  const makeMove = useCallback(
    (from: Square, to: Square, promotion?: PieceSymbol): boolean => {
      try {
        const result = game.move({
          from,
          to,
          promotion: promotion || 'q',
        })

        if (result) {
          const newGame = new Chess(game.fen())
          setGame(newGame)
          setGameState(getGameState(newGame))
          // Trigger timer switch if callback provided
          if (options?.onMove) {
            options.onMove()
          }
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },
    [game, options]
  )

  const getLegalMoves = useCallback(
    (square: Square): Square[] => {
      const moves = game.moves({ square, verbose: true })
      return moves.map((move: any) => move.to)
    },
    [game]
  )

  const resetGame = useCallback(() => {
    const newGame = new Chess()
    setGame(newGame)
    setGameState(getGameState(newGame))
  }, [])

  const undoMove = useCallback(() => {
    const move = game.undo()
    if (move) {
      const newGame = new Chess(game.fen())
      setGame(newGame)
      setGameState(getGameState(newGame))
      return true
    }
    return false
  }, [game])

  const getPieceAt = useCallback(
    (square: Square) => {
      return game.get(square)
    },
    [game]
  )

  const isValidMove = useCallback(
    (from: Square, to: Square): boolean => {
      const moves = game.moves({ square: from, verbose: true })
      return moves.some((move: any) => move.to === to)
    },
    [game]
  )

  return {
    game,
    gameState,
    makeMove,
    getLegalMoves,
    resetGame,
    undoMove,
    getPieceAt,
    isValidMove,
  }
}
