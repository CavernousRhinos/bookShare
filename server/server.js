var express = require('express');
var bodyParser = require('body-parser');
var bluebird = require('bluebird');
var router = require('./config/routes.js');
var app = express();
var path = require('path');
var models = require("./models");

//routes set up in specific order
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});


app.use(express.static(__dirname + '/../client'));

router(app, express);

models.sequelize.sync().then(function () {
  var server = app.listen(process.env.PORT || 5000, function() {
    console.log('Express server listening on port ' + server.address().port);
  });
});

// User.create({name: "Bob", email: "bob@123.com", passwordHash: "falafel"});