/**
 * Created by MARC LAZOLA TORRE on 21/09/2017.
 */

var Game = require('../models/Game').game;

var games = [];

/**
 *
 * @constructor
 */
function Tables() {
	this.games = [];
}

/**
 * Create a new game
 * @param idPlayer
 * @returns {Game}
 */
Tables.prototype.createAGame = function (idPlayer, gamename) {
    var newParty = new Game(idPlayer,gamename);
    this.games.push(newParty);

    return newParty;
};

/**
 * Get all the games played now
 * @returns {Game[]}
 */
Tables.prototype.getAllGames = function() {
    return this.games;
};

/**
 * get the player's game or null if it doesn't exist
 * @param idPlayer
 * @returns {Game | null}
 */
Tables.prototype.getGameOfPlayer = function(idPlayer) {
    for (var i = 0; i < game.length; i ++) {
        if (games[i].findPlayer(idPlayer)) return games[i];
    }

    return null;
};

module.exports = Tables;