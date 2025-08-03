const {db: {models}} = require('../configs');

exports.saveProduct = async (req, res) => {
  const product = req.body.data;
  await models.Product.create(product);
  res.send({status: 'Product Saved', data: product});
};