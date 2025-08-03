const {db} = require('../configs');
const Product = db.models.Product;
const axios = require('axios');

exports.getAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({error: 'Produk tidak ditemukan'});
    res.json(product);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    
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
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({error: 'Produk tidak ditemukan'});
    }
    
    product.set(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.remove = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({error: 'Produk tidak ditemukan'});
    
    await product.destroy();
    res.json({message: 'Produk dihapus'});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};
