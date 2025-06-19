const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

   router.post('/register', (req, res) => {
  console.log('✅ Register endpoint hit');
  res.status(200).json({ message: 'User registered successfully' });
});
 
router.post('/login', async (req, res) => {
  console.log("📥 Login Request:", req.body); // <--- Add this

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

});




const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
