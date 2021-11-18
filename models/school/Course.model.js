const mongoose = require('mongoose');


const courseSchema= new mongoose.Schema({
    title:{type:String,required:true},
    article:{type:String,required:true},
    department:{type:String,required:true},
  
},{timestamps:true});




const Course = mongoose.model('school-course',courseSchema);

module.exports = Course;