import { useDrag } from 'react-dnd'
import type { PieceSymbol, Color, Square } from '../../types/chess'
import './ChessPiece.css'

interface ChessPieceProps {
  piece: PieceSymbol
  color: Color
  square: Square
  isPlayable: boolean
}

const PIECE_UNICODE: Record<Color, Record<PieceSymbol, string>> = {
  w: {
    k: '♔',
    q: '♕',
    r: '♖',
    b: '♗',
    n: '♘',
    p: '♙',
  },
  b: {
    k: '♚',
    q: '♛',
    r: '♜',
    b: '♝',
    n: '♞',
    p: '♟',
  },
}

export default function ChessPiece({ piece, color, square, isPlayable }: ChessPieceProps) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'piece',
      item: { piece, color, square },
      canDrag: isPlayable,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [piece, color, square, isPlayable]
  )

  return (
    <div
      ref={drag}
      className={`chess-piece ${color} ${isDragging ? 'dragging' : ''} ${
        !isPlayable ? 'not-playable' : ''
      }`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {PIECE_UNICODE[color][piece]}
    </div>
  )
}
