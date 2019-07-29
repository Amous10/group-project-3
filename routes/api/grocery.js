const router = require('express').Router();
const groceryController = require('../../controllers/groceryController');

// Matches with "/api/grocery
router
  .route('/')

  .post(groceryController.create);

router.route('/:id').get(groceryController.findAll);

router.route('/:id').put(groceryController.Update);

module.exports = router;
