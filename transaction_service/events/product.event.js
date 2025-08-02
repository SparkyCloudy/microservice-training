const db = require('../models');

exports.saveProduct = async (req, res) => {
  const product = req.body.data;
  await db.Product.create(product);
  res.send({status: 'Product Saved', data: product});
};