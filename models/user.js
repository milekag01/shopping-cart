var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var userSchema = new mongoose.Schema({
    email:{type:String , required:true},
    password:{type:String , required:true}
});

//adding method to userSchema for password encryption
userSchema.methods.encryptPassword = function(password){
      return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
};

//checking the password(this method can check passwords even if they are in different form/type)
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password); //this.password refers to password of current user
};

var User = mongoose.model('User',userSchema);

module.exports = User; 