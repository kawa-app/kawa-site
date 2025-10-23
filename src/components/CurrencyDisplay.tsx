import { Currency } from '../types/game'
import Badge from './Badge'
import './CurrencyDisplay.css'

interface CurrencyDisplayProps {
  currencies: Record<Currency, number>
  large?: boolean
}

const CURRENCY_ICONS = {
  [Currency.CLICKS]: '👆',
  [Currency.GEMS]: '💎',
  [Currency.STARDUST]: '✨',
  [Currency.ESSENCE]: '🔮'
}

const CURRENCY_COLORS = {
  [Currency.CLICKS]: 'secondary',
  [Currency.GEMS]: 'primary',
  [Currency.STARDUST]: 'info',
  [Currency.ESSENCE]: 'warning'
} as const

export function CurrencyDisplay({ currencies, large = false }: CurrencyDisplayProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`
    return num.toLocaleString()
  }

  return (
    <div className={`currency-display ${large ? 'currency-display--large' : ''}`}>
      {Object.entries(currencies).map(([currency, amount]) => (
        <Badge
          key={currency}
          variant={CURRENCY_COLORS[currency as Currency]}
          className="currency-badge"
        >
          <span className="currency-icon">
            {CURRENCY_ICONS[currency as Currency]}
          </span>
          <span className="currency-amount">
            {formatNumber(amount)}
          </span>
        </Badge>
      ))}
    </div>
  )
}
