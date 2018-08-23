var express = require("express");
var router = express.Router();

var Product = require("../models/product");
var Cart = require("../models/cart");
var Order = require("../models/storeOrder");

router.get('/',function(req,res){
    res.redirect('/products');
});

router.get('/products',function(req,res){
    var successMsg = req.flash('success')[0];
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
                res.render('index',{product:productchunks,successMsg: successMsg,noMessages: !successMsg});
            }      
    });
});

//note: req is an object which will store all the varibles or values given or passed through post request

router.get('/add-to-cart/:id',function(req,res,next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    Product.findById(productId,function(err,product){
        if(err){
            return res.redirect('/');
        }
        cart.add(product,product.id);
        req.session.cart = cart;
        // console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/shopping-cart',function(req,res,next){
    // console.log(req.session.cart);
    if(!req.session.cart){
        return res.render('cart',{products : null});
    }
    var cart = new Cart(req.session.cart);
    res.render('cart',{products: cart.generateArray() , totalPrice: cart.totalPrice});
});


//error handling in this route need to be checked 
router.get('/checkout',isLoggedIn,function(req,res,next){
    if(!req.session.cart){
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error');
    // console.log(errMsg.length);
    res.render('checkout',{total: cart.totalPrice,Errors: errMsg.length>0,errMsg: errMsg[0]});
});

router.post('/checkout',function(req,res,next){
       if(!req.session.cart){
        return res.render('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    //stripe documentation
    var key = process.env.USERKEY;
    var stripe = require("stripe")(key);

    stripe.charges.create({
      amount: Math.floor(cart.totalPrice/70 *100),
      currency: "usd",
      source: req.body.stripeToken, // obtained with Stripe.js
      description: "test charge"
    }, function(err, charge) {
         if(err){
             req.flash('error',err.message);
             return res.redirect('/checkout');
         }
         //creating new order
         var order= new Order({
             user: req.user,    //user is a prop. stored by passport in req object
             name: req.body.name,
             address: req.body.address,
             cart: cart,
             paymentId: charge.id 
         });
         //saving order in database
         order.save(function(err,result){
             if(err){
                //  redirect user to 404 page
                 console.log("Something went wrong...Order not stored");
                 res.redirect("/products");
             }
             req.flash('success','Successfully bought product');
             req.session.cart=null; //to clear the cart after buying the products
             res.redirect('/products');
         });
    });
});

router.get('/reduce/:id',function(req,res,next){
    var pID = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    cart.removeOne(pID);
    req.session.cart = cart;
    // console.log(req.session.cart);
    res.redirect('/shopping-cart');
});

router.get('/remove/:id',function(req,res,next){
    var pID = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    cart.removeAll(pID);
    req.session.cart = cart;
    // console.log(req.session.cart.totalQty);

    res.redirect('/shopping-cart');
});

module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.session.prevUrl = req.url;
    res.redirect('/user/signin');
}