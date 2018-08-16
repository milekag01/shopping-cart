var express = require("express");
var router = express.Router();
var csrf = require("csurf");
var passport = require("passport");

var Product = require("../models/product");
var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/',function(req,res){
    res.redirect('/products');
});

router.get('/products',function(req,res){
    Product.find({},function(err,foundproduct){
        if(err){
            console.log("error");
        }
        else{
                var productchunks=[];
                var chunksize=3;
                for(var i=0;i<foundproduct.length;i+=chunksize){
                    productchunks.push(foundproduct.slice(i,i+chunksize));
                }
                res.render('index',{product:productchunks});
            }      
    });
});

router.get('/user/signup',csrfProtection,function(req,res){
    var messages = req.flash('error');
    res.render("user/signup",{csrfToken : req.csrfToken(), messages: messages,hasErrors: messages.length>0});
});

router.post('/user/signup',passport.authenticate('local.signup',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));
router.get('/user/profile',function(req,res,next){
    res.render('user/profile');
});
router.get('/user/signin',csrfProtection,function(req,res){
    var messages = req.flash('error');
    res.render("user/login",{csrfToken : req.csrfToken(), messages: messages,hasErrors: messages.length>0});
});
router.post('/user/signin',passport.authenticate('local.signin',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));

module.exports = router;