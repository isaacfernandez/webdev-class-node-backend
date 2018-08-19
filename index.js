var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_kpt5ftnp:n3r886vrrbi4jlpb1089gqojuu@ds263500.mlab.com:63500/heroku_kpt5ftnp');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

var sectionService = require('./service/section.service.server');
sectionService(app);

app.listen(process.env.PORT || 6000);
