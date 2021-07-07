const router = require('express').Router();


router.get('/',async(req,res)=>{
    res.send('users');
})







module.exports = router;