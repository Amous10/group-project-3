const router = require('express').Router();
const recipeController = require('../../controllers/recipeController');

// Matches with "/api/recipes/"
router
  .route('/')
  // find all saved recipes in database
  //.get(recipeController.findAll)
  //   post a book to the database
  .post(recipeController.create);

  router
/* .route('/')
  .get(recipeController.findAll); */

// router
//   .route('/api/recipes/:uid')
//   //   post a book to the database
//   .post(recipeController.create);

// Matches with "/api/recipes/:id"
router
  .route('/:id')
  // delete book from database if saved
  .delete(recipeController.remove);
 router
.route('/:id')
  .get(recipeController.findAll); 


module.exports = router;
