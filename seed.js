// seed.js
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');

mongoose.connect('mongodb://127.0.0.1:27017/recipebook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleRecipes = [
  {
    name: "Chocolate Cake",
    description: "Rich and moist chocolate layer cake.",
    image: "https://images.unsplash.com/photo-1607274131265-58be24d674a5",
    tags: ["dessert", "sweet"]
  },
  {
    name: "Paneer Tikka",
    description: "Grilled cottage cheese cubes marinated in spices.",
    image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/10/paneer-tikka.jpg",
    tags: ["starter", "vegetarian"]
  },
  {
    name: "Avocado Toast",
    description: "Toasted bread topped with mashed avocado and seasoning.",
    image: "https://www.acouplecooks.com/wp-content/uploads/2021/04/Avocado-Toast-007.jpg",
    tags: ["breakfast", "vegan"]
  },
  {
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with creamy dressing and croutons.",
    image: "https://www.simplyrecipes.com/thmb/OGgXmhh2UWXJnyOBcvZkkvIpyzk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Caesar-Salad-LEAD-08-53d173bf597e44d3a5ed6432078a7dfb.jpg",
    tags: ["lunch", "healthy"]
  },
  {
    name: "Masala Dosa",
    description: "Crispy fermented crepe with spiced potato filling.",
    image: "https://www.cookwithmanali.com/wp-content/uploads/2020/05/Masala-Dosa.jpg",
    tags: ["breakfast", "south-indian"]
  }
];

const seedDB = async () => {
  await Recipe.deleteMany({});
  await Recipe.insertMany(sampleRecipes);
  console.log("Sample recipes inserted!");
  mongoose.connection.close();
};

seedDB();

