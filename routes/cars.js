var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/uitestDatabase';

router.get('/', function(req, res, next) {
  res.render('cars');
});

router.get('/getAllCars', function(req, res) {
    res.contentType('json');
    MongoClient.connect(url, function(err, db) {
       db.collection('newcarList').find().sort( { modelId: 1 } ).toArray(function(err, items){
           //console.log(items);
           //res.render('cars', { data: items });
           res.send(items);
       }); 
    });
});

router.post('/update', function(req, res) {
    var modelid = req.body.modelid;
  	var modelname = req.body.modelname;
  	var makename = req.body.makename;
  	var modelyear = req.body.modelyear;
  	var modeldesc = req.body.modeldesc;
    //console.log(modelid);
    MongoClient.connect(url, function(err, db) {
    db.collection('newcarList').update(
      { modelName: modelname },
      {
        $set: { modelYear: modelyear, modelDesc: modeldesc }
      });
  });
    res.redirect('/cars');
});

router.post('/delete', function(req, res) {
  	var modelname = req.body.modelname;
    //console.log(modelname);
    MongoClient.connect(url, function(err, db) {
    db.collection('newcarList').deleteOne({ modelName: modelname });
  });
    res.redirect('/cars');
});

module.exports = router;
