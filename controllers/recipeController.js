const db = require('../models');

module.exports = {
  findAll: function(req, res) {
    db.Recipe.find({ userId: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    db.Recipe.findOneAndUpdate(
      { userId: req.body.userId, uri: req.body.uri },
      {
        $set: {
          userId: req.body.userId,
          uri: req.body.uri,
          label: req.body.label,
          source: req.body.source,
          url: req.body.url,
          yield: req.body.yield,
          dietLabels: req.body.dietLabels,
          healthLabels: req.body.healthLabels,
          ingredientLines: req.body.ingredientLines,
          calories: req.body.calories,
          image: req.body.image
        }
      },
      { new: true, upsert: true }
    )

      .then(dbModel => res.json(dbModel))

      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log('remove', req.params.id);
    db.Recipe.findById({ uri: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
