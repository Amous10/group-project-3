const router = require('express').Router();
const bookRoutes = require('./books');
const googleRoutes = require('./google');
<<<<<<< HEAD
=======
const foodRoutes = require('./foods');
>>>>>>> 695da3fc3c4a6369dc9c724656233dac0267f345
const food2forkRoutes = require('./food2fork');

// Book routes
router.use('/books', bookRoutes);
router.use('/google', googleRoutes);
<<<<<<< HEAD
router.use('/food2fork',food2forkRoutes);
=======
router.use('/foods', foodRoutes);
router.use('/food2fork', food2forkRoutes);
>>>>>>> 695da3fc3c4a6369dc9c724656233dac0267f345

console.log('--either books or google route hit--');
module.exports = router;
