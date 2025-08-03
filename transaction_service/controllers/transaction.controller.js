const {db: {models}} = require('../configs');
const axios = require('axios');

exports.create = async (req, res) => {
  try {
    const {userId, productId, quantity} = req.body;
    
    // Panggil user_service & product_service
    const user = await models.User.findByPk(userId);
    const product = await models.Product.findByPk(productId);
    
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
    
    const transaction = await models.Transaction.create(newTransaction);
    
    product.stock -= transaction.quantity;
    await product.save();
    
    // Send event to event bus
    await axios.post('http://localhost:3000/events', {
      type: 'transactionStock', action: 'delete', data: transaction
    });
    
    await axios.post('http://localhost:3000/events', {
      type: 'transaction', action: 'add', data: transaction
    });
    
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await models.Transaction.destroy({where: {id: req.params.id}});
    if (deleted === 0) return res.status(404).json({error: 'Transaksi tidak ditemukan'});
    res.json({message: 'Transaksi dihapus'});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};
