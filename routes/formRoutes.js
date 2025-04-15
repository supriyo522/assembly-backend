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

  // UPDATE
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await FormData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE
router.delete('/delete/:id', async (req, res) => {
  try {
    await FormData.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

  
module.exports = router;
