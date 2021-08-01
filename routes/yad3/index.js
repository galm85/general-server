const router  = require('express').Router();

//sub routes import
const categoriesRouter = require('./categories.routes');
const carsRoute = require('./cars.routes');
const usersRoute = require('./users.routes');
const productsRoute = require('./products.routes');
const housesRoute = require('./house.routes');

//sub routing
router.use('/categories',categoriesRouter);
router.use('/cars',carsRoute);
router.use('/users',usersRoute);
router.use('/users',usersRoute);
router.use('/houses',housesRoute);
router.use('/products',productsRoute);




module.exports = router;