type Card = { suit: Suit; value: Value }
type Suit = 'spade' | 'heart' | 'diamond' | 'club'
type Value =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'A'

export const suits: Suit[] = ['spade', 'heart', 'diamond', 'club']
export const values: Value[] = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
]

export class Deck {
  public cards: Card[] = []

  constructor() {
    this.reset()
  }

  reset(): void {
    for (const suit of suits) {
      for (const value of values) {
        this.cards.push({ suit, value })
      }
    }
  }

  drawCard(index?: number): Card | -1 {
    // If no index supplied, it pulls from the 'top' (aka the end of the array)
    // If selected card index does not exist return -1
    if (this.cards.length <= 0) {
      console.log('Deck is empty!')
      return -1
    }

    if (index && index > this.cards.length - 1) {
      console.log('Selected card index does not exist!')
      return -1
    }

    const selected = index
      ? this.cards[index]
      : this.cards[this.cards.length - 1]

    // Remove card from the deck
    this.cards = this.cards.filter(
      // prettier-ignore
      (card) => !(card.suit === selected.suit && card.value === selected.value)
    )

    return selected
  }

  shuffle(): void {
    // TODO
  }
}
