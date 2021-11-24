const mongoose = require('mongoose');


const clasSchema= new mongoose.Schema({
    course_id:mongoose.ObjectId,
    department_id:mongoose.ObjectId,
    semester:{type:String,required:true},
    year:{type:String,required:true},
    days:{type:String,required:true},
    hoursStart:{type:String,required:true},
    hoursEnd:{type:String,required:true},
    startDay:{type:String,required:true},
    status:{type:String,required:true},
    
  
},{timestamps:true});




const Clas = mongoose.model('school-class',clasSchema);

module.exports = Clas;