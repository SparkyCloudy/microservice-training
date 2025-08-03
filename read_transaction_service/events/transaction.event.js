const {db: {models}} = require('../configs');

exports.saveTransaction = async (req, res) => {
  const transaction = req.body.data;
  await models.Transaction.create(transaction);
  res.send({status: 'Transaction Saved', data: transaction});
};
