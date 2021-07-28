const mongoose = require('mongoose');


const houseSchema = new mongoose.Schema({
    mainCategory:{type:String,required:true},
    houseCategory:{type:String,required:true},
    floor:{type:Number},
    parking:{type:Boolean,default:false},
    rent:{type:Boolean,default:false},
    price:{type:Number,required:true},
    images:{type:[String],required:true},
    description:{type:String},
    constactId:{type:String,required:true},
    contactName:{type:String,required:true},
    contactPhone:{type:String,required:true},
    contactEmail:{type:String,required:true},
    contactCity:{type:String,required:true},

},{timestamps:true})





const House = mongoose.model('yad3-house',houseSchema);

module.exports = House;





