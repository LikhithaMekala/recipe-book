const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  description: String,
  ingredients: [String],
  steps: [String],
  tags: [String]  // ✅ Added for recommendation filtering
});

module.exports = mongoose.model('Recipe', recipeSchema);


