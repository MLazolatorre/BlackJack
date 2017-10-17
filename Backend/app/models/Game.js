/**
 * Created by MARC LAZOLA TORRE on 21/09/2017.
 */

var Deck = require('../models/cards').deck;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/Blackjackdb";
var Player = require('../models/player').player;

function Game(idplayer, gamename) {
	this.deck = new Deck();
    this.deck.filDeck(3);
    this.idplayer = idplayer;
    this.gamename = gamename;
    this.players = new Array(6);
}

Game.prototype.startGame = function(){
	var i;
	for(i=0; i< this.players.length; i++){

	}
}

Game.prototype.addPlayer = function(idplayer){

	var i;
	var flag = new Boolean(false);
	for(i=0; i < this.players.length; i++){
		if(this.players[i] == null){
			/*MongoClient.connect(url, function(err, db){
				var query = { _id: idplayer };
				db.collection("users").find(query).toArray(function(err, result) {
					if (err) throw err;

					if(result[0] != null){
                		res.send('User do not exists');
                		//res.send(result);
                		db.close();
            		}else{
            			this.players[i] = idplayer;
            			this.players[i].id = result[0]._id;
            			this.players[i].username = result[0].username;
            			this.players[i].money = result[0].money;
            			flag = new Boolean(true);
						return;
            		}
				});
			});*/
			this.players[i] = idplayer;
			flag = new Boolean(true);
			return;
		}
	}
	if(flag == Boolean(false))
		console.log("This Game is full.");
}

Game.prototype.removePlayer = function(idplayer){

	var i;
	var flag = new Boolean(false);
	for(i=0; i < 6; i++){
		if(this.players[i] == idplayer){
			this.players[i] = null;
			flag = new Boolean(true);
			return;
		}
	}
	if(flag == Boolean(false))
		console.log("You are not in this game.");
}

Game.prototype.add = function() {
    return "blabla";
};

module.exports = {
    game: Game,
}

