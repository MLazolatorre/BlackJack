var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/Blackjackdb";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST new user. */
router.get('/createUser', function(req, res, next) {

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

/* GET users info. */
router.get('/connexion', function(req, res, next) {
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



module.exports = router;
