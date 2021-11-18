const router = require('express').Router();

//sub routes import
const usersRoute = require('./users.routes');
const coursesRoute = require('./courses.routes');
const departmentsRoute = require('./departments.routes');
const classesRoute = require('./classes.routes');



//sub routing
router.use('/users',usersRoute);
router.use('/courses',coursesRoute);
router.use('/classes',classesRoute);
router.use('/departments',departmentsRoute);


module.exports = router;