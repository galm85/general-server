const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    photographerID:{type:String,required:true},
    title:{type:String,required:true},
    article:{type:String},
    image:{type:String,required:true},
    tags:[],
},{timestamps:true})


const Photo = mongoose.model('photographer-photo',photoSchema);

module.exports = Photo;





