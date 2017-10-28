var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var routes = require('./routes');

var path = require('path');
app.use(express.static(path.join(__dirname, '/public')));


//Routes

//home
app.get('/', routes.home);

//not found

app.get('*', routes.not_found);

app.listen(3000, function () {
console.log('App running on port 3000!');
});