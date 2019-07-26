const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PantrySchema = new Schema({
  userId: {
    type: String,
    required: false
  },
  pantryItem: {
    type: Array,
    required: false
  }
});

const Pantry = mongoose.model('Pantry', PantrySchema);

module.exports = Pantry;
