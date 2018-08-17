var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var session = require("express-session");
var passport = require("passport");
var flash = require("connect-flash");
var validator = require("express-validator");
var mongoStore = require("connect-mongo")(session);

var app = express();
// var router = express.Router();
var indexroutes = require("./routes/routes");
var userroutes = require("./routes/user");

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
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection : mongoose.connection }),
    cookie: {maxAge: 12*60*60*1000}//store session for 12 hrs
}));
app.use(flash()); //it needs to initialize session first
app.use(passport.initialize());
app.use(passport.session());

//to pass login to be available in all views
//so that we can show or hide buttons accordingily
app.use(function(req,res,next){
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session; //making sessions available to all routes without passing to individual routes
    next();
});

app.use(indexroutes);
app.use('/user',userroutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log('Server started');
});