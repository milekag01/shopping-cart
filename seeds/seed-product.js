var Product = require("../models/product");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/shopping');

var products = [
    new Product({
        name:'Apple Iphone X',
        image:'https://cdni.rt.com/files/2018.02/article/5a746f8dfc7e937e778b4567.jpg',
        decl1:'Space Grey, 256GB',
        decl2:'3GB RAM',
        decl3:'Only 1 left in stock',
        price: 99900
    }),
    new Product({
        name:'Samsung Galaxy Note 9',
        image:'https://www.thestar.com.my/~/media/online/2018/08/09/09/01/kwnote9online_tm_3.ashx/?w=620&h=413&crop=1&hash=7A68F7C023AB336E1EE2FC838102395F1F0FD5A0',
        decl1:'Ocean Blue,128GB',
        decl2:'Dual Camera,6GB RAM',
        decl3:'Infinity Display',
        price: 67900
    }),
    new Product({
        name:'OnePlus 6',
        image:'https://techbug.my/wp-content/uploads/2018/05/OnePlus-6-3.jpg',
        decl1:'Black,128GB Memory',
        decl2:'8GB RAM',
        decl3:'Dual camera with OIS',
        price: 39999
    }),
    new Product({
        name:'Redmi Note 5 Pro',
        image:'http://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/Xiaomi_Redmi_Note_5_Pro/Xiaomi_Redmi_Note_5_Pro_L_1.jpg',
        decl1:'Black, 64GB Memory',
        decl2:'4GB RAM',
        decl3:'Dual camera with EIS',
        price:15000
    }),
    new Product({
        name:'Samsung Galaxy S8 Plus',
        image:'https://s3-eu-west-1.amazonaws.com/cc-ecommerce/product_catalog/0002/29/thumb_128300_product_catalog_large.jpeg',
        decl1:'64GB, Midnight Black',
        decl2:'6GB RAM',
        decl3:'Bezel-Less',
        price:47995
    })
];
var done=0;
for(var i=0;i<products.length;i++){
    products[i].save(function(err,result){
        done++;
        if(done===products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}