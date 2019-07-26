const router = require('express').Router();
// const bookRoutes = require('./books');
// const googleRoutes = require('./google');
const foodRoutes = require('./foods');

const recipeRoutes = require('./recipes');
const edamamRoutes = require('./edamam');
const recipeDetailRoutes = require('./recipesdetail');
//  routes

router.use('/foods', foodRoutes);
router.use('/recipes', recipeRoutes);
router.use('/edamam', edamamRoutes);
router.use('/recipesdetail', recipeDetailRoutes);

console.log('--either books or google route hit--');
module.exports = router;
