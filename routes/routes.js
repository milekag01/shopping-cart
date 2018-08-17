var express = require("express");
var router = express.Router();

var Product = require("../models/product");

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

module.exports = router;