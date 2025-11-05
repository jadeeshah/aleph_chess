import { useTranslation } from 'react-i18next'
import './ChessTimer.css'

interface ChessTimerProps {
  time: number // time in milliseconds
  color: 'w' | 'b'
  isActive: boolean
  isLowTime: boolean
  hasTimedOut: boolean
}

export default function ChessTimer({
  time,
  color,
  isActive,
  isLowTime,
  hasTimedOut,
}: ChessTimerProps) {
  const { t } = useTranslation()

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const getMilliseconds = (milliseconds: number): string => {
    return Math.floor((milliseconds % 1000) / 100).toString()
  }

  const colorName = color === 'w' ? t('colors.white') : t('colors.black')

  return (
    <div
      className={`chess-timer ${color} ${isActive ? 'active' : ''} ${
        isLowTime ? 'low-time' : ''
      } ${hasTimedOut ? 'timed-out' : ''}`}
    >
      <div className="timer-label">{colorName}</div>
      <div className="timer-display">
        <span className="timer-main">{formatTime(time)}</span>
        {isLowTime && !hasTimedOut && (
          <span className="timer-milliseconds">.{getMilliseconds(time)}</span>
        )}
      </div>
      {hasTimedOut && <div className="timeout-indicator">{t('timer.timeout')}</div>}
      {isActive && !hasTimedOut && <div className="active-indicator"></div>}
    </div>
  )
}
