const router = require('express').Router();
const pantryController = require('../../controllers/pantryController');

// Matches with "/api/ingredients
router
  .route('/')

  .post(pantryController.create);

router.route('/:id').get(pantryController.findAll);

router.route('/:id').put(pantryController.Update);

module.exports = router;
