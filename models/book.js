const mongoose = require("mongoose");
const Schema = mongoose.Schema;

 const bookSchema = new Schema({
  authors: {
    type: Array,
    required: false
  },

  bookId: {
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
    required: false
  },

  title: {
    type: String,
    required: false
  }
}); 

/* const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    synopsis: String,
    date: { type: Date, default: Date.now }
  }); */


const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
