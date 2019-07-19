const db = require('../models');

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Pantry.find({userId: req.body.userId})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  create: function(req, res) {
    //TODO Add userid to relate the tables.
    console.log('Hitting the create Pantry in controller');
    console.log('req.body: ', JSON.stringify(req.body));
    console.log('req.user._id: ', req.user._id);
  
  
    db.Pantry.findOneAndUpdate({ userId: req.body.userId, pantryItem : req.body.pantryItem},
     { $set: { userId: req.body.userId, pantryItem: req.body.pantryItem}},{new:true, upsert:true})
        
    .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function(req, res) {
    db.Pantry.findOneAndRemove({ "userId": req.params.id , "pantryItem": req.body.pantryItem})
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
