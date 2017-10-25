/**
 * Created by MARC LAZOLA TORRE on 21/09/2017.
 */

var Game = require('../models/Game');

class Tables {

  constructor() {
    this.numTable = 5;
    this.all = {};
    for (let i = 0; i < this.numTable; i++) {
      let newGame = new Game();
      this.all[newGame.id] = newGame;
    }
  }

  viewTables() {
    return Object.keys(this.all).map((x) => this.all[x].view());
  }

  getById(id) {
    return this.all[id];
  }
}

module.exports = new Tables();