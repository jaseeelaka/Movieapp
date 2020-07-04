var express = require('express');
const { response } = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('moviedb', ['validation','film']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());



app.get('/Movieslist', function (req, res) {
  console.log('I received a GET request');

  db.film.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/Movieslist', function (req, res) {
  console.log(req.body);
  db.film.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/Movieslist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.film.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/Movieslist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.film.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/Movieslist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.film.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, actor: req.body.actor, actress: req.body.actress,link: req.body.link}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");
