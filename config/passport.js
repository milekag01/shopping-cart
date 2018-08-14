var passport = require("passport");
var User = require('../models/user');
var LocalStrategy = require("passport-local").Strategy;


//whenever you want to store user in your session, then serialize it by id
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//opposite case deserialize user
//retrieve the user whenever needed through stored id
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user);
    });
});

passport.use('local.signup',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},function(req,email,password,done){
    //from express-validator
    req.checkBody('email','Invalid Email').notEmpty().isEmail();
    req.checkBody('password','Invalid Password').notEmpty().isLength({min:4});
    var errors = req.validationErrors();
    if(errors){
        var messages =[];
        errors.forEach(function(error){
            messages.push(error.msg);    
        });
        return done(null,false,req.flash('error',messages));
    }
    
    User.findOne({'email':email},function(err,user){
        if(err){
            return done(err);
        }
        if(user){
            //if we found the user, we do not throw the error 
            //also we do not say that query is successful
            //but we return a message saying that user exist and hence new user cannot be created
            return done(null,false,{message:'Email is already in use'});
        }
        var newUser = new User();
        newUser.email = email;
        //encrypting password before saving the user
        newUser.password = newUser.encryptPassword(password);
       
        newUser.save(function(err,result){
           if(err){
               return done(err);
           }
           return done(null,newUser);
        });
    });
}));
