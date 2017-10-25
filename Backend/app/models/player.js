const is = require('is2');

let nextPlayerId = 1;

class Player {
  constructor(name, credit) {
    this.id = nextPlayerId++;
    this.name = name;
    this.credits = credits;
    this.online = false;
    this.tableId = -1;      // lobby
    this.bet = -1;          // not playing hand
    this.hand = [];
    this.busted = false;
    this.done = false;
  }

  view(state) {
    const data = {
      name: this.name,
      bet: this.bet,
      hand: this.hand,
      done: this.done,
      busted: this.busted
    };
    if (this.hand2) data.hand2 = this.hand2;

    if (state === COMPLETE) {
      if (this.push) data.push = this.push;

      data.win = this.win;
    }
    return data;
  }

  startHandState() {
    delete this.won;
    delete this.result;
    delete this.push;

    this.openingMove = true;
    this.done = false;
    this.hand = [];
    this.bet = -1;
  };
}

class PlayerList {
  constructor() {
    this.all = {};              // all players
    this.nameToId = {};    // map name to id
  }

  addPlayer(name, credit = 1000) {
    // we must create the player
    var player = new Player(name, credit);
    this.nameToId[name] = player.id;
    this.all[player.id] = player;
    return player.id;
  };

  login(name) {
    var playerId = this.nameToId[name];
    if (!playerId) playerId = this.addPlayer(name);

    this.online[playerId] = this.all[playerId];
    this.online[playerId].online = true;
    return playerId;
  };

  logout(id) {
    var player = this.online[id];
    player.online = false;
    delete this.online[id];
    return player.credits;
  };

  getByName(name) {
    var playerId = this.nameToId[name];
    if (is.undef(playerId)) return false;

    return this.all[playerId];
  };

  getById(playerId) {
    if (is.undef(this.all[playerId])) return false;

    return this.all[playerId];
  }

}

module.exports = new PlayerList ();