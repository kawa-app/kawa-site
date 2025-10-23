import { useState } from 'react'
import { useGameState } from './hooks/useGameState'
import {
  Button,
  Card,
  Badge,
  Modal,
  GameCard,
  CurrencyDisplay,
  ClickerButton
} from './components'
import { Currency } from './types/game'
import './App.css'

function App() {
  const { gameState, performClick, upgradeCard, toggleCardInDeck, buyCardPack } = useGameState()
  const [activeTab, setActiveTab] = useState<'clicker' | 'cards' | 'deck' | 'shop'>('clicker')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent] = useState<{ title: string; content: string }>({
    title: 'Welcome to Kawa Clicker!',
    content: 'Start clicking to discover amazing cards and build your ultimate deck!'
  })

  const calculateUpgradeCost = (card: any) => {
    const multiplier = Math.pow(1.5, card.level)
    const cost: Record<Currency, number> = {
      [Currency.CLICKS]: 0,
      [Currency.GEMS]: 0,
      [Currency.STARDUST]: 0,
      [Currency.ESSENCE]: 0
    }

    Object.entries(card.baseCost).forEach(([currency, baseCost]) => {
      cost[currency as Currency] = Math.floor((baseCost as number) * multiplier)
    })

    return cost
  }

  const canAffordUpgrade = (cost: Record<Currency, number>) => {
    return Object.entries(cost).every(([currency, amount]) =>
      gameState.currencies[currency as Currency] >= amount
    )
  }

  const canAffordPack = (packType: 'basic' | 'rare' | 'epic') => {
    const costs = {
      basic: { [Currency.GEMS]: 5 },
      rare: { [Currency.GEMS]: 25, [Currency.STARDUST]: 2 },
      epic: { [Currency.GEMS]: 100, [Currency.STARDUST]: 10, [Currency.ESSENCE]: 1 }
    }

    const cost = costs[packType]
    return Object.entries(cost).every(([currency, amount]) =>
      gameState.currencies[currency as Currency] >= amount
    )
  }

  const ownedCards = gameState.cards.filter(card =>
    gameState.unlockedCards.has(card.id) && card.owned > 0
  )
  const deckCards = gameState.cards.filter(card => card.inDeck)

  return (
    <div className="app">
      <header className="game-header">
        <h1>🃏 Kawa Clicker</h1>
        <CurrencyDisplay currencies={gameState.currencies} large />
      </header>

      <nav className="game-nav">
        <Button
          variant={activeTab === 'clicker' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('clicker')}
          className="nav-button"
        >
          🎯 Clicker
        </Button>
        <Button
          variant={activeTab === 'cards' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('cards')}
          className="nav-button"
        >
          🃏 Cards ({ownedCards.length})
        </Button>
        <Button
          variant={activeTab === 'deck' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('deck')}
          className="nav-button"
        >
          📚 Deck ({deckCards.length})
        </Button>
        <Button
          variant={activeTab === 'shop' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('shop')}
          className="nav-button"
        >
          🏪 Shop
        </Button>
      </nav>

      <main className="game-content">
        {activeTab === 'clicker' && (
          <div className="tab-content">
            <Card variant="highlight" className="clicker-section">
              <ClickerButton
                onClick={performClick}
                clickPower={gameState.clickPower}
                totalClicks={gameState.totalClicks}
              />
            </Card>

            <div className="stats-grid">
              <Card variant="default">
                <h3>🎯 Clicker Stats</h3>
                <div className="stat-item">
                  <span>Auto Clicks/s:</span>
                  <span>{gameState.autoClickRate.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span>Total Multiplier:</span>
                  <span>{gameState.multiplier.toFixed(2)}x</span>
                </div>
                <div className="stat-item">
                  <span>Cards in Deck:</span>
                  <span>{deckCards.length}</span>
                </div>
              </Card>

              <Card variant="default">
                <h3>🏆 Achievements</h3>
                <div className="achievements">
                  <Badge variant={gameState.totalClicks >= 100 ? 'success' : 'secondary'}>
                    Clicker Novice {gameState.totalClicks >= 100 ? '✓' : `(${gameState.totalClicks}/100)`}
                  </Badge>
                  <Badge variant={gameState.statistics.totalCardsCollected >= 5 ? 'success' : 'secondary'}>
                    Card Collector {gameState.statistics.totalCardsCollected >= 5 ? '✓' : `(${gameState.statistics.totalCardsCollected}/5)`}
                  </Badge>
                  <Badge variant={gameState.statistics.rareCardsFound >= 1 ? 'success' : 'secondary'}>
                    Rare Hunter {gameState.statistics.rareCardsFound >= 1 ? '✓' : '(0/1)'}
                  </Badge>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'cards' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>🃏 Card Collection</h2>
              <p>Manage your discovered cards and build your perfect deck!</p>
            </div>

            {ownedCards.length === 0 ? (
              <Card variant="default" className="empty-state">
                <h3>No Cards Yet!</h3>
                <p>Keep clicking to discover your first cards, or visit the shop to buy card packs!</p>
                <Button onClick={() => setActiveTab('shop')} variant="primary">
                  Visit Shop
                </Button>
              </Card>
            ) : (
              <div className="cards-grid">
                {ownedCards.map(card => (
                  <GameCard
                    key={card.id}
                    card={card}
                    onUpgrade={upgradeCard}
                    onToggleDeck={toggleCardInDeck}
                    showUpgrade={true}
                    showDeckToggle={true}
                    upgradeCost={calculateUpgradeCost(card)}
                    canAfford={canAffordUpgrade(calculateUpgradeCost(card))}
                    isUnlocked={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'deck' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>📚 Active Deck</h2>
              <p>Your active deck provides all bonuses. Cards must be owned to be added to deck.</p>
            </div>

            {deckCards.length === 0 ? (
              <Card variant="default" className="empty-state">
                <h3>Empty Deck</h3>
                <p>Add cards from your collection to gain their bonuses!</p>
                <Button onClick={() => setActiveTab('cards')} variant="primary">
                  View Collection
                </Button>
              </Card>
            ) : (
              <div className="cards-grid">
                {deckCards.map(card => (
                  <GameCard
                    key={card.id}
                    card={card}
                    onToggleDeck={toggleCardInDeck}
                    showDeckToggle={true}
                    isUnlocked={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'shop' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>🏪 Card Shop</h2>
              <p>Purchase card packs to expand your collection!</p>
            </div>

            <div className="shop-grid">
              <Card variant="default" className="shop-item">
                <h3>📦 Basic Pack</h3>
                <p>Contains 3 random cards. Great for starting your collection!</p>
                <div className="pack-cost">
                  <Badge variant="primary">💎 5 Gems</Badge>
                </div>
                <Button
                  variant="primary"
                  onClick={() => buyCardPack('basic')}
                  disabled={!canAffordPack('basic')}
                >
                  Buy Basic Pack
                </Button>
              </Card>

              <Card variant="default" className="shop-item">
                <h3>🎁 Rare Pack</h3>
                <p>Contains 5 cards with better rarity chances!</p>
                <div className="pack-cost">
                  <Badge variant="primary">💎 25 Gems</Badge>
                  <Badge variant="info">✨ 2 Stardust</Badge>
                </div>
                <Button
                  variant="info"
                  onClick={() => buyCardPack('rare')}
                  disabled={!canAffordPack('rare')}
                >
                  Buy Rare Pack
                </Button>
              </Card>

              <Card variant="default" className="shop-item">
                <h3>⭐ Epic Pack</h3>
                <p>Contains 7 cards with guaranteed rare+ cards!</p>
                <div className="pack-cost">
                  <Badge variant="primary">💎 100 Gems</Badge>
                  <Badge variant="info">✨ 10 Stardust</Badge>
                  <Badge variant="warning">🔮 1 Essence</Badge>
                </div>
                <Button
                  variant="warning"
                  onClick={() => buyCardPack('epic')}
                  disabled={!canAffordPack('epic')}
                >
                  Buy Epic Pack
                </Button>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        variant="primary"
        size="medium"
      >
        <p>{modalContent.content}</p>
        <div style={{ marginTop: '1rem' }}>
          <Button onClick={() => setIsModalOpen(false)} variant="primary">
            Awesome!
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default App
