const router = require('express').Router();
const Category = require('../../models/yad3/catgory.model');
const multer = require('multer');


// =====================  upload Image =======================================

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file){
            cb(null,'./uploads/yad3/categories');
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


// get all categories
router.get('/',async(req,res)=>{
    const categories = await Category.find({});
    res.send(categories);
})


// post new category
router.post('/',upload.single('image'),async(req,res)=>{
    try{
        let category = new Category(req.body);
        category.image = req.file.path;
        await category.save();
        res.status(200).send('category saved');
    }catch(error){
        res.status(400).send(error);
    }
})


//edit Category
router.patch('/edit-category/:categoryId',upload.single('image'),async(req,res)=>{
    if(req.file){
        try {
            let updateCategory = req.body;
            updateCategory.image = req.file.path;
            await Category.findByIdAndUpdate(req.params.categoryId,updateCategory);
            return res.status(200).send('Category Updated');
        } catch (error) {
            return res.status(400).send(error);
        }
    }
        try {
            await Category.findByIdAndUpdate(req.params.categoryId,req.body);
            return res.status(200).send('Category Updated');
        } catch (error) {
            return res.status(400).send(error);
        }
       

 })


//delete Category by id
router.delete('/delete-category/:categoryId',async(req,res)=>{
    try {
        const category = await Category.findByIdAndRemove(req.params.categoryId);
        res.status(200).send(`${category.title} deleted`);
    } catch (error) {
        res.status(400).send(error);
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