import { useState, useEffect, useCallback } from 'react'
import type { GameState, Card } from '../types/game'
import { CardRarity, Currency } from '../types/game'
import { INITIAL_CARDS, RARITY_WEIGHTS } from '../data/cards'

const INITIAL_GAME_STATE: GameState = {
  currencies: {
    [Currency.CLICKS]: 100,
    [Currency.GEMS]: 10,
    [Currency.STARDUST]: 2,
    [Currency.ESSENCE]: 0
  },
  totalClicks: 0,
  clickPower: 1,
  autoClickRate: 0,
  multiplier: 1,
  cards: INITIAL_CARDS.map(card => ({
    ...card,
    level: 0,
    owned: 0,
    inDeck: false
  })),
  deck: [],
  unlockedCards: new Set(),
  achievements: [],
  statistics: {
    totalCardsCollected: 0,
    rareCardsFound: 0,
    clicksPerSecond: 0,
    highestCombo: 0
  }
}

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('kawa-clicker-save')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        return {
          ...INITIAL_GAME_STATE,
          ...parsed,
          unlockedCards: new Set(parsed.unlockedCards || [])
        }
      } catch (e) {
        console.warn('Failed to load save data:', e)
      }
    }
    return INITIAL_GAME_STATE
  })

  // Auto-save
  useEffect(() => {
    const saveData = {
      ...gameState,
      unlockedCards: Array.from(gameState.unlockedCards)
    }
    localStorage.setItem('kawa-clicker-save', JSON.stringify(saveData))
  }, [gameState])

  // Auto-clicker effect
  useEffect(() => {
    if (gameState.autoClickRate > 0) {
      const interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          currencies: {
            ...prev.currencies,
            [Currency.CLICKS]: prev.currencies[Currency.CLICKS] +
              Math.floor(prev.autoClickRate * prev.multiplier)
          },
          statistics: {
            ...prev.statistics,
            clicksPerSecond: prev.autoClickRate
          }
        }))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [gameState.autoClickRate, gameState.multiplier])

  const performClick = useCallback(() => {
    setGameState(prev => {
      const clickValue = Math.floor(prev.clickPower * prev.multiplier)
      const newClicks = prev.currencies[Currency.CLICKS] + clickValue
      const newTotalClicks = prev.totalClicks + 1

      // Random card discovery chance (increases with total clicks)
      const discoveryChance = Math.min(0.1, newTotalClicks * 0.0001)
      let newCard: Card | null = null
      let newGems = prev.currencies[Currency.GEMS]

      if (Math.random() < discoveryChance) {
        newCard = discoverRandomCard(prev.cards, prev.unlockedCards)
        if (newCard) {
          newGems += getRarityGemReward(newCard.rarity)
        }
      }

      // Update cards array if a new card was discovered
      let newCards = prev.cards
      if (newCard) {
        newCards = prev.cards.map(card =>
          card.id === newCard.id
            ? { ...card, owned: card.owned + 1 }
            : card
        )
      }

      // Bonus gems every 100 clicks
      if (newTotalClicks % 100 === 0) {
        newGems += 1
      }

      // Stardust every 1000 clicks  
      let newStardust = prev.currencies[Currency.STARDUST]
      if (newTotalClicks % 1000 === 0) {
        newStardust += 1
      }

      return {
        ...prev,
        cards: newCards,
        currencies: {
          ...prev.currencies,
          [Currency.CLICKS]: newClicks,
          [Currency.GEMS]: newGems,
          [Currency.STARDUST]: newStardust
        },
        totalClicks: newTotalClicks,
        unlockedCards: newCard ?
          new Set([...prev.unlockedCards, newCard.id]) :
          prev.unlockedCards,
        statistics: {
          ...prev.statistics,
          totalCardsCollected: newCard ?
            prev.statistics.totalCardsCollected + 1 :
            prev.statistics.totalCardsCollected,
          rareCardsFound: newCard && isRareCard(newCard.rarity) ?
            prev.statistics.rareCardsFound + 1 :
            prev.statistics.rareCardsFound
        }
      }
    })
  }, [])

  const upgradeCard = useCallback((cardId: string) => {
    setGameState(prev => {
      const cardIndex = prev.cards.findIndex(c => c.id === cardId)
      if (cardIndex === -1) return prev

      const card = prev.cards[cardIndex]
      if (card.level >= card.maxLevel) return prev

      const upgradeCost = calculateUpgradeCost(card)
      if (!canAfford(prev.currencies, upgradeCost)) return prev

      const newCurrencies = { ...prev.currencies }
      Object.entries(upgradeCost).forEach(([currency, cost]) => {
        newCurrencies[currency as Currency] -= cost
      })

      const newCards = [...prev.cards]
      newCards[cardIndex] = {
        ...card,
        level: card.level + 1,
        owned: card.owned + 1
      }

      // Recalculate stats
      const newStats = calculateGameStats(newCards.filter(c => c.inDeck))

      return {
        ...prev,
        currencies: newCurrencies,
        cards: newCards,
        clickPower: newStats.clickPower,
        autoClickRate: newStats.autoClickRate,
        multiplier: newStats.multiplier
      }
    })
  }, [])

  const toggleCardInDeck = useCallback((cardId: string) => {
    setGameState(prev => {
      const cardIndex = prev.cards.findIndex(c => c.id === cardId)
      if (cardIndex === -1 || prev.cards[cardIndex].owned === 0) return prev

      const newCards = [...prev.cards]
      newCards[cardIndex] = {
        ...newCards[cardIndex],
        inDeck: !newCards[cardIndex].inDeck
      }

      const deckCards = newCards.filter(c => c.inDeck)
      const newStats = calculateGameStats(deckCards)

      return {
        ...prev,
        cards: newCards,
        deck: deckCards,
        clickPower: newStats.clickPower,
        autoClickRate: newStats.autoClickRate,
        multiplier: newStats.multiplier
      }
    })
  }, [])

  const buyCardPack = useCallback((packType: 'basic' | 'rare' | 'epic') => {
    const costs = {
      basic: {
        [Currency.CLICKS]: 0,
        [Currency.GEMS]: 5,
        [Currency.STARDUST]: 0,
        [Currency.ESSENCE]: 0
      },
      rare: {
        [Currency.CLICKS]: 0,
        [Currency.GEMS]: 25,
        [Currency.STARDUST]: 2,
        [Currency.ESSENCE]: 0
      },
      epic: {
        [Currency.CLICKS]: 0,
        [Currency.GEMS]: 100,
        [Currency.STARDUST]: 10,
        [Currency.ESSENCE]: 1
      }
    }

    const cost = costs[packType]

    setGameState(prev => {
      if (!canAfford(prev.currencies, cost)) return prev

      const newCurrencies = { ...prev.currencies }
      Object.entries(cost).forEach(([currency, amount]) => {
        newCurrencies[currency as Currency] -= amount
      })

      // Open pack and get cards
      const packCards = openCardPack(packType, prev.cards, prev.unlockedCards)
      const newUnlockedCards = new Set(prev.unlockedCards)
      packCards.forEach(card => newUnlockedCards.add(card.id))

      // Update cards array to increment owned count
      const newCards = prev.cards.map(card => {
        const foundCard = packCards.find(pc => pc.id === card.id)
        return foundCard ? { ...card, owned: card.owned + 1 } : card
      })

      return {
        ...prev,
        cards: newCards,
        currencies: newCurrencies,
        unlockedCards: newUnlockedCards,
        statistics: {
          ...prev.statistics,
          totalCardsCollected: prev.statistics.totalCardsCollected + packCards.length,
          rareCardsFound: prev.statistics.rareCardsFound +
            packCards.filter(card => isRareCard(card.rarity)).length
        }
      }
    })
  }, [])

  return {
    gameState,
    performClick,
    upgradeCard,
    toggleCardInDeck,
    buyCardPack
  }
}

// Helper functions
function discoverRandomCard(cards: Card[], unlockedCards: Set<string>): Card | null {
  const availableCards = cards.filter(card => !unlockedCards.has(card.id))
  if (availableCards.length === 0) return null

  const totalWeight = Object.values(RARITY_WEIGHTS).reduce((a, b) => a + b, 0)
  let random = Math.random() * totalWeight

  for (const rarity of Object.keys(RARITY_WEIGHTS)) {
    const weight = RARITY_WEIGHTS[rarity as CardRarity]
    if (random < weight) {
      const rarityCards = availableCards.filter(card => card.rarity === rarity)
      if (rarityCards.length > 0) {
        return rarityCards[Math.floor(Math.random() * rarityCards.length)]
      }
    }
    random -= weight
  }

  return availableCards[Math.floor(Math.random() * availableCards.length)]
}

function getRarityGemReward(rarity: CardRarity): number {
  const rewards = {
    [CardRarity.COMMON]: 1,
    [CardRarity.UNCOMMON]: 2,
    [CardRarity.RARE]: 5,
    [CardRarity.EPIC]: 15,
    [CardRarity.LEGENDARY]: 50,
    [CardRarity.MYTHIC]: 200
  }
  return rewards[rarity]
}

function isRareCard(rarity: CardRarity): boolean {
  return rarity === CardRarity.RARE ||
    rarity === CardRarity.EPIC ||
    rarity === CardRarity.LEGENDARY ||
    rarity === CardRarity.MYTHIC
}

function calculateUpgradeCost(card: Card): Record<Currency, number> {
  const multiplier = Math.pow(1.5, card.level)
  const cost: Record<Currency, number> = {
    [Currency.CLICKS]: 0,
    [Currency.GEMS]: 0,
    [Currency.STARDUST]: 0,
    [Currency.ESSENCE]: 0
  }

  Object.entries(card.baseCost).forEach(([currency, baseCost]) => {
    cost[currency as Currency] = Math.floor(baseCost * multiplier)
  })

  return cost
}

function canAfford(currencies: Record<Currency, number>, cost: Record<Currency, number>): boolean {
  return Object.entries(cost).every(([currency, amount]) =>
    currencies[currency as Currency] >= amount
  )
}

function calculateGameStats(deckCards: Card[]): {
  clickPower: number
  autoClickRate: number
  multiplier: number
} {
  let clickPower = 1
  let autoClickRate = 0
  let multiplier = 1

  deckCards.forEach(card => {
    if (card.level > 0) {
      const levelMultiplier = card.level

      if (card.baseEffect.clickPower) {
        clickPower += card.baseEffect.clickPower * levelMultiplier
      }
      if (card.baseEffect.autoClicks) {
        autoClickRate += card.baseEffect.autoClicks * levelMultiplier
      }
      if (card.baseEffect.multiplier) {
        multiplier *= Math.pow(card.baseEffect.multiplier, levelMultiplier)
      }
    }
  })

  return { clickPower, autoClickRate, multiplier }
}

function openCardPack(packType: 'basic' | 'rare' | 'epic', cards: Card[], unlockedCards: Set<string>): Card[] {
  const packConfigs = {
    basic: { count: 3, rarityBonus: 0 },
    rare: { count: 5, rarityBonus: 20 },
    epic: { count: 7, rarityBonus: 50 }
  }

  const config = packConfigs[packType]
  const foundCards: Card[] = []

  for (let i = 0; i < config.count; i++) {
    const card = discoverRandomCard(cards, new Set([...unlockedCards, ...foundCards.map(c => c.id)]))
    if (card) {
      foundCards.push(card)
    }
  }

  return foundCards
}
