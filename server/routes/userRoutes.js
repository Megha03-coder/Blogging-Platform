const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find().select('-password');
  res.json({ users });
});

// Delete user
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Promote/demote user
router.patch('/:id/role', async (req, res) => {
  const { role } = req.body;
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  );
  res.json({ user: updated });
});

module.exports = router;
