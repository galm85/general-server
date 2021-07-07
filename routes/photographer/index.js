const router  = require('express').Router();

//sub routes import
const photosRoute = require('./photos.route');
const usersRoute = require('./users.route');

//sub routing
router.use('/photos',photosRoute);
router.use('/users',usersRoute);


module.exports = router;