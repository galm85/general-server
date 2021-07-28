const router  = require('express').Router();

//sub routes import
const categoriesRouter = require('./categories.route');
const carsRoute = require('./cars.route');
const usersRoute = require('./users.routes');

//sub routing
router.use('/categories',categoriesRouter);
router.use('/cars',carsRoute);
router.use('/users',usersRoute);




module.exports = router;