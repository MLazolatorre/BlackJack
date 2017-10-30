class Player {
  constructor(id, name, credits) {
    this.id = id;
    this.name = name;
    this.credits = credits;
    this.tableId = -1;      // lobby
    this.bet = -1;          // not playing hand
    this.hand = [];
  }
}

module.exports = Player;