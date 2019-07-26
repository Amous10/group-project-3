const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  userId: {
    type: String,
    required: false
  },
  pantryItems: {
    type: Array,
    required: false
  },

  groceryItems: {
    type: Array,
    required: false
  }
});

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = Ingredient;
