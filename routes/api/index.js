const router = require('express').Router();

const foodRoutes = require('./foods');

const recipeRoutes = require('./recipes');
const edamamRoutes = require('./edamam');
const recipeDetailRoutes = require('./recipesdetail');
const ingredientRoutes = require('./ingredients');
//  routes

router.use('/foods', foodRoutes);
router.use('/recipes', recipeRoutes);
router.use('/edamam', edamamRoutes);
router.use('/recipesdetail', recipeDetailRoutes);
router.use('/ingredients', ingredientRoutes);

console.log('--either books or google route hit--');
module.exports = router;
