var mongoose = require("mongoose");

var shopSchema = new mongoose.Schema({
    name:{type:String , required:true},
    image:{type:String , required:true},
    decl1:{type:String , required:true},
    decl2:{type:String},
    decl3:{type:String},
    price:{type:Number , required:true}
}); 

var Product = mongoose.model('Product',shopSchema);

module.exports = Product;