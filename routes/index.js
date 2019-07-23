const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');

// API Routes
router.use('/api', apiRoutes);
console.log('--router.use("/api", apiRoutes);--');

// serves bundled react files in prod
router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), err => {
    if (err) res.status(500).send(err);
  });
});
module.exports = router;
