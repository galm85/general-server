const router  = require('express').Router();

//sub routes import
const categoriesRouter = require('./categories.route');
const carsRoute = require('./cars.route');

//sub routing
router.use('/categories',categoriesRouter);
router.use('/cars',carsRoute);




module.exports = router;