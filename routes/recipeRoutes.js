const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching recipes' });
  }
});

// GET one recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching recipe' });
  }
});

// GET recommended recipes based on tags
router.get('/recommend/:id', async (req, res) => {
  try {
    const currentRecipe = await Recipe.findById(req.params.id);
    if (!currentRecipe || !currentRecipe.tags) {
      return res.json([]);
    }

    const recommended = await Recipe.find({
      _id: { $ne: currentRecipe._id },
      tags: { $in: currentRecipe.tags }
    }).limit(3);

    res.json(recommended);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching recommendations' });
  }
});

module.exports = router;


