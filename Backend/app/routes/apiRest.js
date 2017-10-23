/**
 * all api request declaration
 */

var express = require('express');
var router = express.Router();
var Tables = require('../controllers/Tables').tables;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/Blackjackdb";

var tables = new Tables();

/**
 * get information of the table
 */
router.get('/viewGames', function(req, res, next) {
    res.send(tables.games);
    //res.render('index', { title: 'Express' });
});

/* POST new user. */
router.get('/login', function(req, res, next) {

    var username = req.param('username');
    var pwd = req.param('pwd');

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = { username: username };
        //Verify the username if it already exists.
        db.collection("users").find(query).toArray(function(err, result) {
            if (err) throw err;
            if(result[0] != null){
                res.send('Username already existed');
                //res.send(result);
                db.close();
            }else{
                var newuser = { username: username, pwd: pwd, money: "1000" };
                db.collection("users").insertOne(newuser, function(err, res){
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                });
                //res.send('New document '.concat(username,' added'));
                res.send(result);
            }
        });
        
    });
    
});


/**
 * create an new game table
 */
router.get('/createGame', function(req, res, next) {
    var iduser = req.param('iduser');
    var gamename = req.param('gamename');
    var i;
    var flag = new Boolean(false);

    for(i=0; i < tables.games.length; i++){

        if(tables.games[i].gamename == gamename){
            console.log('This name already exist.')
            flag = new Boolean(true);
            return;
        }
    }
    if(flag == Boolean(false)){
        var a = tables.createAGame(iduser,gamename);
        console.log(a);
    }
    
    
    res.render('index', { title: 'Express' });
});

/**
 * sign a player
 */
router.get('/signin', function(req, res, next) {
    var username = req.param('username');
    var pwd = req.param('pwd');

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = { username: username, pwd: pwd };
        db.collection("users").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            db.close();
        });
    });
});

/**
 * logout a player
 */
router.post('/logout', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/**
 * UPDATE a player join the game
 */
router.get('/joinGame', function(req, res, next) {
    var gamename = req.param('gamename');
    var iduser = req.param('iduser');
    var i;
    var flag = new Boolean(false);

    for(i=0; i < tables.games.length; i++){
        
        if(tables.games[i].gamename == gamename){

            tables.games[i].addPlayer(iduser);
            flag = new Boolean(true);
            return;
        }
        
    }
    if(flag == Boolean(false)){
        console.log('This Game not exists.')
    }
    res.render('index', { title: 'Express' });
});

/**
 *  UPDATE a player leave the game
 */
router.get('/leaveGame', function(req, res, next) {
    var gamename = req.param('gamename');
    var iduser = req.param('iduser');
    var i;
    var flag = new Boolean(false);

    for(i=0; i < tables.games.length; i++){
        
        if(tables.games[i].gamename == gamename){

            tables.games[i].removePlayer(iduser);
            flag = new Boolean(true);
            return;
        }
        
    }
    if(flag == Boolean(false)){
        console.log('This Game not exists.')
    }
    res.render('index', { title: 'Express' });
});

/**
 * a player bet an amount of money and keep his cards
 */
router.post('/bet', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/**
 * the player want another card
 */
router.post('/hit', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/**
 * the player keep his card and don't want more
 */
router.post('/stand', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/**
 * The player may increase the initial bet by up to 100% in exchange for committing to stand after receiving exactly
 * one more card. The additional bet is placed in the betting box next to the original bet. Some games do not permit
 * the player to increase the bet by amounts other than 100%. Non-controlling players may double their wager or decline
 * to do so, but they are bound by the controlling player's decision to take only one card.
 */
router.post('/doubleDown', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/**
 * the player leave his cards (only available on the first call/decision)
 */
router.post('/surrender', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/**
 *
 */
router.post('/split', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;