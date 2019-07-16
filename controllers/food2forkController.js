const axios = require('axios');
const dotenv = require('dotenv').config();
const apiKey = process.env.DB_F2FAPIKEY;
const apiUrl = process.env.DB_F2FSEARCHURL;
const apiRecipeUrl = process.env.DB_F2FRECIPEURL;

module.exports = {
  searchFood2Fork: function(req, res) {
    console.log(apiUrl + apiKey, { params: req.query });
    console.log('https://www.food2fork.com/api/search?key=d22268506cdee3e2a2d2a26dba0a685e&rId=35382');

    axios
      .get(apiUrl + apiKey, { params: req.query })
      .then(results =>  object =Json.stringify(results.recipes),
        
        console.log("myresult",object))
      .then(recipes => res.json(recipes))
      .catch(err => res.status(422).json(err));
  }
};
