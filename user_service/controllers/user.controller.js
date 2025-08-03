const {db} = require('../configs');
const User = db.models.User;
const axios = require('axios');

exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({error: 'User tidak ditemukan'});
    res.json(user);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.create = async (req, res) => {
  try {
    const user = await User.create(req.body);
    
    // Send event to event bus
    await axios.post('http://localhost:3000/events', {
      type: 'user', action: 'add', data: user
    });
    
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findByPk(req.body.id);
    if (!user) return res.status(404).json({error: 'User tidak ditemukan'});
    
    await user.set(req.body);
    await user.save();
    res.json({message: 'User diperbarui'});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.remove = async (req, res) => {
  try {
    const user = await User.findByPk(req.body.id);
    if (!user) return res.status(404).json({error: 'User tidak ditemukan'});
    
    await user.destroy();
    res.json({message: 'User dihapus'});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};