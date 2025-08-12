const express = require('express');
const { spawn } = require('child_process');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Content-based by recipe ID
router.get('/:recipeId', (req, res) => {
  const python = spawn('python', ['recommend.py', req.params.recipeId]);

  let data = '';
  python.stdout.on('data', chunk => data += chunk);
  python.on('close', () => {
    try {
      const result = JSON.parse(data);
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: 'Error processing recommendations' });
    }
  });
});

// Tag-based fallback
router.get('/recommend/:tag', async (req, res) => {
  const tag = req.params.tag;
  try {
    const recommended = await Recipe.find({ tags: tag });
    res.json(recommended);
  } catch (err) {
    console.error('Error fetching recommendations:', err);
    res.status(500).json({ message: 'Error getting recommendations' });
  }
});

module.exports = router;

