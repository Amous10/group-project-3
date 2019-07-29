import axios from 'axios';

export default {
  // call edamam api
  callEdamam: function(query) {
    return axios.get('/api/edamam', { params: { q: query } });
  },
  // Gets all recipes
  getRecipes: function(userid) {
    console.log('getting axios recipes', userid);
    return axios.get('/api/recipes/' + userid);
  },

  getRecipesD: function(id) {
    return axios.get('/api/recipesdetail/' + id);
  },
  deleteRecipe: function(id) {
    return axios.delete('/api/recipes/' + id);
  },
  saveRecipe: function(recipedata, userid) {
    return axios.post('/api/recipes/', recipedata);
  },
  getPantry: function(id) {
    return axios.get('/api/ingredients/' + id);
  },
  savePantry: function(pantrydata, userid) {
    return axios.post('/api/ingredients/', pantrydata);
  },
  updatePantry: function(pantryitems, id) {
    return axios.put('/api/ingredients/' + id, pantryitems);
  },
  getGrocery: function(id) {
    return axios.get('/api/grocery/' + id);
  },
  saveGrocery: function(grocerydata, userid) {
    return axios.post('/api/grocery/', grocerydata);
  },
  updateGrocery: function(groceryitems, id) {
    return axios.put('/api/grocery/' + id, groceryitems);
  }
};
