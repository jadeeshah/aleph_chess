import type { Chess, Square, PieceSymbol, Color } from 'chess.js'

export type { Chess, Square, PieceSymbol, Color }

export interface ChessPiece {
  type: PieceSymbol
  color: Color
}

export interface Position {
  square: Square
  piece: ChessPiece
}

export interface Move {
  from: Square
  to: Square
  piece: PieceSymbol
  captured?: PieceSymbol
  promotion?: PieceSymbol
  flags: string
}

export interface GameState {
  fen: string
  turn: Color
  isCheck: boolean
  isCheckmate: boolean
  isStalemate: boolean
  isDraw: boolean
  isGameOver: boolean
  capturedPieces: {
    white: PieceSymbol[]
    black: PieceSymbol[]
  }
  moveHistory: Move[]
}
