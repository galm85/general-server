const router = require('express').Router();
const House = require('../../models/yad3/house.model');
const multer = require('multer');


// =====================  upload Image =======================================

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file){
            cb(null,'./uploads/yad3/houses');
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


// get all houses
router.get('/',async(req,res)=>{
    const houses = await House.find({});
    res.send(houses);
})


// post new car
router.post('/',upload.single('images'),async(req,res)=>{
   
    try{
        let house = new House(req.body);
        house.images = req.file.path;
        await house.save();
        res.status(200).send('house saved');
    }catch(error){
        res.status(400).send(error);
    }
})

// get Houses by userId
router.get('/get-houses-by-user/:userId',async(req,res)=>{
   
    try {
        const houses = await House.find({constactId:req.params.userId});
       
        res.status(200).send(houses);
    } catch (error) {
        res.status(400).send(error);
    }
})



//delete house
router.delete('/delete-house/:houseId',async(req,res)=>{
    try {
        await House.findByIdAndRemove(req.params.houseId);
        res.status(200).send('House deleted');
    } catch (error) {
        res.status(400).send(error);
    }
})


//edit house
router.patch('/edit-house/:houseId',upload.single('images'),async(req,res)=>{
    if(req.file){
        try {
            let updateHouse = req.body;
            updateHouse.images = req.file.path;
            await House.findByIdAndUpdate(req.params.houseId,updateHouse);
            return res.status(200).send('House Updated');
        } catch (error) {
            return res.status(400).send(error);
        }
    }
        try {
            await House.findByIdAndUpdate(req.params.houseId,req.body);
            return res.status(200).send('House Updated');
        } catch (error) {
            return res.status(400).send(error);
        }
       

 })


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