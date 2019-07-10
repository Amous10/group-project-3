const axios =require('axios');


module.exports = {
    searchGoogle:  function(req, res) {
        axios
            .get("https://www.googleapis.com/books/v1/volumes/", { params: req.query })
            .then(results => results.data.items)
            .then(books => res.json(books))
            .catch(err => res.status(422).json(err));

    }
}

