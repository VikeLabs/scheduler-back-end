import express = require('express');
const router = express.Router();
const path = require('path');

router.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname, '../../docs/index.html'));
});

module.exports = router;
