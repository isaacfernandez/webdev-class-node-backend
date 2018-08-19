var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_kpt5ftnp:n3r886vrrbi4jlpb1089gqojuu@ds263500.mlab.com:63500/heroku_kpt5ftnp');


var app = express();

var session = require('express-session');

function setSession(req, res) {
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req, res) {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.get('/api/session/set/:name/:value', setSession);
app.get('/api/session/get/:name', getSession);
var sectionService = require('./service/section.service.server');
var enrollService = require('./service/enroll.service.server');

sectionService(app);
enrollService(app);
app.listen(process.env.PORT || 6000);
