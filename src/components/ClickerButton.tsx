import Button from './Button'
import './ClickerButton.css'

interface ClickerButtonProps {
  onClick: () => void
  clickPower: number
  totalClicks: number
  disabled?: boolean
}

export function ClickerButton({ onClick, clickPower, totalClicks, disabled = false }: ClickerButtonProps) {
  return (
    <div className="clicker-container">
      <div className="clicker-stats">
        <div className="clicker-stat">
          <span className="clicker-stat-label">Click Power</span>
          <span className="clicker-stat-value">{clickPower.toLocaleString()}</span>
        </div>
        <div className="clicker-stat">
          <span className="clicker-stat-label">Total Clicks</span>
          <span className="clicker-stat-value">{totalClicks.toLocaleString()}</span>
        </div>
      </div>

      <Button
        variant="primary"
        className="clicker-button"
        onClick={onClick}
        disabled={disabled}
      >
        <span className="clicker-button-text">CLICK!</span>
        <span className="clicker-button-power">+{clickPower}</span>
      </Button>

      <div className="clicker-hint">
        <p>Click to earn resources and discover cards!</p>
        <p>Build your deck and become the ultimate clicker!</p>
      </div>
    </div>
  )
}
