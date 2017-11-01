const Cards = require('./Cards');
const Players = require('./player');
const emitter = require('../service/Emitter');

let nextTableId = 1;
const WAITING = 0;
const BETTING = 1;
const DEALING = 2;
const COMPLETE = 3;
const STATES = {
  '0': 'waiting for players',
  '1': 'betting',
  '2': 'dealing',
  '3': 'hand complete'
};

class Game {

  constructor() {
    this.idTable = nextTableId++;
    this.players = {};
    this.state = WAITING;
    this.numDecks = 8;
    this.Shoe = new Cards.Deck(this.numDecks);
    this.betTimeMs = 60000;
    this.betTimer = null;
    this.dealersHand = [];
  }

  get id() {
    return this.idTable;
  }

  view() {
    let data = {
      idTable: this.idTable,
      players: {}
    };

    // if the dealer have some cards
    if (this.dealersHand.length) {
      const dealer = {name: 'Dealer'};

      // if the state is 'DEALING'
      if (this.state === DEALING) {
        dealer.hand = this.dealersHand.slice(0, 1);
        dealer.hand.push('face down card');
      } else {
        dealer.hand = this.dealersHand.slice(0);
      }
      data.dealer = dealer;
    }

    let numPlayers = 0;

    for (let p in this.players) {
      data.players[this.players[p].idTable] = this.players[p].view(this.state);
      numPlayers++;
    }

    data.numPlayers = numPlayers;
    data.state = STATES[this.state];

    return data;
  }

  numPlayers() {
    return this.players.keys().length;
  }

  numInterested() {
    if (this.state !== BETTING && this.state !== DEALING) return 0;

    return Object.keys(this.players).reduce((tmp, x) =>
      (this.players[x].bet < 1 || this.players[x].busted || this.players[x].done) ? tmp : tmp + 1, 0);
  }

  addPlayer(playerId) {
    this.players[playerId] = Players.getById(playerId);
    this.players[playerId].tableId = this.idTable;

    if (this.numPlayers === 1) this.players[playerId].controlling = true;

    emitter.emit('joinRoom', this.id);

    if (this.state === WAITING) this.startBetting();
  }

  rmPlayer(playerId) {
    if (this.players[playerId].bet > -1) this.players[playerId].credits -= this.players[playerId].bet;

    this.players[playerId].tableId = -1;
    delete this.players[playerId];

    emitter.emit('playerLeaveTable', this.id, playerId);

    if (this.numPlayers() === 0) this.state = WAITING;
  }

  startBetting() {
    this.state = BETTING;
  }

  bet(playerId, bet) {
    if (this.state !== BETTING) throw new Error(`Attempt to bet when table is in state: ${STATES[this.state]}`);

    if (!this.players[playerId]) throw new Error(`${playerId} is not at table ${this.tableId}`);

    this.players[playerId].startHandState();
    this.players[playerId].bet = bet;

    // if all players have bet then advance state of game
    const everyOneHasBet = Object.keys(this.players).every((p) => (this.players[p] && this.players[p].bet) ? true : false);

    emitter.emit('bet', this.id, playerId, bet);

    if (everyOneHasBet) {
      this.state = DEALING;
        this.dealCards();
        emitter.emit('allbet', this.id);
    } else {
      console.log('Everyone has NOT bet!');
    }
  }

  /**
   *
   * @param playerId
   * @param hand
   */
  hit(playerId) {
    if (this.state !== DEALING) throw new Error(`Attempt to hit when table is in state: ${STATES[this.state]}`);

    if (!this.players[playerId]) throw new Error(`${playerId} is not at table ${this.tableId}`);

    console.log('In hit, bet is: ' + this.players[playerId].bet);

    if (this.players[playerId].bet < 1) throw new Error('Requested hit when player has no bet.');

    if (this.players[playerId].done) throw new Error('Requested hit when player has no interest in hand.');

    const newCard = this.Shoe.deal();

    this.players[playerId].hand.push(newCard);

    if (Cards.isBusted(this.players[playerId].hand)) {
      this.players[playerId].busted = true;
      this.players[playerId].done = true;
      this.credits -= Number(this.bet);
    }

    emitter.emit('hit', playerId, newCard);

    console.log(`HIT: num interested: ${this.numInterested()}`);

    if (this.numInterested() === 0) this.finishHand();
  }

  stand(playerId) {
    if (this.state !== DEALING) throw new Error(`Attempt to stand when table is in state: ${STATES[this.state]}`);

    if (!this.players[playerId]) throw new Error(`${playerId} is not at table ${this.tableId}`);

    if (this.players[playerId].bet < 1) throw new Error('Requested to stand when player has no bet.');

    if (this.players[playerId].done) throw new Error(`Requested to stand when player has no interest in ${hand}.`);

    this.players[playerId].done = true;

    console.log(`STAND: num interested: ${this.numInterested()}`);

    if (this.numInterested() === 0) {
      this.finishHand();
    }
  };

  dealCards() {
    this.dealersHand = this.Shoe.deal(2);

    Object.keys(this.players).forEach((x) => {
      const player = this.players[x];
      console.log('Dealing to ' + player.name);

      if (player.bet < 1) {
        console.log(player.name + ' has not bet!');
      } else {
        player.hand = this.Shoe.deal(2);
        player.openingMove = true;
      }
    });
  }

  maxPlayerScore() {
    let max = 0;

    Object.keys(this.players).forEach((player) => {
      this.players[player].score = Cards.scoreHand(this.players[player].hand);

      if (this.players[player].score > 21) {
        console.log(`${this.players[player].name} busted with ${this.players[player].score}`);
        this.players[player].busted = true;

        return;
      }

      this.players[player].busted = false;

      if (this.players[player].score > max) max = this.players[player].score;
    });

    console.log(`Max player score is ${max}`);

    return max;
  }

  /**
   * To know if the dealer get the better hand (all the player loose)
   * @param maxScore
   * @returns {boolean}
   */
  dealerMustDraw(maxScore) {
    let dealerScore = Cards.scoreHand(this.dealersHand);
    console.log(`dealerMustDraw: dealerScore ${dealerScore} <= maxScore ${maxScore} (${dealerScore <= maxScore})`);

    return (dealerScore <= maxScore);
  };

  /**
   * compute who win the party and add the credit to the winner
   */
  finishHand() {
    this.state = COMPLETE;
    var max = this.maxPlayerScore();

    // Hits if below hard 17
    while (Cards.belowHard17(this.dealersHand) && this.dealerMustDraw(max)) {
      let card = this.Shoe.deal(1);
      console.log(`Dealer draws ${card.rank} of ${card.suit}`);
      this.dealersHand.push(card);
    }

    // were done with the shoe for this hand, check to see if we are past the cut point, if so replace the shoe
    if (this.Shoe.pastCutPoint()) {
      console.log(`Table ${this.idTable}'s shoe is past the cut-point, replacing shoe.`);
      this.Shoe = new Cards.Deck(this.numDecks);
    }

    const dealerBusted = Cards.isBusted(this.dealersHand);
    const dealerScore = Cards.scoreHand(this.dealersHand);

    console.log(`Dealer busted ${dealerBusted}, dealer score: ${dealerScore}`);

    // handle bets
    Object.keys(this.players).forEach((p) => {
      const player = this.players[p];

      if (dealerBusted) {         // dealer busted
        if (player.busted) {
          // push
          player.win = false;
          player.push = true;
          console.log(`It's a push everyone busted.`);
        } else {
          console.log('Players wins, dealer busted.');
          player.win = true;
          player.credits += Number(player.bet);
        }
        return;
      }

      // dealer didTable not bust
      if (player.busted) {
        console.log('Player busted!');

        player.win = false;
        player.credits -= Number(player.bet);

      } else {
        if (dealerScore > player.score) {
          console.log(`Dealer score is higher than ${player.name}'s score: ${dealerScore} > ${player.score}`);

          player.win = false;
          player.credits -= Number(player.bet);

        } else if (dealerScore < player.score) {
          console.log(`${player.name}'s score is higher than dealer score: ${dealerScore} > ${player.score}`);

          player.win = true;
          player.credits += Number(player.bet);

        } else {
          console.log(`It's a push tie score at: ${dealerScore} = ${player.score}`);

          player.win = false;
          player.push = true;
        }
      }
    });

    // store results in results for each player
    Object.keys(this.players).forEach((p) => {
      const player = this.players[p];

      player.result = this.view();
      player.bet = -1;

      delete player.push;
      delete player.win;

      player.hand = [];
      player.busted = false;
      player.done = false;
    });
    this.state = BETTING;

    emitter.emit('allplay', this.id, this.view());
  };
}

module.exports = Game;

