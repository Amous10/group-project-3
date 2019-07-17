const router = require('express').Router();
const recipeController = require('../../controllers/recipeController');

// Matches with "/api/recipes/"
router
  .route('/')
  // find all saved recipes in database
  .get(recipeController.findAll)
  //   post a book to the database
  .post(recipeController.create);

// router
//   .route('/api/recipes/:uid')
//   //   post a book to the database
//   .post(recipesController.create);

// Matches with "/api/recipes/:id"
router
  .route('/:id')
  // delete book from database if saved
  .delete(recipeController.remove);

module.exports = router;
