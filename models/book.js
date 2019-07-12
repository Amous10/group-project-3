const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  bookId: {
    type: String,
    // required: true
    required: false
  },
  title: {
    type: String,
    // required: true
    required: false
  },
  authors: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  link: {
    type: String,
    // required: true
    required: false
  }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
