import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { TimeControl } from '../../hooks/useChessTimer'
import './TimeControlSettings.css'

interface TimeControlSettingsProps {
  onApply: (timeControl: TimeControl) => void
  onClose: () => void
}

const TIME_PRESETS: TimeControl[] = [
  { minutes: 1, increment: 0 }, // Bullet
  { minutes: 3, increment: 0 }, // Blitz
  { minutes: 3, increment: 2 }, // Blitz with increment
  { minutes: 5, increment: 0 }, // Blitz
  { minutes: 5, increment: 3 }, // Blitz with increment
  { minutes: 10, increment: 0 }, // Rapid
  { minutes: 10, increment: 5 }, // Rapid with increment
  { minutes: 15, increment: 10 }, // Rapid
  { minutes: 30, increment: 0 }, // Classical
]

export default function TimeControlSettings({ onApply, onClose }: TimeControlSettingsProps) {
  const { t } = useTranslation()
  const [customMinutes, setCustomMinutes] = useState(10)
  const [customIncrement, setCustomIncrement] = useState(0)

  const handlePresetClick = (preset: TimeControl) => {
    onApply(preset)
    onClose()
  }

  const handleCustomApply = () => {
    onApply({ minutes: customMinutes, increment: customIncrement })
    onClose()
  }

  return (
    <div className="time-control-overlay" onClick={onClose}>
      <div className="time-control-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t('timeControl.title')}</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <section className="presets-section">
            <h3>{t('timeControl.presets')}</h3>
            <div className="presets-grid">
              {TIME_PRESETS.map((preset, index) => (
                <button
                  key={index}
                  className="preset-btn"
                  onClick={() => handlePresetClick(preset)}
                >
                  <div className="preset-time">{preset.minutes} {t('timeControl.min')}</div>
                  <div className="preset-increment">
                    {preset.increment > 0
                      ? `+${preset.increment} ${t('timeControl.sec')}`
                      : t('timeControl.noIncrement')}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="custom-section">
            <h3>{t('timeControl.custom')}</h3>
            <div className="custom-controls">
              <div className="control-group">
                <label htmlFor="minutes">{t('timeControl.minutes')}</label>
                <input
                  type="number"
                  id="minutes"
                  min="1"
                  max="180"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(Number(e.target.value))}
                />
              </div>
              <div className="control-group">
                <label htmlFor="increment">{t('timeControl.increment')}</label>
                <input
                  type="number"
                  id="increment"
                  min="0"
                  max="60"
                  value={customIncrement}
                  onChange={(e) => setCustomIncrement(Number(e.target.value))}
                />
              </div>
            </div>
            <button className="apply-btn" onClick={handleCustomApply}>
              {t('timeControl.apply')}
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}
