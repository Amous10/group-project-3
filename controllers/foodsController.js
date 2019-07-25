const db = require('../models');

// Defining methods for the foodsController
module.exports = {
  findAll: function(req, res) {
    db.Food.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    // console.log('Hitting the create function in controller');
    // console.log('req.body: ', JSON.stringify(req.body));
    // console.log('req.user._id: ', req.user._id);
    db.Food.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function(req, res) {
    db.Food.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
