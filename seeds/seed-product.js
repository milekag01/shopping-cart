var Product = require("../models/product");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/shopping');

var products = [
    new Product({
        name:'Moto G5s Plus',
        image:'https://cdn.movertix.com/media/catalog/product/cache/image/600x/m/o/motorola-moto-g5s-plus-gris-dual-sim-6947681556812.jpg',
        decl1:'Lunar Grey, 64GB',
        decl2:'4GB RAM',
        decl3:'13+13MP dual camera',
        price: 11999
    }),
    new Product({
        name:'Huawei Nova 3i',
        image:'http://www.directd.com.my/images/thumbs/0023004_huawei-nova-3i-original-freebies-worth-rm699-original-headset-am61-hotel-package_600.jpeg',
        decl1:'Black,128GB Memory',
        decl2:' 4GB RAM',
        decl3:'16+2 MP AI CAMERA',
        price: 20990
    }),
    new Product({
        name:'Redmi Note 5',
        image:'http://www.gangacell.com/393-thickbox_default/celular-xiaomi-redmi-5-plus-3ram-32gb-nuevos.jpg',
        decl1:'Black, 64GB Memory',
        decl2:'4GB RAM',
        decl3:'Dual camera with EIS',
        price:13000
    }),
    new Product({
        name:'InFocus Vision 3',
        image:'https://i.gadgets360cdn.com/products/large/1513674491_635_infocus_vision_3.jpg',
        decl1:'64GB, Midnight Black',
        decl2:'2GB RAM',
        decl3:'Full touch',
        price:7999
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