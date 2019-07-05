const search = require('./search');
const saved = require('./saved');

module.exports = function(app) {
  app.get('/api/search', search);
  app.get('/api/saved/:id', saved.GET);
  app.post('/api/saved', saved.POST);
  app.put('/api/saved/:id', saved.PUT);
  app.delete('/api/saved/:id', saved.DELETE);
};
