var assert = require('assert');

const deck = [
    { suit: 'clubs', rank: 'Ace', value: [ 1, 11 ] },
    { suit: 'clubs', rank: '2', value: 2 },
    { suit: 'clubs', rank: '3', value: 3 },
    { suit: 'clubs', rank: '4', value: 4 },
    { suit: 'clubs', rank: '5', value: 5 },
    { suit: 'clubs', rank: '6', value: 6 },
    { suit: 'clubs', rank: '7', value: 7 },
    { suit: 'clubs', rank: '8', value: 8 },
    { suit: 'clubs', rank: '9', value: 9 },
    { suit: 'clubs', rank: '10', value: 10 },
    { suit: 'clubs', rank: 'Jack', value: 10 },
    { suit: 'clubs', rank: 'Queen', value: 10 },
    { suit: 'clubs', rank: 'King', value: 10 },

    { suit: 'diamonds', rank: 'Ace', value: [ 1, 11 ] },
    { suit: 'diamonds', rank: '2', value: 2 },
    { suit: 'diamonds', rank: '3', value: 3 },
    { suit: 'diamonds', rank: '4', value: 4 },
    { suit: 'diamonds', rank: '5', value: 5 },
    { suit: 'diamonds', rank: '6', value: 6 },
    { suit: 'diamonds', rank: '7', value: 7 },
    { suit: 'diamonds', rank: '8', value: 8 },
    { suit: 'diamonds', rank: '9', value: 9 },
    { suit: 'diamonds', rank: '10', value: 10 },
    { suit: 'diamonds', rank: 'Jack', value: 10 },
    { suit: 'diamonds', rank: 'Queen', value: 10 },
    { suit: 'diamonds', rank: 'King', value: 10 },

    { suit: 'hearts', rank: 'Ace', value: [ 1, 11 ] },
    { suit: 'hearts', rank: '2', value: 2 },
    { suit: 'hearts', rank: '3', value: 3 },
    { suit: 'hearts', rank: '4', value: 4 },
    { suit: 'hearts', rank: '5', value: 5 },
    { suit: 'hearts', rank: '6', value: 6 },
    { suit: 'hearts', rank: '7', value: 7 },
    { suit: 'hearts', rank: '8', value: 8 },
    { suit: 'hearts', rank: '9', value: 9 },
    { suit: 'hearts', rank: '10', value: 10 },
    { suit: 'hearts', rank: 'Jack', value: 10 },
    { suit: 'hearts', rank: 'Queen', value: 10 },
    { suit: 'hearts', rank: 'King', value: 10 },

    { suit: 'spades', rank: 'Ace', value: [ 1, 11 ] },
    { suit: 'spades', rank: '2', value: 2 },
    { suit: 'spades', rank: '3', value: 3 },
    { suit: 'spades', rank: '4', value: 4 },
    { suit: 'spades', rank: '5', value: 5 },
    { suit: 'spades', rank: '6', value: 6 },
    { suit: 'spades', rank: '7', value: 7 },
    { suit: 'spades', rank: '8', value: 8 },
    { suit: 'spades', rank: '9', value: 9 },
    { suit: 'spades', rank: '10', value: 10 },
    { suit: 'spades', rank: 'Jack', value: 10 },
    { suit: 'spades', rank: 'Queen', value: 10 },
    { suit: 'spades', rank: 'King', value: 10 }
];


// ensure the ordered deck is as expected
assert.ok(is.array(DECK));
assert.ok(DECK.length === 52);

function FinalDeck(numDeck){
    this.card = [];
    this.size = 0;
    var i;
    
    for(i=0; i<numDeck; i++){
        var newDeck = new Array(deck.length);
        var j;
        for(j=0; j<deck.length; j++){
            newDeck[i] = i;
        }
        shuffleDeck(newDeck);
        for (i=0; i<newDeck.length; i++) {
            this.cards.push(newDeck[i]);
        }

    }
}



function shuffleDeck(deck){

    var j, x, i;
    for (i = deck.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = deck[i - 1];
        deck[i - 1] = deck[j];
        deck[j] = x;
    }

}