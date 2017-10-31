const MersenneTwister = require('mersenne-twister');

// MersenneTwister uses Date().getTime() as a default seed - good enough
var generator = new MersenneTwister();

const DECK = [
  {suit: 'Trefle', rank: 'Ace', value: [1, 11]},
  {suit: 'Trefle', rank: '2', value: 2},
  {suit: 'Trefle', rank: '3', value: 3},
  {suit: 'Trefle', rank: '4', value: 4},
  {suit: 'Trefle', rank: '5', value: 5},
  {suit: 'Trefle', rank: '6', value: 6},
  {suit: 'Trefle', rank: '7', value: 7},
  {suit: 'Trefle', rank: '8', value: 8},
  {suit: 'Trefle', rank: '9', value: 9},
  {suit: 'Trefle', rank: '10', value: 10},
  {suit: 'Trefle', rank: 'Jack', value: 10},
  {suit: 'Trefle', rank: 'Queen', value: 10},
  {suit: 'Trefle', rank: 'King', value: 10},

  {suit: 'Car', rank: 'Ace', value: [1, 11]},
  {suit: 'Car', rank: '2', value: 2},
  {suit: 'Car', rank: '3', value: 3},
  {suit: 'Car', rank: '4', value: 4},
  {suit: 'Car', rank: '5', value: 5},
  {suit: 'Car', rank: '6', value: 6},
  {suit: 'Car', rank: '7', value: 7},
  {suit: 'Car', rank: '8', value: 8},
  {suit: 'Car', rank: '9', value: 9},
  {suit: 'Car', rank: '10', value: 10},
  {suit: 'Car', rank: 'Jack', value: 10},
  {suit: 'Car', rank: 'Queen', value: 10},
  {suit: 'Car', rank: 'King', value: 10},

  {suit: 'Coeur', rank: 'Ace', value: [1, 11]},
  {suit: 'Coeur', rank: '2', value: 2},
  {suit: 'Coeur', rank: '3', value: 3},
  {suit: 'Coeur', rank: '4', value: 4},
  {suit: 'Coeur', rank: '5', value: 5},
  {suit: 'Coeur', rank: '6', value: 6},
  {suit: 'Coeur', rank: '7', value: 7},
  {suit: 'Coeur', rank: '8', value: 8},
  {suit: 'Coeur', rank: '9', value: 9},
  {suit: 'Coeur', rank: '10', value: 10},
  {suit: 'Coeur', rank: 'Jack', value: 10},
  {suit: 'Coeur', rank: 'Queen', value: 10},
  {suit: 'Coeur', rank: 'King', value: 10},

  {suit: 'Pique', rank: 'Ace', value: [1, 11]},
  {suit: 'Pique', rank: '2', value: 2},
  {suit: 'Pique', rank: '3', value: 3},
  {suit: 'Pique', rank: '4', value: 4},
  {suit: 'Pique', rank: '5', value: 5},
  {suit: 'Pique', rank: '6', value: 6},
  {suit: 'Pique', rank: '7', value: 7},
  {suit: 'Pique', rank: '8', value: 8},
  {suit: 'Pique', rank: '9', value: 9},
  {suit: 'Pique', rank: '10', value: 10},
  {suit: 'Pique', rank: 'Jack', value: 10},
  {suit: 'Pique', rank: 'Queen', value: 10},
  {suit: 'Pique', rank: 'King', value: 10}
];

class Deck {
  constructor(numDecks) {
    this.shoe = [];     // holds all the cards
    this.maxSize = 0;

    // add n deck in the shoe
    for (let i = 0; i < numDecks; i++) {
      const newDeck = this.getShuffledDeck();

      // add a new deck in the shoe
      this.shoe = [...newDeck, ...this.shoe];

      // increase max size of deck
      this.maxSize += newDeck.length;
    }

    // shuffle all the decks
    this.shoe.map((x, i, shoe) => swap(shoe, i, Math.floor((generator.random() * shoe.length))))
  }

  /**
   * get a new shuffled array instance of DECK
   * @returns {Array} the new deck
   */
  getShuffledDeck() {
    // Create a new deck, with new card objects we want new card objects, in case we decide to alter the cards later.
    const newDeck = DECK.map((x) => x);

    // shuffle the new deck and place on the shoe
    newDeck.map((x, i, shoe) => swap(newDeck, i, Math.floor(generator.random() * shoe.length)));

    return newDeck;
  }

  /**
   * Deal a card or cards from the shoe. The card should no longer be in the shoe.
   * @param {Number} [num] Optional number of cards to deal, if not present, deals 1.
   * @return {Number|Number[]} Card into deck or an array of Cards
   */
  deal(num = 1) {
    if (this.shoe.length < num) throw new Error('Not enough cards to deal');

    if (num === 1) return this.shoe.shift();

    // case where num > 1
    let cards = [];
    for (let i = 0; i < num; i++) cards = [...cards, this.shoe.shift()];

    return cards;
  };

  /**
   * True if dealt over 75% of the cards in the deck
   * @return {Boolean} true if past cut point and false otherwise
   */
  pastCutPoint() {
    var percentLeft = Math.floor((this.shoe.length / this.maxSize) * 100);
    if (percentLeft < 25)
      return true;
    return false;
  };

}

/**
 * Convenience function to swap 2 cards in a deck.
 * @param {Object[]} deck The deck in which to swap two cards.
 * @param {Number} card1Idx Index of the first card to be swapped.
 * @param {Number} card2Idx Index of the second card to be swapped.
 */
function swap(deck, card1Idx, card2Idx) {
  let tmp = deck[card1Idx];
  deck[card1Idx] = deck[card2Idx];
  deck[card2Idx] = tmp;
}

/**
 * evalHand evaluates a hand, returning numeric values.
 * @param {Object[]} hand set of cards making a hand to evaluate
 * @return {Number} The value for the hand.
 */
function evalHand(hand) {
  // find the number of ace in the hand
  let numAces = hand.reduce((tmp, x) => x.rank === 'Ace' ? tmp + 1 : tmp, 0);

  // compute the hand's score (an ace's value is 11)
  let score = hand.reduce((tmp, x) => x.rank === 'Ace' ? tmp + 11 : tmp + x.value, 0);

  // while the score is over 21 and there is aces in the hand score -= 10
  while (score > 21 && numAces) {
    score -= 10;
    numAces--;
  }

  return score;
}

/**
 * true if a hand's value is over 21, false otherwise.
 * @param {Object[]} hand An array of cards.
 * @return {Boolean} true if the hand has a value of over 21, false otherwise
 */
function isBusted(hand) {
  console.log("in isBusted");

  return evalHand(hand) > 21;
}

/**
 * true if a dealer's hand is below a hard 17, false otherwise.
 * @param {Object[]} hand An array of cards.
 * @return {Boolean} true, if the hand is below a hard 17, false otherwise
 */
function belowHard17(hand) {
  return evalHand(hand) < 17;
}

/**
 * Determine the score for a hand.
 * @param {Object[]} hand An array of cards.
 * @return {Number} The ineteger value of the hand.
 */
function scoreHand(hand) {
  return evalHand(hand);
}

module.exports = {
  Deck: Deck,
  isBusted: isBusted,
  belowHard17: belowHard17,
  scoreHand: scoreHand,
};