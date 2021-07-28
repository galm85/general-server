const router  = require('express').Router();

//sub routes import
const categoriesRouter = require('./categories.routes');
const carsRoute = require('./cars.routes');
const usersRoute = require('./users.routes');
const productsRoute = require('./products.routes');

//sub routing
router.use('/categories',categoriesRouter);
router.use('/cars',carsRoute);
router.use('/users',usersRoute);




module.exports = router;