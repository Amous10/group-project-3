const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');

// API Routes
router.use('/api', apiRoutes);
console.log('--router.use("/api", apiRoutes);--');

// If no API routes are hit, send the React app
<<<<<<< HEAD
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });
=======
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
>>>>>>> 695da3fc3c4a6369dc9c724656233dac0267f345

module.exports = router;
