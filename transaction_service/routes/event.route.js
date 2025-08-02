const express = require('express');
const router = express.Router();

const userEvent = require('../events/user.event');
const productEvent = require('../events/product.event');

router.post('/event/users', userEvent.saveUser);
router.post('/event/products', productEvent.saveProduct);

module.exports = router;