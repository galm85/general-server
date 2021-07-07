const router = require('express').Router();
const Photo = require('../../models/photographer/photo.model');
const multer = require('multer');


// =====================  upload Image =======================================

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file){
            cb(null,'./uploads/photographer');
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


// get all photos
router.get('/',async(req,res)=>{
    const photos = await Photo.find({});
    res.send(photos);
})


// post new photo
router.post('/',upload.single('image'),async(req,res)=>{
    try{
        const photo = new Photo(req.body);
        photo.image = req.file.path;
        await photo.save();
        res.status(200).send('image saved');
    }catch(error){
        res.status(400).send(error);
    }
})


//edit photo
router.patch('/edit-photo/:photoId',upload.single('image'),async(req,res)=>{
    if(req.file){
        try {
            let updatePhoto = req.body;
            updatePhoto.image = req.file.path;
            await Photo.findByIdAndUpdate(req.params.id,updatePhoto);
            return res.status(200).send('Photo Updated');
        } catch (error) {
            return res.status(400).send(error);
        }
    }
        try {
            await Photo.findByIdAndUpdate(req.params.id,req.body);
            return res.status(200).send('Photo Updated');
        } catch (error) {
            return res.status(400).send(error);
        }
       

})


//get images by photographer id
router.get('/album/:photographerID',async(req,res)=>{
    try {
        const images = await Photo.find({photographerID:req.params.photographerID})
        res.status(200).send(images);
    } catch (error) {
        res.status(400).send(error);
    }
})


//get single photo by id
router.get('/single-image/:imageId',async(req,res)=>{
    try {
        const photo = await Photo.findById(req.params.imageId);
        res.send(200).send(photo)
    } catch (error) {
        res.status(400).send(error)
    }
})


//delete image by id
router.delete('/delete-image/:imageId',async(req,res)=>{
    try {
        const photo = await Photo.findByIdAndRemove(req.params.imageId);
        res.status(200).send(`${photo.title} deleted`);
    } catch (error) {
        res.status(400).send(error);
    }
})





module.exports = router;