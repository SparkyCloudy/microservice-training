const express = require('express');
const axios = require('axios');
const router = express.Router();

const types = {
  product: ['http://localhost:3002/event/products'],
  user: ['http://localhost:3002/event/users'],
  transaction: ['http://localhost:3001/event/transactions'],
  transactionStock: ['http://localhost:3001/event/transactions/stock'],
};

router.post('/events', async (req, res) => {
  const event = req.body;
  let urls;
  
  // Example: event.type is 'product' or 'user'
  if (event.type && types[event.type]) {
    urls = types[event.type];
  } else {
    // Default: send to all
    urls = [...types.product, ...types.user];
  }
  
  const results = [];
  for (const url of urls) {
    try {
      if (event.action === 'add') {
        await axios.post(url, event);
      }
      
      if (event.action === 'delete') {
        await axios.delete(url, event);
      }
      
      if (event.action === 'edit') {
        await axios.put(url, event);
      }
      
      results.push({url, status: 'OK'});
    } catch (err) {
      results.push({url, status: 'FAILED', error: err.message});
    }
  }
  res.send({status: 'Event submitted', results});
});

module.exports = router;