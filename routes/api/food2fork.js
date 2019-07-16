const router = require('express').Router();
const food2forkController = require('../../controllers/food2forkController');

// Matches with "/api/food2fork/"

router
  .route('/')
  // call food2fork recipe api and get recipes
  .get(food2forkController.searchFood2Fork);
console.log('--food2fork controller hit--');

module.exports = router;
