import React from 'react'
import type { Card as CardType } from '../types/game'
import { RARITY_COLORS } from '../data/cards'
import Button from './Button'
import Badge from './Badge'
import './GameCard.css'

interface GameCardProps {
  card: CardType
  onUpgrade?: (cardId: string) => void
  onToggleDeck?: (cardId: string) => void
  showUpgrade?: boolean
  showDeckToggle?: boolean
  upgradeCost?: Record<string, number>
  canAfford?: boolean
  isUnlocked?: boolean
}

export function GameCard({
  card,
  onUpgrade,
  onToggleDeck,
  showUpgrade = false,
  showDeckToggle = false,
  upgradeCost,
  canAfford = false,
  isUnlocked = false
}: GameCardProps) {
  const rarityColor = RARITY_COLORS[card.rarity]

  if (!isUnlocked) {
    return (
      <div className="game-card game-card--locked">
        <div className="game-card__content">
          <div className="game-card__header">
            <h3 className="game-card__name">???</h3>
            <Badge variant="secondary">Locked</Badge>
          </div>
          <p className="game-card__description">Discover this card by clicking!</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`game-card game-card--${card.rarity} ${card.inDeck ? 'game-card--in-deck' : ''}`}
      style={{ '--rarity-color': rarityColor } as React.CSSProperties}
    >
      <div className="game-card__content">
        <div className="game-card__header">
          <h3 className="game-card__name">{card.name}</h3>
          <Badge
            variant={card.rarity === 'mythic' ? 'danger' :
              card.rarity === 'legendary' ? 'warning' :
                card.rarity === 'epic' ? 'info' :
                  card.rarity === 'rare' ? 'primary' :
                    card.rarity === 'uncommon' ? 'success' : 'secondary'}
          >
            {card.rarity.toUpperCase()}
          </Badge>
        </div>

        <p className="game-card__description">{card.description}</p>

        <div className="game-card__stats">
          {card.baseEffect.clickPower && (
            <div className="game-card__stat">
              <span className="game-card__stat-label">Click Power:</span>
              <span className="game-card__stat-value">
                +{card.baseEffect.clickPower * (card.level || 1)}
              </span>
            </div>
          )}
          {card.baseEffect.autoClicks && (
            <div className="game-card__stat">
              <span className="game-card__stat-label">Auto Clicks/s:</span>
              <span className="game-card__stat-value">
                {card.baseEffect.autoClicks * (card.level || 1)}
              </span>
            </div>
          )}
          {card.baseEffect.multiplier && (
            <div className="game-card__stat">
              <span className="game-card__stat-label">Multiplier:</span>
              <span className="game-card__stat-value">
                {card.baseEffect.multiplier}x
              </span>
            </div>
          )}
        </div>

        <div className="game-card__info">
          <span className="game-card__level">
            Level {card.level}/{card.maxLevel}
          </span>
          {card.owned > 0 && (
            <span className="game-card__owned">
              Owned: {card.owned}
            </span>
          )}
        </div>

        <div className="game-card__actions">
          {showDeckToggle && card.owned > 0 && (
            <Button
              variant={card.inDeck ? 'secondary' : 'primary'}
              onClick={() => onToggleDeck?.(card.id)}
            >
              {card.inDeck ? 'Remove from Deck' : 'Add to Deck'}
            </Button>
          )}

          {showUpgrade && card.level < card.maxLevel && upgradeCost && (
            <div className="game-card__upgrade">
              <div className="game-card__upgrade-cost">
                {Object.entries(upgradeCost).map(([currency, amount]) => (
                  amount > 0 && (
                    <span key={currency} className="game-card__cost">
                      {amount} {currency}
                    </span>
                  )
                ))}
              </div>
              <Button
                variant="success"
                onClick={() => onUpgrade?.(card.id)}
                disabled={!canAfford}
              >
                Upgrade
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
