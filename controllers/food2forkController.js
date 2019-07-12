const axios = require('axios');
const dotenv = require('dotenv').config();
const apiKey = process.env.DB_F2FAPIKEY;
const apiUrl = process.env.DB_F2FSEARCHURL;
const apiRecipeUrl = process.env.DB_F2FRECIPEURL;

module.exports = {
  searchFood2Fork: function(req, res) {
    axios
      .get('apiUrl', { params: req.query })
      .then(results => results.data.items)
      .then(recipes => console.log(res.json(recipes)))
      //   .then(recipes => res.json(recipes))
      .catch(err => res.status(422).json(err));
  }
};
