const router = require('express').Router();
const Department = require('../../models/school/Department.model');




//get all Departments
router.get('/',async(req,res)=>{
    try{
        const departments = await Department.find({});
        res.status(200).send(departments);
    }catch(error){
        res.status(400).send(error);
    }

})

//add New Department
router.post('/',async(req,res)=>{
    
    try{
       let department = new Department(req.body);
       await department.save();
       res.status(200).send('New Department Added');
    }catch(err){
        res.status(400).send(err);
       
    }
})





//Delete Department
router.delete('/delete-department/:departmentId',async(req,res)=>{
    try{
        await Department.findByIdAndRemove(req.params.departmentId);
        res.status(200).send('Department deleted');
    }catch(error){
        res.status(400).send(error);
    }
})



//update department
router.patch('/update-department/:id',async(req,res)=>{
    try {
        await Department.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).send('Department updated');
    } catch (error) {
        res.status(400).send(error);
    }
})


//delete course
router.delete('/delete-course/:id',async(req,res)=>{
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).send('Course Deleted');
    } catch (error) {
        res.status(400).send(error);
    }
})








module.exports = router;