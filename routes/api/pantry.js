const router = require('express').Router();
const pantryController = require('../../pantryController');

// Matches with "/api/recipes/"
router
  .route('/')
  // find all saved recipes in database
  //.get(recipeController.findAll)
  //   post a book to the database
  .post(pantryController.create);

router;
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
  .delete(pantryController.remove);

router.route('/:id').get(pantryController.findAll);

module.exports = router;
