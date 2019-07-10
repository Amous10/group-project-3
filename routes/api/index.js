const router = require("express").Router();
const bookRoutes = require("./books");
const googleRoutes = require("./google")

// Book routes
router.use("/books", bookRoutes);
router.use('/google', googleRoutes);

console.log('--either books or google route hit--')
module.exports = router;
