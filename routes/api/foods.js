const router = require('express').Router();
const foodsController = require('../../controllers/foodsController');

// Matches with "/api/foods/"
router
  .route('/')
  // find all saved foods in database
  .get(foodsController.findAll)
  //   post a book to the database
  .post(foodsController.create);

// router
//   .route('/api/foods/:uid')
//   //   post a book to the database
//   .post(foodsController.create);

// Matches with "/api/foods/:id"
router
  .route('/:id')
  // delete book from database if saved
  .delete(foodsController.remove);

module.exports = router;
