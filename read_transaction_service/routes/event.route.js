const express = require('express');
const router = express.Router();
const transactionEvent = require('../events/transaction.event');

router.post('/event/transactions', transactionEvent.saveTransaction);

module.exports = router;