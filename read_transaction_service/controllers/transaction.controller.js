const {db: {models}} = require('../configs');

exports.getAll = async (req, res) => {
  try {
    const data = await models.Transaction.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.getById = async (req, res) => {
  try {
    const transaction = await models.Transaction.findByPk(req.params.id);
    if (!transaction) return res.status(404).json({error: 'Transaksi tidak ditemukan'});
    res.json(transaction);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};
