const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PantrySchema = new Schema({
  userId: {
    type: String,
    required: false
  },
  pantryItem: {
    type: String,
    required: true
  }
});

const Pantry = mongoose.model('Pantry', PantrySchema);

module.exports = Pantry;
