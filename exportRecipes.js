const mongoose = require('mongoose');
const fs = require('fs');
const Recipe = require('./models/Recipe');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const data = await Recipe.find();
  fs.writeFileSync('recipes.json', JSON.stringify(data, null, 2));
  console.log('✅ Recipes exported to recipes.json');
  mongoose.disconnect();
}).catch(err => {
  console.error('❌ Failed to export recipes:', err);
});

