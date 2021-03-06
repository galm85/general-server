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


// ponst new product
router.post('/',upload.single('images'),async(req,res)=>{
    
    try {
        let product = new Product(req.body);
        product.images =req.file.path;
        await product.save();
        res.status(200).send('new product added')
    } catch (error) {
        res.status(400).send(error);        
    }
})

//get products by category
router.get('/products-by-category/:categoryId',async(req,res)=>{
    try {
        const products = await Product.find({mainCategory:req.params.categoryId});
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send(error);
    }
})

//get products by user
router.get('/products-by-user/:userId',async(req,res)=>{
    try{
        const products = await Product.find({contactId:req.params.userId});
        res.status(200).send(products)
    }catch(error){
        res.status(400).send(error);
    }
})

//delete Product
router.delete('/delete-product/:productId',async(req,res)=>{
    try {
        await Product.findByIdAndRemove(req.params.productId);
        res.status(200).send('Product deleted');
    } catch (error) {
        res.status(400).send(error);
    }
})


//edit product
router.patch('/edit-product/:productId',upload.single('images'),async(req,res)=>{
    if(req.file){
        try {
            let updateProduct = req.body;
            updateProduct.images = req.file.path;
            await Product.findByIdAndUpdate(req.params.productId,updateProduct);
            return res.status(200).send('Product Updated');
        } catch (error) {
            return res.status(400).send(error);
        }
    }
        try {
            await Product.findByIdAndUpdate(req.params.productId,req.body);
            return res.status(200).send('Product Updated');
        } catch (error) {
            return res.status(400).send(error);
        }
       

 })


module.exports = router;