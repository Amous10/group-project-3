const router = require("express").Router();
const googleController = require("../../controllers/googleController");

// Matches with "/api/google/"
router.route("/")
// call google books api and get books 
  .get(googleController.searchGoogle)
  console.log('--google controller hit--')



module.exports = router;
