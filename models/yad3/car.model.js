const mongoose = require('mongoose');


const carSchema = new mongoose.Schema({
    mainCategory:{type:String,required:true},
    carCategory:{type:String,required:true},
    brand:{type:String,required:true},
    model:{type:String,required:true},
    year:{type:String,required:true},
    price:{type:Number,required:true},
    images:{type:[String],required:true},
    contactName:{type:String,required:true},
    contactPhone:{type:String,required:true},
    contactEmail:{type:String,required:true},
    contactCity:{type:String,required:true},

},{timestamps:true})





const Car = mongoose.model('yad3-car',carSchema);

module.exports = Car;





