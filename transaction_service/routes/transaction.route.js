const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');

// POST buat transaksi baru
router.post('/', transactionController.create);

module.exports = router;
