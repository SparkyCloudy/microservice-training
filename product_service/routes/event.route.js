const express = require('express');
const transactionEvent = require('../events/transaction.event');
const router = express.Router();

router.delete('/event/transactions/stock', transactionEvent.decreaseStock);

module.exports = router;