import { Deck, suits, values } from './deck'

describe('Deck', () => {
  const myDeck = new Deck()

  it('should have 52 cards', () => {
    expect(myDeck.cards.length).toBe(52)
  })

  it('should have 13 cards of each suit', () => {
    for (const suit of suits) {
      const selectCardsBySuit = myDeck.cards.filter(
        (card) => card.suit === suit
      )
      expect(selectCardsBySuit.length).toBe(13)
    }
  })

  it('should have 4 cards of each value', () => {
    for (const value of values) {
      const selectCardsByValue = myDeck.cards.filter(
        (card) => card.value === value
      )
      expect(selectCardsByValue.length).toBe(4)
    }
  })

  it('draws top card', () => {
    const top = myDeck.drawCard()
    expect(top).toEqual({ suit: 'club', value: 'A' })
    expect(myDeck.cards.length).toBe(51)
  })

  it('draws card at specified index', () => {
    const fifteenthCard = myDeck.drawCard(14)
    expect(fifteenthCard).toEqual({ suit: 'heart', value: '3' })
    expect(myDeck.cards.length).toBe(50)
  })

  it('shuffles the deck', () => {
    const originalCards = [...myDeck.cards]
    myDeck.shuffle()
    expect(myDeck.cards).not.toEqual(originalCards)
  })
})
