const db = require('../models');

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Ingredient.find({ userId: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    db.Ingredient.findOneAndUpdate(
      { userId: req.body.userId },
      {
        $set: { userId: req.body.userId },
        $push: { groceryItems: req.body.groceryItems }
      },
      { new: true, upsert: true }
    )

      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  Update: function(req, res) {
    console.log('updating grocery controller', req.body);
    db.Ingredient.findOneAndUpdate(
      { userId: req.params.id },
      {
        $set: { groceryItems: req.body }
      },
      { new: true, upsert: true }
    )

      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
