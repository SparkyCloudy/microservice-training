const {db: {models}} = require('../configs');

exports.saveUser = async (req, res) => {
  const user = req.body.data;
  await models.User.create(user);
  res.send({status: 'User Saved', data: user});
};