var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var getJSON = require('get-json');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://carsblog_ag:cbag@ds139655.mlab.com:39655/carsblog-ag';

var routes = require('./routes/index');
var cars = require('./routes/cars');


// Init App
var app = express();

app.set('port', (process.env.PORT || 5001));

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

//app.listen(3456);
//console.log("App is ready at localhost:3456");


//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});