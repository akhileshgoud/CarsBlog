var express = require('express');
var router = express.Router();
var getJSON = require('get-json');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/uitestDatabase';

router.get('/', function(req, res, next) {
  res.render('index');
});

var createDB = function(db, id, model, make, year, desc) {
    var newcarList = db.collection('newcarList');
    newcarList.count(function (err, count) {
    if (!err && count === 0) {
        newcarList.insert({
               modelId: id, modelName: model, makeName: make, modelYear: year, modelDesc: desc
            });
        }
    });
};

router.get('/getCarsFromApi', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
      var apiurl = "https://api.edmunds.com/api/vehicle/v2/makes?state=new&year=2016&view=basic&fmt=json&api_key=gv9ww2sn5uz2ub4wyks83r9q";
        getJSON( apiurl, function( err, data1 ) {
            var makesArray = data1.makes;
            var k = 1;
            for (var i=0; i<makesArray.length; i++) {
                var makeName = makesArray[i].name;
                var modelsArray = makesArray[i].models;
                for (var j=0; j<modelsArray.length; j++) {
                    var modelName = modelsArray[j].name;
                    var modelYear = '2016';
                    var modelDesc = 'Add description for this model using update..'
                    var retVal = createDB(db, k++, modelName, makeName, modelYear, modelDesc);
                }
            }
        });
       // var x = getAllCars(db, res);
      });
  res.render('index');
});


module.exports = router;
