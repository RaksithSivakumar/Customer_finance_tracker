const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Worker = require('../models/Worker');


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login Request Received:', { email, password });

  try {
    let user = null;
    let role = '';

    if (email) {
      user = await Admin.findOne({ email });
      if (user) {
        role = 'admin';
      } else {
        user = await Worker.findOne({ email: email });
        if (user) {
          role = 'worker';
        }
      }
    }

    console.log('User Found:', { user, role });

    if (!user) {
      console.error('Invalid Email');
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log('Password Match:', match);

    if (!match) {
      console.error('Invalid Password');
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    const token = jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log('Login Successful:', { role, token });
    res.json({
      success: true,
      message: `Login successful! You are logged in as ${role}.`,
      role,
      token,
    });
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;