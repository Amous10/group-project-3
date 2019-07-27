const mongoose = require('mongoose');
const db = require('../models');

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pantrychef');

const bookSeed = [
  {
    userId: '5d30cd864d97081be0c66f23',
    pantryItems: ['pie', 'apple', 'bread'],
    groceryItems: ['Milk', 'Eggs', 'Chicken']
  }
];

db.Ingredient.remove({})
  .then(() => db.Ingredient.collection.insertMany(bookSeed))
  .then(data => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
