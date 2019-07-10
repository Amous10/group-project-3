const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books/"
router.route("/")
// find all saved books in database 
  .get(booksController.findAll)
//   post a book to the database
  .post(booksController.create)

// Matches with "/api/books/:id"
router
.route("/:id")
// delete book from database if saved
  .delete(booksController.remove);

module.exports = router;
