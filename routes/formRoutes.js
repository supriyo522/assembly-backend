const express = require('express');
const router = express.Router();
const FormData = require('../models/FormData');

router.post('/submit', async (req, res) => {
  try {
    const newForm = new FormData(req.body);
    await newForm.save();
    res.status(201).json({ message: 'Form saved' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/all', async (req, res) => {
    try {
      const forms = await FormData.find().sort({ createdAt: -1 });
      res.status(200).json(forms);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch forms' });
    }
  });
  
module.exports = router;
