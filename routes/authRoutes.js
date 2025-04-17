const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();


// Register
// Register
router.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const expectedUsername = process.env.ADMIN_USERNAME;
      const expectedPassword = process.env.ADMIN_PASSWORD;
  
      // Only allow registration if the username and password match the admin credentials
      if (username !== expectedUsername || password !== expectedPassword) {
        return res.status(401).json({ error: 'Unauthorized credentials' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = await User.findOneAndUpdate(
        { username },
        { username, password: hashedPassword },
        { upsert: true, new: true }
      );
  
      res.status(201).json({ message: 'Admin user registered or updated successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Registration failed', details: err.message });
    }
  });
  
  
  

module.exports = router;
