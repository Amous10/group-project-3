const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  uri: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false
  },
  source: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: false
  },
  yield: {
    type: String,
    required: false
  },
  dietLabels: {
    type: Array,
    required: false
  },
  healthLabels: {
    type: Array,
    required: false
  },
  ingredientLines: {
    type: Array,
    required: false
  },
  calories: {
    type: String,
    required: false
  },
  image: { type: String, required: false }
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
