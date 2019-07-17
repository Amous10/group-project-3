const router = require('express').Router();
const bookRoutes = require('./books');
const googleRoutes = require('./google');
const foodRoutes = require('./foods');
const food2forkRoutes = require('./food2fork');
const recipeRoutes = require('./recipes');
// Book routes
router.use('/books', bookRoutes);
router.use('/google', googleRoutes);
router.use('/foods', foodRoutes);
router.use('/food2fork', food2forkRoutes);
router.use('/recipes', recipeRoutes)
console.log('--either books or google route hit--');
module.exports = router;
