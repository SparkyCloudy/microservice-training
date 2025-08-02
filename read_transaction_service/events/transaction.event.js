const db = require('../models');

exports.saveTransaction = async (req, res) => {
  const transaction = req.body.data;
  await db.Transaction.create(transaction);
  res.send({status: 'Transaction Saved', data: transaction});
};
