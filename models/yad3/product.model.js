const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    mainCategory:{type:String,required:true},
    title:{type:String,required:true},
    condition:{type:String,required:true},
    price:{type:Number,required:true},
    images:{type:[String],required:true},
    description:{type:String},
    contactId:{type:String,required:true},
    contactName:{type:String,required:true},
    contactPhone:{type:String,required:true},
    contactEmail:{type:String,required:true},
    contactCity:{type:String,required:true},

},{timestamps:true})





const Product = mongoose.model('yad3-product',productSchema);

module.exports = Product;





