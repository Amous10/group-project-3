const axios = require('axios');
const dotenv = require('dotenv').config();
const apiKey = process.env.DB_F2FAPIKEY;
const apiUrl = process.env.DB_F2FSEARCHURL;
const apiRecipeUrl = process.env.DB_F2FRECIPEURL;
const eAPIurl = process.env.EDAMAM_URL;
const eAPIkey = process.env.EDAMAM_APIKEY_1;
const eAPPid = process.env.EDAMAM_APPID_1;
const exampleUrl = process.env.EDAMAM_EXAMPLE;

module.exports = {
  searchEdamam: function(req, res) {
    // console.log(exampleUrl);
    //console.log('BUILDING: ', eAPIurl + eAPPid + eAPIkey, { params: req.query });

    axios
      .get(eAPIurl + eAPPid + eAPIkey, {
        params: req.query
      }) // .get('https://api.edamam.com/search?q=chicken&app_id=fe86e086&app_key=088766c47703a5f9c1bdcb2069f19a79&from=0&to=3&calories=591-722&health=alcohol-free')
      // .get(
      //   //`https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl#recipe_2bdefb60f86458dfa15d9b3bc74a001f&app_id=fe86e086&app_key=088766c47703a5f9c1bdcb2069f19a79&from=0&to=3&calories=591-722&health=alcohol-free`
      //`https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_9b5945e03f05acbf9d69625138385408&app_id=fe86e086&app_key=088766c47703a5f9c1bdcb2069f19a79&from=0&to=3&calories=591-722&health=alcohol-free`
      // )
      .then(results => {
        // console.log(results.data.hits);
        //console.log(results.data);
        // console.log(results.data.hits[0].recipe.ingredientLines);
        // console.log(results.data.hits[0].recipe.ingredients);
        // console.log(JSON.stringify(results.data.hits));
        //let obj = JSON.stringify(results.data.hits[1]);
        // console.log(obj);

        return results.data.hits;
      })
      .then(recipes => res.json(recipes))
      .catch(err => {
        console.log('err: ', err);
        res.status(422).json({ message: 'An error occurred while fetching the data.' });
      });
  }
};
