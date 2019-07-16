const db = require('../models');


module.exports = {

findAll: function(req, res) {
    db.recipe.find({"userId": req.body.userID})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    //TODO Add userid to relate the tables.
    console.log('Hitting the create Pantry in controller');
    console.log('req.body: ', JSON.stringify(req.body));
    console.log('req.user._id: ', req.user._id);
  
  
    db.recipe.findOneAndUpdate({ "userId": req.body.userId, "recipeId" : req.body.recipeId},
     { "$set": { "userID": req.body.userId, "recipeId": req.body.recipeId}},{new:true, upsert:true})
        
    .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.recipe.findOneAndRemove({ "userId": req.params.id , "recipeId": req.body.recipeId})
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }


}