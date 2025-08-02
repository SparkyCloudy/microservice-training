// product_service/events/transaction.event.js
const db = require('../models');

exports.decreaseStock = async (req, res) => {
  try {
    const transaction = req.body;
    
    // Retrieve product
    const product = await db.Product.findByPk(transaction.ProductId);
    if (!product) {
      return res.status(404).json({error: 'Product not found'});
    }
    
    // Check stock availability
    if (product.stock < transaction.quantity) {
      return res.status(400).json({error: 'Insufficient stock'});
    }
    
    // Decrease stock
    product.stock -= transaction.quantity;
    await product.save();
    
    res.status(200).json({message: 'Stock updated', product: product.toJSON()});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};