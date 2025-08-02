const db = require('../models');

exports.saveUser = async (req, res) => {
  const user = req.body.data;
  await db.User.create(user);
  res.send({status: 'User Saved', data: user});
};