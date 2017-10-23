/**
 * Constructor for the Player. Which stores, credits (money) and name,
 * @constructor
 * @param {String} name player name
 * @param {Number} credits amount of money the player has
 */
function Player(name, credits) {
	if (is.undef(credits))
		credits = 1000;

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