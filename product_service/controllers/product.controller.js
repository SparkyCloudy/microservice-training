const db = require('../models');
const axios = require('axios');

exports.getAll = async (req, res) => {
  try {
    const products = await db.Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await db.Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({error: 'Produk tidak ditemukan'});
    res.json(product);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.create = async (req, res) => {
  try {
    const product = await db.Product.create(req.body);
    
    // Send event to event bus
    await axios.post('http://localhost:3000/events', {
      type: 'product', action: 'add', data: product
    });
    
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await db.Product.update(req.body, {
      where: {id: req.params.id}
    });
    if (updated === 0) return res.status(404).json({error: 'Produk tidak ditemukan'});
    res.json({message: 'Produk diperbarui'});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await db.Product.destroy({
      where: {id: req.params.id}
    });
    if (deleted === 0) return res.status(404).json({error: 'Produk tidak ditemukan'});
    res.json({message: 'Produk dihapus'});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};
