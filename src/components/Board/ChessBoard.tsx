import { useState } from 'react'
import { useDrop } from 'react-dnd'
import type { Square } from '../../types/chess'
import ChessPiece from '../Piece/ChessPiece'
import './ChessBoard.css'

interface ChessBoardProps {
  game: any
}

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1']

export default function ChessBoard({ game }: ChessBoardProps) {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null)
  const [legalMoves, setLegalMoves] = useState<Square[]>([])
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null)

  const handleSquareClick = (square: Square) => {
    const piece = game.getPieceAt(square)

    // If a square is already selected
    if (selectedSquare) {
      // Try to make the move
      const moveSuccess = game.makeMove(selectedSquare, square)
      if (moveSuccess) {
        setLastMove({ from: selectedSquare, to: square })
      }
      setSelectedSquare(null)
      setLegalMoves([])
    } else if (piece && piece.color === game.gameState.turn) {
      // Select the piece and show legal moves
      setSelectedSquare(square)
      const moves = game.getLegalMoves(square)
      setLegalMoves(moves)
    }
  }

  const Square = ({ square, file, rank }: { square: Square; file: string; rank: string }) => {
    const piece = game.getPieceAt(square)
    const isLightSquare = (FILES.indexOf(file) + RANKS.indexOf(rank)) % 2 === 0
    const isSelected = selectedSquare === square
    const isLegalMove = legalMoves.includes(square)
    const isLastMoveSquare = lastMove?.from === square || lastMove?.to === square

    const [{ isOver, canDrop }, drop] = useDrop(
      () => ({
        accept: 'piece',
        drop: (item: any) => {
          const moveSuccess = game.makeMove(item.square, square)
          if (moveSuccess) {
            setLastMove({ from: item.square, to: square })
          }
          setSelectedSquare(null)
          setLegalMoves([])
        },
        canDrop: (item: any) => {
          return game.isValidMove(item.square, square)
        },
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
      }),
      [square, game]
    )

    return (
      <div
        ref={drop}
        className={`square ${isLightSquare ? 'light' : 'dark'} ${
          isSelected ? 'selected' : ''
        } ${isLegalMove ? 'legal-move' : ''} ${isLastMoveSquare ? 'last-move' : ''} ${
          isOver && canDrop ? 'can-drop' : ''
        }`}
        onClick={() => handleSquareClick(square)}
      >
        {piece && (
          <ChessPiece
            piece={piece.type}
            color={piece.color}
            square={square}
            isPlayable={piece.color === game.gameState.turn}
          />
        )}
        {file === 'a' && <span className="rank-label">{rank}</span>}
        {rank === '1' && <span className="file-label">{file}</span>}
      </div>
    )
  }

  return (
    <div className="chess-board-container">
      <div className="chess-board">
        {RANKS.map((rank) =>
          FILES.map((file) => {
            const square = `${file}${rank}` as Square
            return <Square key={square} square={square} file={file} rank={rank} />
          })
        )}
      </div>
    </div>
  )
}
