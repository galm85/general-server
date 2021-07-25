const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title:{type:String,required:true},
    image:{type:String,required:true},

},{timestamps:true});


const Category = mongoose.model('yad3-categorie',categorySchema);

module.exports = Category;
