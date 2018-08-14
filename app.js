var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var session = require("express-session");
var passport = require("passport");
var flash = require("connect-flash");
var validator = require("express-validator");


var app = express();
// var router = express.Router();
var indexroutes = require("./routes/routes");

mongoose.connect('mongodb://localhost/shopping');

require("./config/passport");

// var Product = require("./models/product");

app.use(bodyParser.urlencoded({extended:true}));
app.use(validator());  //this should come after the bodyparser

app.set('view engine','ejs');
app.use(express.static('public'));

app.use(session({
    secret:'13 reasons why',
    resave: false,
    saveUninitialized: false
}));
app.use(flash()); //it needs to initialize session first
app.use(passport.initialize());
app.use(passport.session());

app.use(indexroutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log('Server started');
});