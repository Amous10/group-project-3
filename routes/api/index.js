const router = require('express').Router();
const bookRoutes = require('./books');
const googleRoutes = require('./google');
const foodRoutes = require('./foods');
const edamamRoutes = require('./edamam');

// Book routes
router.use('/books', bookRoutes);
router.use('/google', googleRoutes);
router.use('/foods', foodRoutes);
router.use('/edamam', edamamRoutes);

console.log('--either books or google route hit--');
module.exports = router;
