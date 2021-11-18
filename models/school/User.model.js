const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const jwtKey = 'schoolkey';

const userSchema= new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    image:{type:String,required:true},
    phone:{type:String,required:true},
    address:{type:String,required:true},
    rule:{type:String,required:true},
},{timestamps:true});


userSchema.methods.generateToken = function(){
    const token = jwt.sign({
        _id:this._id,
        firstName:this.firstName,
        lastName:this.lastName,
        email:this.email,
        image:this.image,
        isAdmin:this.isAdmin
    },jwtKey);
    return token;

}

const User = mongoose.model('school-user',userSchema);

module.exports = User;