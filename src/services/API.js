import axios from 'axios';

export default {
  // call food2fork api
  callFood2Fork: function(query) {
    return axios.get('/api/food2fork', { params: { q: 'title:' + query } });
  },
  // call google api
  callGoogle: function(query) {
    return axios.get('/api/google', { params: { q: 'title:' + query } });
  },
  // Gets all books
  getBooks: function() {
    return axios.get('/api/books');
  },
  //   // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete('/api/books/' + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post('/api/books', bookData);
  }
};
