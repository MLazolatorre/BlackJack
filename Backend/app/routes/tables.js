var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/Blackjackdb";

/* POST new table. */
router.get('/createTable', function(req, res, next) {
	var tablename = req.param('tablename');
	var iduser = req.param('iduser');
	var pwd = req.param('pwd');

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var newtable = { name: tablename, pwd: pwd, iduser: iduser };
	db.collection("table").insertOne(newtable, function(err, res) {
		if (err) throw err;
    	console.log("1 document inserted");
    	db.close();
    });
});

 	res.send('respond with a resource');
});



module.exports = router;