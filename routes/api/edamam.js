const router = require('express').Router();
const edamamController = require('../../controllers/edamamController');

// Matches with "/api/edamam/"

router
  .route('/')
  // call edamam recipe api and get recipes
  .get(edamamController.searchEdamam);
console.log('--edamam controller hit--');

module.exports = router;
