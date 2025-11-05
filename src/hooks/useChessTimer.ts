import { useState, useEffect, useCallback, useRef } from 'react'

export interface TimeControl {
  minutes: number
  increment: number // seconds added per move
}

export interface TimerState {
  white: number // time in milliseconds
  black: number
  isRunning: boolean
  isPaused: boolean
  activeColor: 'w' | 'b'
}

export function useChessTimer(initialTimeControl: TimeControl) {
  const [timerState, setTimerState] = useState<TimerState>({
    white: initialTimeControl.minutes * 60 * 1000,
    black: initialTimeControl.minutes * 60 * 1000,
    isRunning: false,
    isPaused: false,
    activeColor: 'w',
  })

  const [timeControl, setTimeControl] = useState<TimeControl>(initialTimeControl)
  const intervalRef = useRef<number | null>(null)
  const lastTickRef = useRef<number>(Date.now())

  const updateTimer = useCallback(() => {
    const now = Date.now()
    const elapsed = now - lastTickRef.current
    lastTickRef.current = now

    setTimerState((prev) => {
      if (!prev.isRunning || prev.isPaused) return prev

      const newTime = {
        ...prev,
        [prev.activeColor === 'w' ? 'white' : 'black']:
          prev[prev.activeColor === 'w' ? 'white' : 'black'] - elapsed,
      }

      // Check for timeout
      if (newTime.white <= 0 || newTime.black <= 0) {
        stopTimer()
        return {
          ...newTime,
          white: Math.max(0, newTime.white),
          black: Math.max(0, newTime.black),
          isRunning: false,
        }
      }

      return newTime
    })
  }, [])

  const startTimer = useCallback(() => {
    lastTickRef.current = Date.now()
    setTimerState((prev) => ({ ...prev, isRunning: true, isPaused: false }))
  }, [])

  const stopTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setTimerState((prev) => ({ ...prev, isRunning: false }))
  }, [])

  const pauseTimer = useCallback(() => {
    setTimerState((prev) => ({ ...prev, isPaused: true }))
  }, [])

  const resumeTimer = useCallback(() => {
    lastTickRef.current = Date.now()
    setTimerState((prev) => ({ ...prev, isPaused: false }))
  }, [])

  const switchTurn = useCallback(() => {
    setTimerState((prev) => {
      const newColor: 'w' | 'b' = prev.activeColor === 'w' ? 'b' : 'w'
      const oldColor = prev.activeColor

      // Add increment to the player who just moved
      const incrementMs = timeControl.increment * 1000
      const newTime: TimerState = {
        ...prev,
        [oldColor === 'w' ? 'white' : 'black']:
          prev[oldColor === 'w' ? 'white' : 'black'] + incrementMs,
        activeColor: newColor,
      }

      lastTickRef.current = Date.now()
      return newTime
    })
  }, [timeControl.increment])

  const resetTimer = useCallback((newTimeControl?: TimeControl) => {
    const tc = newTimeControl || timeControl
    stopTimer()
    setTimeControl(tc)
    setTimerState({
      white: tc.minutes * 60 * 1000,
      black: tc.minutes * 60 * 1000,
      isRunning: false,
      isPaused: false,
      activeColor: 'w',
    })
  }, [timeControl, stopTimer])

  const isLowTime = useCallback((color: 'w' | 'b') => {
    const time = color === 'w' ? timerState.white : timerState.black
    return time < 30000 // less than 30 seconds
  }, [timerState])

  const hasTimedOut = useCallback((color: 'w' | 'b') => {
    const time = color === 'w' ? timerState.white : timerState.black
    return time <= 0
  }, [timerState])

  // Set up interval when timer is running
  useEffect(() => {
    if (timerState.isRunning && !timerState.isPaused) {
      intervalRef.current = window.setInterval(updateTimer, 100) // Update every 100ms for smooth display
      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [timerState.isRunning, timerState.isPaused, updateTimer])

  return {
    timerState,
    timeControl,
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
    switchTurn,
    resetTimer,
    isLowTime,
    hasTimedOut,
  }
}
