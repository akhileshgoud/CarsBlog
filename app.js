var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var getJSON = require('get-json');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/uitestDatabase';

var routes = require('./routes/index');
var cars = require('./routes/cars');


// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));


//reseting the serverdb 
var resetAllCars = function(db, res) {
  db.collection('newcarList').drop();
    res.send("success");
};

app.use('/resetAllCars', function(req, res){
  res.contentType('json');
  MongoClient.connect(url, function(err, db) {
    var x = resetAllCars(db, res);
  });
});



app.use('/', routes);
app.use('/cars', cars);

app.listen(3456);
console.log("App is ready at localhost:3456");