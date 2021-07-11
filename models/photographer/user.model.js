const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWTKEY;


const userSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    image:{type:String,required:true},
    isAdmin:{type:Boolean,required:true},
    likes:[],
    favorites:[],
},{timestamps:true})


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


const User = mongoose.model('photographer-user',userSchema);

module.exports = User;





