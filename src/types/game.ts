export const CardRarity = {
  COMMON: 'common',
  UNCOMMON: 'uncommon',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary',
  MYTHIC: 'mythic'
} as const

export type CardRarity = typeof CardRarity[keyof typeof CardRarity]

export const CardType = {
  CLICKER: 'clicker',
  GENERATOR: 'generator',
  MULTIPLIER: 'multiplier',
  SPECIAL: 'special'
} as const

export type CardType = typeof CardType[keyof typeof CardType]

export const Currency = {
  CLICKS: 'clicks',
  GEMS: 'gems',
  STARDUST: 'stardust',
  ESSENCE: 'essence'
} as const

export type Currency = typeof Currency[keyof typeof Currency]

export interface Card {
  id: string
  name: string
  description: string
  rarity: CardRarity
  type: CardType
  level: number
  maxLevel: number
  baseCost: Record<Currency, number>
  baseEffect: {
    clickPower?: number
    autoClicks?: number
    multiplier?: number
    special?: string
  }
  owned: number
  inDeck: boolean
  artwork?: string
}

export interface GameState {
  currencies: Record<Currency, number>
  totalClicks: number
  clickPower: number
  autoClickRate: number
  multiplier: number
  cards: Card[]
  deck: Card[]
  unlockedCards: Set<string>
  achievements: string[]
  statistics: {
    totalCardsCollected: number
    rareCardsFound: number
    clicksPerSecond: number
    highestCombo: number
  }
}

export interface ShopItem {
  id: string
  name: string
  description: string
  cost: Record<Currency, number>
  type: 'card_pack' | 'upgrade' | 'special'
  rarity?: CardRarity
  cardCount?: number
}
