const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  bookId: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  authors: {
    type: Array,
    required: false
  },
  description: {
    type: String,
    required: false
  },
<<<<<<< HEAD

=======
>>>>>>> 6dac14d33bb5dc1dfd151f3603a538a407b7a573
  image: {
    type: String,
    required: false
  },
<<<<<<< HEAD

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
=======
  link: {
    type: String,
    required: false
  }
});

const Book = mongoose.model('Book', BookSchema);
>>>>>>> 6dac14d33bb5dc1dfd151f3603a538a407b7a573

module.exports = Book;
