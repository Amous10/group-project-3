const router = require('express').Router();
const recipeController = require('../../controllers/recipeController');

// Matches with "/api/recipes/"

  
 router
.route('/:id')
  .get(recipeController.findOne); 


module.exports = router;
