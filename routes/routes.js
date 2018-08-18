var express = require("express");
var router = express.Router();

var Product = require("../models/product");
var Cart = require("../models/cart");

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

router.get('/add-to-cart/:id',function(req,res,next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    Product.findById(productId,function(err,product){
        if(err){
            return res.redirect('/');
        }
        cart.add(product,product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/shopping-cart',function(req,res,next){
    if(!req.session.cart){
        return res.render('cart',{products : null});
    }
    var cart = new Cart(req.session.cart);
    res.render('cart',{products: cart.generateArray() , totalPrice: cart.totalPrice});
});

router.get('/checkout',function(req,res,next){
    if(!req.session.cart){
        return res.render('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('checkout',{total: cart.totalPrice,errMsg: errMsg,noErrors: !errMsg});
});

router.post('/checkout',function(req,res,next){
       if(!req.session.cart){
        return res.render('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    //stripe documentation
    var stripe = require("stripe")("sk_test_UIYkFcy7xXKvAK6EthzXEDpx");

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
         req.flash('success','Successfully bought product');
         req.session.cart=null; //to clear the cart after buying the products
         res.redirect('/products');
    });
});
module.exports = router;