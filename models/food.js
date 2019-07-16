const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  foodId: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  }
});

const Food = mongoose.model('Food', FoodSchema);

module.exports = Food;
