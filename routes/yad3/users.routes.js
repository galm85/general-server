const router = require('express').Router();
const User = require('../../models/yad3/user.model');
const multer = require('multer');
const bcrypt = require('bcrypt');

// =====================  upload Image =======================================

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file){
            cb(null,'./uploads/yad3/users');
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


//get all users
router.get('/',async(req,res)=>{
    try{
        const users = await User.find({});
        res.status(200).send(users);
    }catch(error){
        res.status(400).send(error);
    }

})

//register new user
router.post('/',upload.single('image'),async(req,res)=>{
    console.log('got it');
    try{
        let user = await User.findOne({email:req.body.email});
        if(user) return res.status(404).send('Email is taken');
        user = new User(req.body);
        if(req.file){
            user.image = req.file.path;
        }
        user.isAdmin = false;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password,salt);
        await user.save();
        res.status(200).send('user saved');
        console.log('user saved');
    }catch(err){
        res.status(400).send(err);
        console.log(err);
    }
})


//sign in user
router.post('/sign-in',async(req,res)=>{
    
        const user = await User.findOne({email:req.body.email});
        
        if(!user) return res.status(400).send('wrong email');

        const compare = await bcrypt.compare(req.body.password,user.password);
        if(!compare) return res.status(400).send('wrong password');

        return res.status(200).json({token:user.generateToken(),message:'welcome back'});

        
    
})


//Delete user
router.delete('/delete-user/:userId',async(req,res)=>{
    try{
        await User.findByIdAndRemove(req.params.userId);
        res.status(200).send('User deleted');
    }catch(error){
        res.status(400).send(error);
    }
})

//getUser by id
router.get('/get-user/:id',async(req,res)=>{
    try {
        const user =await User.findById(req.params.id);
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})








module.exports = router;