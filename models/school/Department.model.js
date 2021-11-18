const mongoose = require('mongoose');


const departmentSchema= new mongoose.Schema({
    title:{type:String,required:true},
    article:{type:String,required:true},
    manager_id:{type:String,required:true},
    
    
  
},{timestamps:true});




const Department = mongoose.model('school-department',departmentSchema);

module.exports = Department;