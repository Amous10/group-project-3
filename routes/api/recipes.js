const router = require('express').Router();
const recipeController = require('../../controllers/recipeController');

// Matches with "/api/foods/"
router
  .route('/')
  // find all saved foods in database
  .get(recipeController.findAll)
  //   post a book to the database
  .post(recipeController.create);

// router
//   .route('/api/foods/:uid')
//   //   post a book to the database
//   .post(foodsController.create);

// Matches with "/api/foods/:id"
router
  .route('/:id')
  // delete book from database if saved
  .delete(recipeController.remove);

module.exports = router;