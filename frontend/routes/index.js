var cardsJSON = require ('../cards.json');

//home
exports.home = function (req, res) {

    var cards = cardsJSON.cards;

    res.render('home.ejs', {
        title : "BlackJack",
        cards : cards
    });
};

exports.scripts = function (req, res) {
    var cards = cardsJSON.cards;

    res.render('scripts.ejs', {
        cards : cards
    });

};
//not found
exports.not_found = function (req, res){
    res.send("This is not the page you are looking for");
};