const router = require('express').Router();

const foodRoutes = require('./foods');

const recipeRoutes = require('./recipes');
const edamamRoutes = require('./edamam');
const recipeDetailRoutes = require('./recipesdetail');
const pantryRoutes = require('./pantry');
//  routes

router.use('/foods', foodRoutes);
router.use('/recipes', recipeRoutes);
router.use('/edamam', edamamRoutes);
router.use('/recipesdetail', recipeDetailRoutes);
router.use('/pantry', pantryRoutes);

console.log('--either books or google route hit--');
module.exports = router;
