var express = require("express");
var router = express.Router();
var csrf = require("csurf");
var passport = require("passport");

var Cart = require("../models/cart");
var Order = require("../models/storeOrder");

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile',isLoggedIn,function(req,res,next){
    Order.find({user: req.user},function(err,orders){
        if(err){
            console.log(err);
            return res.send("Error");
        }
        var cart;
        orders.forEach(function(order){
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/profile',{orders: orders});
    });
});

router.get('/logout',isLoggedIn,function(req,res,next){
    req.logout();
    res.redirect('/');
});

router.use('/',notLoggedIn,function(req,res,next){
   next(); 
}); //place this route in front of all routes where you 
    //want to check whether user is not logged in

router.get('/signup',csrfProtection,function(req,res,next){
    var messages = req.flash('error');
    res.render("user/signup",{csrfToken : req.csrfToken(), messages: messages,hasErrors: messages.length>0});
});

router.post('/signup',passport.authenticate('local.signup',{
    failureRedirect: '/user/signup',
    failureFlash: true
}),function(req,res,next){
    if(req.session.prevUrl){
        var prevUrl = req.session.prevUrl;
        req.session.prevUrl = null;
        res.redirect(prevUrl);
    }else{
        res.redirect("/user/profile");
    }
});

router.get('/signin',csrfProtection,function(req,res,next){
    var messages = req.flash('error');
    res.render("user/login",{csrfToken : req.csrfToken(), messages: messages,hasErrors: messages.length>0});
});

router.post('/signin',passport.authenticate('local.signin',{
    failureRedirect: '/user/signin',
    failureFlash: true
}),function(req,res,next){
    if(req.session.prevUrl){
        var prevUrl = req.session.prevUrl;
        req.session.prevUrl = null;
        res.redirect(prevUrl);
    }else{
        res.redirect("/user/profile");
    }
});

module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}