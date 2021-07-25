const mongoose = require('mongoose');


const houseSchema = new mongoose.Schema({
    mainCategory:{type:String,required:true},
    houseCategory:{type:String,required:true},
    rent:{type:Boolean,required:true},
    price:{type:Number,required:true},
    images:{type:[String],required:true},
    contectName:{type:String,required:true},
    contectPhone:{type:String,required:true},
    contectEmail:{type:String,required:true},
    contectCity:{type:String,required:true},

},{timestamps:true})





const House = mongoose.model('yad3-house',houseSchema);

module.exports = House;





