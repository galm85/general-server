const router = require('express').Router();
const Department = require('../../models/school/Department.model');




//get all courses
router.get('/',async(req,res)=>{
    try{
        const departments = await Department.find({});
        res.status(200).send(departments);
    }catch(error){
        res.status(400).send(error);
    }

})

//add New Course
router.post('/',async(req,res)=>{
    
    try{
       let department = new Department(req.body);
       await department.save();
       res.status(200).send('New Department Added');
    }catch(err){
        res.status(400).send(err);
        console.log(err);
    }
})





//Delete Course
router.delete('/delete-course/:courseid',async(req,res)=>{
    try{
        await Course.findByIdAndRemove(req.params.courseid);
        res.status(200).send('Course deleted');
    }catch(error){
        res.status(400).send(error);
    }
})

//getUser by id
router.get('/get-course/:id',async(req,res)=>{
    try {
        const course =await Course.findById(req.params.id);
        res.status(200).send(course);
    } catch (error) {
        res.status(400).send(error);
    }
})

//update course
router.patch('/update-course/:id',async(req,res)=>{
    try {
        await Course.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).send('Course update');
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