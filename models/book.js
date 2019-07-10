const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookSchema = new Schema({
    bookId : {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    authors: {
        type: String,
        required: false,

    },
    description: {
        type: String,
        required: false,

    },
    image: {
        type: String,
        required: false,

    },
    link: {
        type: String,
        required: true,
    }

})









const Book = mongoose.model('book', BookSchema);

module.exports = Book; 