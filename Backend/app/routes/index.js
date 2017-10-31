//home
exports.home = function (req, res) {
    res.render('home.ejs', {
        title : "BlackJack",
        idTable: req.params.idTable,
        idPlayer: req.params.idPlayer,
    });
};

exports.connect = function (req, res) {
    res.render('connect.ejs', {
        title : "Login",
    });
};

exports.scripts = function (req, res) {
    res.render('scripts.ejs', {
    });

};
//not found
exports.not_found = function (req, res){
    res.send("This is not the page you are looking for");
};