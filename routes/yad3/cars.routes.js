const router = require('express').Router();
const Car = require('../../models/yad3/car.model');
const multer = require('multer');


// =====================  upload Image =======================================

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file){
            cb(null,'./uploads/yad3/cars');
        }
    },
    filename:(req,file,cb)=>{
        if(file){
            cb(null,new Date().toISOString()+'-'+file.originalname);
        }
    }
})

const upload = multer({storage:storage})




// =====================  Routes =============================================


// get all cars
router.get('/',async(req,res)=>{
    const cars = await Car.find({});
    res.send(cars);
})


// post new car
router.post('/',upload.single('images'),async(req,res)=>{

    try{
        let car = new Car(req.body);
        car.images = req.file.path;
        await car.save();
        res.status(200).send('car saved');
    }catch(error){
        res.status(400).send(error);
    }
})

// get car by userId
router.get('/get-cars-by-user/:userId',async(req,res)=>{
    try {
        const cars = await Car.find({contactId:req.params.userId});
        res.status(200).send(cars);
    } catch (error) {
        res.status(400).send(error);
    }
})



//delete car
router.delete('/delete-car/:carId',async(req,res)=>{
    try {
        await Car.findByIdAndRemove(req.params.carId);
        res.status(200).send('car deleted');
    } catch (error) {
        res.status(400).send(error);
    }
})


// //edit photo
// router.patch('/edit-photo/:photoId',upload.single('image'),async(req,res)=>{
//     if(req.file){
//         try {
//             let updatePhoto = req.body;
//             updatePhoto.image = req.file.path;
//             await Photo.findByIdAndUpdate(req.params.id,updatePhoto);
//             return res.status(200).send('Photo Updated');
//         } catch (error) {
//             return res.status(400).send(error);
//         }
//     }
//         try {
//             await Photo.findByIdAndUpdate(req.params.id,req.body);
//             return res.status(200).send('Photo Updated');
//         } catch (error) {
//             return res.status(400).send(error);
//         }
       

// })


// //get images by photographer id
// router.get('/album/:photographerID',async(req,res)=>{
//     try {
//         const images = await Photo.find({photographerID:req.params.photographerID})
//         res.status(200).send(images);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// })


// //get single photo by id
// router.get('/single-image/:imageId',async(req,res)=>{
//     try {
//         const photo = await Photo.findById(req.params.imageId);
//         res.send(200).send(photo)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })


// //delete image by id
// router.delete('/delete-image/:imageId',async(req,res)=>{
//     try {
//         const photo = await Photo.findByIdAndRemove(req.params.imageId);
//         res.status(200).send(`${photo.title} deleted`);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// })



// // update likes of a photo
// router.patch('/update-likes/:photoId',async(req,res)=>{
//     let operator = req.body.operator;
//     let {likes} = await Photo.findOne({_id:req.params.photoId});
//     if (operator == '+'){
//         likes = likes +1;
//     }
//     if(operator == '-'){
//         likes = likes -1;
//     }
//     await Photo.findByIdAndUpdate(req.params.photoId,{likes:likes});
//     res.status(200).send('update Likes');

// })


// //get Populars (by likes) photos
// router.get('/populars',async(req,res)=>{
//     const photos = await Photo.find({}).sort({'likes':-1}).limit(10);
//     //const products = await Product.find({}).sort({'sells':-1}).limit(4);
//     res.status(200).send(photos);
// })




module.exports = router;