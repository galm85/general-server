const mongoose = require('mongoose');


const clasSchema= new mongoose.Schema({
    title:{type:String,required:true},
    course_id:{type:String,required:true},
    department_id:{type:String,required:true},
    semester:{type:String,required:true},
    year:{type:String,required:true},
    days:{type:String,required:true},
    hours:{type:String,required:true},
    start:{type:String,required:true},
    status:{type:String,required:true},
    
  
},{timestamps:true});




const Clas = mongoose.model('school-class',clasSchema);

module.exports = Clas;