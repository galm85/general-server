const router = require('express').Router();
const multer = require('multer');
const User = require('../../models/photographer/user.model');
const bcrypt = require('bcrypt');


// =====================  upload Image =======================================

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file){
            cb(null,'./uploads/photographer/users');
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
   
    let user = await User.findOne({email:req.body.email});
    
    if(user) return res.status(400).send('email is taken');

    user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password,salt);
    
    if(req.file){
        user.image = req.file.path;
    }else{
        user.image = '/uploads/no-user.png';
    }
    
    await user.save();
    res.status(200).send('Welcome' + user.firstName);
   



})


//sign in 
router.post('/sign-in',async(req,res)=>{
    const user = await User.findOne({email:req.body.email})

    if(!user) return res.status(400).send('Wrong Email or Password');

    const compare = await bcrypt.compare(req.body.password,user.password);
    if(!compare) return res.status(400).send('Wrong Password or Password');

    res.status(200).send(user.generateToken());




})


//add like photo
router.patch('/update-likes/:userId/:photoId',async(req,res)=>{

    const operator = req.body.operator;
    if(operator == '+'){
        let {likes} = await User.findById(req.params.userId);
        likes.push(req.params.photoId);
        await User.findByIdAndUpdate(req.params.userId,{likes:likes})
        return res.send('added to likes array');
    }
    if(operator == '-'){
        let {likes} = await User.findById(req.params.userId);
        likes = likes.filter(like => like != req.params.photoId);
        await User.findByIdAndUpdate(req.params.userId,{likes:likes})
        return res.send('removed from likes array');
    }
})



//getUserById
router.get('/get-user-data/:userId',async(req,res)=>{
    const user = await User.findById(req.params.userId);
    res.json(user);
})






module.exports = router;