import type { Card } from '../types/game'
import { CardRarity, CardType, Currency } from '../types/game'

export const INITIAL_CARDS: Omit<Card, 'level' | 'owned' | 'inDeck'>[] = [
  // Common Cards (Click Power)
  {
    id: 'rookie_clicker',
    name: 'Rookie Clicker',
    description: 'Your first step into the world of clicking. +1 click power.',
    rarity: CardRarity.COMMON,
    type: CardType.CLICKER,
    maxLevel: 10,
    baseCost: { [Currency.CLICKS]: 10, [Currency.GEMS]: 0, [Currency.STARDUST]: 0, [Currency.ESSENCE]: 0 },
    baseEffect: { clickPower: 1 }
  },
  {
    id: 'iron_finger',
    name: 'Iron Finger',
    description: 'Strengthened by countless clicks. +2 click power.',
    rarity: CardRarity.COMMON,
    type: CardType.CLICKER,
    maxLevel: 8,
    baseCost: { [Currency.CLICKS]: 25, [Currency.GEMS]: 0, [Currency.STARDUST]: 0, [Currency.ESSENCE]: 0 },
    baseEffect: { clickPower: 2 }
  },
  {
    id: 'swift_tap',
    name: 'Swift Tap',
    description: 'Quick reflexes for rapid clicking. +3 click power.',
    rarity: CardRarity.COMMON,
    type: CardType.CLICKER,
    maxLevel: 6,
    baseCost: { [Currency.CLICKS]: 50, [Currency.GEMS]: 1, [Currency.STARDUST]: 0, [Currency.ESSENCE]: 0 },
    baseEffect: { clickPower: 3 }
  },

  // Uncommon Cards (Auto Clickers)
  {
    id: 'auto_finger',
    name: 'Auto Finger',
    description: 'A mechanical finger that clicks for you. 1 auto-click per second.',
    rarity: CardRarity.UNCOMMON,
    type: CardType.GENERATOR,
    maxLevel: 15,
    baseCost: { [Currency.CLICKS]: 100, [Currency.GEMS]: 2, [Currency.STARDUST]: 0, [Currency.ESSENCE]: 0 },
    baseEffect: { autoClicks: 1 }
  },
  {
    id: 'click_bot',
    name: 'Click Bot',
    description: 'Advanced automation technology. 3 auto-clicks per second.',
    rarity: CardRarity.UNCOMMON,
    type: CardType.GENERATOR,
    maxLevel: 12,
    baseCost: { [Currency.CLICKS]: 250, [Currency.GEMS]: 5, [Currency.STARDUST]: 1, [Currency.ESSENCE]: 0 },
    baseEffect: { autoClicks: 3 }
  },
  {
    id: 'thunder_clicker',
    name: 'Thunder Clicker',
    description: 'Powered by lightning itself. +5 click power.',
    rarity: CardRarity.UNCOMMON,
    type: CardType.CLICKER,
    maxLevel: 10,
    baseCost: { [Currency.CLICKS]: 200, [Currency.GEMS]: 3, [Currency.STARDUST]: 0, [Currency.ESSENCE]: 0 },
    baseEffect: { clickPower: 5 }
  },

  // Rare Cards (Multipliers)
  {
    id: 'ruby_amplifier',
    name: 'Ruby Amplifier',
    description: 'A precious gem that amplifies your efforts. 1.5x multiplier.',
    rarity: CardRarity.RARE,
    type: CardType.MULTIPLIER,
    maxLevel: 8,
    baseCost: { [Currency.CLICKS]: 500, [Currency.GEMS]: 10, [Currency.STARDUST]: 2, [Currency.ESSENCE]: 0 },
    baseEffect: { multiplier: 1.5 }
  },
  {
    id: 'crystal_core',
    name: 'Crystal Core',
    description: 'Mystical crystal that boosts all abilities. 2x multiplier.',
    rarity: CardRarity.RARE,
    type: CardType.MULTIPLIER,
    maxLevel: 6,
    baseCost: { [Currency.CLICKS]: 1000, [Currency.GEMS]: 20, [Currency.STARDUST]: 5, [Currency.ESSENCE]: 1 },
    baseEffect: { multiplier: 2.0 }
  },
  {
    id: 'quantum_clicker',
    name: 'Quantum Clicker',
    description: 'Exists in multiple dimensions. 8 auto-clicks per second.',
    rarity: CardRarity.RARE,
    type: CardType.GENERATOR,
    maxLevel: 10,
    baseCost: { [Currency.CLICKS]: 800, [Currency.GEMS]: 15, [Currency.STARDUST]: 3, [Currency.ESSENCE]: 0 },
    baseEffect: { autoClicks: 8 }
  },

  // Epic Cards
  {
    id: 'diamond_fist',
    name: 'Diamond Fist',
    description: 'Unbreakable determination. +25 click power.',
    rarity: CardRarity.EPIC,
    type: CardType.CLICKER,
    maxLevel: 5,
    baseCost: { [Currency.CLICKS]: 2000, [Currency.GEMS]: 50, [Currency.STARDUST]: 10, [Currency.ESSENCE]: 2 },
    baseEffect: { clickPower: 25 }
  },
  {
    id: 'time_dilator',
    name: 'Time Dilator',
    description: 'Bends time to your will. 3x multiplier.',
    rarity: CardRarity.EPIC,
    type: CardType.MULTIPLIER,
    maxLevel: 4,
    baseCost: { [Currency.CLICKS]: 3000, [Currency.GEMS]: 75, [Currency.STARDUST]: 15, [Currency.ESSENCE]: 5 },
    baseEffect: { multiplier: 3.0 }
  },
  {
    id: 'void_engine',
    name: 'Void Engine',
    description: 'Harnesses the power of the void. 25 auto-clicks per second.',
    rarity: CardRarity.EPIC,
    type: CardType.GENERATOR,
    maxLevel: 8,
    baseCost: { [Currency.CLICKS]: 5000, [Currency.GEMS]: 100, [Currency.STARDUST]: 25, [Currency.ESSENCE]: 5 },
    baseEffect: { autoClicks: 25 }
  },

  // Legendary Cards
  {
    id: 'celestial_touch',
    name: 'Celestial Touch',
    description: 'Blessed by the gods themselves. +100 click power.',
    rarity: CardRarity.LEGENDARY,
    type: CardType.CLICKER,
    maxLevel: 3,
    baseCost: { [Currency.CLICKS]: 10000, [Currency.GEMS]: 200, [Currency.STARDUST]: 50, [Currency.ESSENCE]: 15 },
    baseEffect: { clickPower: 100 }
  },
  {
    id: 'infinity_loop',
    name: 'Infinity Loop',
    description: 'An endless cycle of power. 5x multiplier.',
    rarity: CardRarity.LEGENDARY,
    type: CardType.MULTIPLIER,
    maxLevel: 3,
    baseCost: { [Currency.CLICKS]: 15000, [Currency.GEMS]: 300, [Currency.STARDUST]: 75, [Currency.ESSENCE]: 25 },
    baseEffect: { multiplier: 5.0 }
  },
  {
    id: 'cosmic_generator',
    name: 'Cosmic Generator',
    description: 'Powered by starlight. 100 auto-clicks per second.',
    rarity: CardRarity.LEGENDARY,
    type: CardType.GENERATOR,
    maxLevel: 5,
    baseCost: { [Currency.CLICKS]: 20000, [Currency.GEMS]: 400, [Currency.STARDUST]: 100, [Currency.ESSENCE]: 20 },
    baseEffect: { autoClicks: 100 }
  },

  // Mythic Cards
  {
    id: 'origin_click',
    name: 'Origin Click',
    description: 'The first click that started everything. +500 click power.',
    rarity: CardRarity.MYTHIC,
    type: CardType.CLICKER,
    maxLevel: 1,
    baseCost: { [Currency.CLICKS]: 100000, [Currency.GEMS]: 1000, [Currency.STARDUST]: 500, [Currency.ESSENCE]: 100 },
    baseEffect: { clickPower: 500 }
  },
  {
    id: 'reality_breaker',
    name: 'Reality Breaker',
    description: 'Transcends all limitations. 10x multiplier.',
    rarity: CardRarity.MYTHIC,
    type: CardType.MULTIPLIER,
    maxLevel: 1,
    baseCost: { [Currency.CLICKS]: 150000, [Currency.GEMS]: 1500, [Currency.STARDUST]: 750, [Currency.ESSENCE]: 150 },
    baseEffect: { multiplier: 10.0 }
  },
  {
    id: 'universe_engine',
    name: 'Universe Engine',
    description: 'The power of creation itself. 1000 auto-clicks per second.',
    rarity: CardRarity.MYTHIC,
    type: CardType.GENERATOR,
    maxLevel: 1,
    baseCost: { [Currency.CLICKS]: 200000, [Currency.GEMS]: 2000, [Currency.STARDUST]: 1000, [Currency.ESSENCE]: 200 },
    baseEffect: { autoClicks: 1000 }
  }
]

export const RARITY_COLORS = {
  [CardRarity.COMMON]: '#9ca3af',
  [CardRarity.UNCOMMON]: '#10b981',
  [CardRarity.RARE]: '#3b82f6',
  [CardRarity.EPIC]: '#8b5cf6',
  [CardRarity.LEGENDARY]: '#f59e0b',
  [CardRarity.MYTHIC]: '#ef4444'
}

export const RARITY_WEIGHTS = {
  [CardRarity.COMMON]: 50,
  [CardRarity.UNCOMMON]: 30,
  [CardRarity.RARE]: 15,
  [CardRarity.EPIC]: 4,
  [CardRarity.LEGENDARY]: 0.9,
  [CardRarity.MYTHIC]: 0.1
}
