const db = require('../models');

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Ingredient.find({ userId: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    //TODO Add userid to relate the tables.
    console.log('Hitting the create Pantry in controller');
    console.log('req.body: ', JSON.stringify(req.body));
    console.logls('req.user._id: ', req.user._id);

    db.Ingredient.findOneAndUpdate(
      { userId: req.body.userId },
      { $set: { userId: req.body.userId, pantryItems: req.body.pantryItems } },
      { new: true, upsert: true }
    )

      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
