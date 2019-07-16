const axios = require('axios');
const dotenv = require('dotenv').config();
const searchUrl = process.env.DB_GOOGLEBOOKSEARCHURL;

module.exports = {
  searchGoogle: function(req, res) {
    console.log(searchUrl, {
      params: req.query
    });
    axios
<<<<<<< HEAD
      .get(searchUrl, {
        params: req.query
      })
      .then(results => results.data.items)
=======
      .get(searchUrl, { params: req.query })
      .then(results => {
        // console.log(results);
        return results.data.items;
      })
>>>>>>> 1f64d430d7501f94fc212a69f795cabcbdb75aeb
      .then(books => res.json(books))
      .catch(err => res.status(422).json(err));
  }
};
