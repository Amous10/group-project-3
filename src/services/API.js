import axios from 'axios';

export default {
  // call edamam api
  callEdamam: function(query) {
    return axios.get('/api/edamam', { params: { q: query } });
  },
  // Gets all recipes
  getRecipes: function() {
    return axios.get('/api/foods');
  },
  //Deletes the book with the given id
  deleteRecipe: function(id) {
    return axios.delete('/api/foods/' + id);
  },
  // Saves a book to the database
  saveRecipe: function(foodData, userid) {
    console.log('userid: ', userid);
    return axios.post('/api/foods/', foodData);
  }
};
