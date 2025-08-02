const db = require('../models');
const axios = require('axios');

exports.getAll = async (req, res) => {
  try {
    const data = await db.Transaction.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.getById = async (req, res) => {
  try {
    const transaction = await db.Transaction.findByPk(req.params.id);
    if (!transaction) return res.status(404).json({error: 'Transaksi tidak ditemukan'});
    res.json(transaction);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.create = async (req, res) => {
  try {
    const {userId, productId, quantity} = req.body;
    
    // Panggil user_service & product_service
    const user = await db.User.findByPk(userId);
    const product = await db.Product.findByPk(productId);
    
    if (!user || !product) {
      return res.status(400).json({error: 'User atau Product tidak valid'});
    }
    
    const totalPrice = product.price * quantity;
    
    const newTransaction = {
      UserId: user.id,
      ProductId: product.id,
      quantity: quantity,
      totalPrice: totalPrice,
    };
    
    const transaction = await db.Transaction.create(newTransaction);
    
    product.stock -= transaction.quantity;
    await product.save();
    
    // Send event to event bus
    await axios.post('http://localhost:3000/events', {
      type: 'transactionStock', action: 'delete', data: transaction
    });
    
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await db.Transaction.destroy({where: {id: req.params.id}});
    if (deleted === 0) return res.status(404).json({error: 'Transaksi tidak ditemukan'});
    res.json({message: 'Transaksi dihapus'});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};
