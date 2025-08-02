const express = require('express');
const router = express.Router();

router.post('/api/events', (req, res) => {
  console.log('Received event:', req.body);
  res.send({status: 'Event received'});
});

module.exports = router;