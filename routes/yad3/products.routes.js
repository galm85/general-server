const router = require('express').Router();
const Product = require('../../models/yad3/product.model.js');
const multer = require('multer');


// =====================  upload Image =======================================

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file){
            cb(null,'./uploads/yad3/products');
        }
    },
    filename:(req,file,cb)=>{
        if(file){
            cb(null,new Date().toISOString()+'-'+file.originalname);
        }
    }
})

const upload = multer({storage:storage})




// =====================  Routes =============================================//


//get all products
router.get('/',async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).send(products);
    }catch(error){
        res.status(400).send(error);
    }

})






module.exports = router;