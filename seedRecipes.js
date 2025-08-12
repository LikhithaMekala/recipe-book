const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/recipebook';

const recipeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  description: String,
  ingredients: [String],
  steps: [String],
  tags: [String],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

const recipes = [
  {
    id: 1,
    name: "Delicious Pasta",
    image: "https://i.pinimg.com/736x/ac/98/01/ac9801cd9833cc153194c0691d03892b.jpg",
    description: "A classic Italian pasta dish with rich tomato sauce.",
    ingredients: ["200g spaghetti", "2 tbsp olive oil", "3 garlic cloves", "1 onion", "400g canned tomatoes", "1 tsp oregano", "Salt and pepper", "Basil", "Parmesan cheese"],
    steps: ["Boil the pasta in salted water.", "Sauté garlic and onion in olive oil.", "Add tomatoes and oregano; simmer 10 mins.", "Mix pasta with sauce.", "Serve with basil and parmesan."],
    tags: ["italian", "dinner", "vegetarian"]
  },
  {
    id: 2,
    name: "Chocolate Cake",
    image: "https://i.pinimg.com/736x/b6/f0/cf/b6f0cf61349414883277abedc255450f.jpg",
    description: "Rich and moist chocolate cake for dessert lovers.",
    ingredients: ["1 cup flour", "1 cup sugar", "1/2 cup cocoa powder", "1 tsp baking powder", "1/2 tsp salt", "2 eggs", "1/2 cup milk", "1/2 cup vegetable oil", "1 tsp vanilla"],
    steps: ["Preheat oven to 350°F (175°C).", "Mix dry ingredients together.", "Add eggs, milk, oil, and vanilla; mix until smooth.", "Pour into a greased pan and bake 30–35 mins.", "Let cool and serve."],
    tags: ["dessert", "baking", "sweet"]
  },
  {
    id: 3,
    name: "Fresh Salad",
    image: "https://images.stockcake.com/public/a/7/f/a7f82c2f-29f8-4cc2-86c8-4abbbf026449_large/fresh-salad-bowl-stockcake.jpg",
    description: "A light and refreshing vegetable salad.",
    ingredients: ["1 cucumber", "2 tomatoes", "1 red onion", "Lettuce leaves", "2 tbsp olive oil", "1 tbsp lemon juice", "Salt", "Pepper"],
    steps: ["Chop vegetables into bite-sized pieces.", "Mix olive oil, lemon juice, salt, and pepper for dressing.", "Toss veggies with dressing and serve."],
    tags: ["healthy", "vegan", "lunch"]
  },
  {
    id: 4,
    name: "Fluffy Pancakes",
    image: "https://english.cdn.zeenews.com/sites/default/files/2024/07/23/1446601-4.png",
    description: "Soft, fluffy pancakes for breakfast.",
    ingredients: ["1 cup flour", "2 tbsp sugar", "1 tsp baking powder", "1/2 tsp salt", "1 cup milk", "1 egg", "2 tbsp melted butter", "1 tsp vanilla"],
    steps: ["Mix dry ingredients in a bowl.", "Whisk in wet ingredients until smooth.", "Heat a pan and grease lightly.", "Pour batter and cook both sides until golden.", "Serve with syrup or toppings."],
    tags: ["breakfast", "sweet", "easy"]
  },
  {
    id: 5,
    name: "Banana Oatmeal Smoothie",
    image: "https://i.pinimg.com/736x/00/e8/e2/00e8e2d7a72d104b301c4d44064a9707.jpg",
    description: "Healthy and energizing banana smoothie.",
    ingredients: ["1 banana", "1/2 cup rolled oats", "1 cup milk", "1 tbsp honey", "1/4 tsp cinnamon", "Ice cubes"],
    steps: ["Add all ingredients to a blender.", "Blend until smooth.", "Pour into a glass and enjoy."],
    tags: ["smoothie", "healthy", "breakfast"]
  },
  {
    id: 6,
    name: "Grilled Lemon Garlic Chicken",
    image: "https://i.pinimg.com/736x/e0/81/d2/e081d25c26e6631d49aeace8d06c6f41.jpg",
    description: "Juicy grilled chicken with lemon and garlic.",
    ingredients: ["2 chicken breasts", "2 tbsp olive oil", "2 garlic cloves", "Juice of 1 lemon", "Salt", "Pepper"],
    steps: ["Mix olive oil, lemon juice, garlic, salt, and pepper.", "Marinate chicken for 30 mins.", "Grill each side for 5–7 minutes until cooked.", "Serve hot."],
    tags: ["dinner", "grilled", "non-vegetarian"]
  },
  {
    id: 7,
    name: "Classic Tiramisu",
    image: "https://static.sociofyme.com/thumb/151286736/151286736.jpg?imgsize=1373218&width=420&height=746&resizemode=76",
    description: "Traditional Italian dessert with coffee and mascarpone.",
    ingredients: ["200g ladyfingers", "250g mascarpone", "3 eggs", "1/2 cup sugar", "1 cup brewed coffee", "Cocoa powder"],
    steps: ["Separate eggs and beat yolks with sugar.", "Add mascarpone to the yolk mixture.", "Whisk egg whites and fold into the mix.", "Dip ladyfingers in coffee and layer with cream.", "Refrigerate and dust with cocoa before serving."],
    tags: ["dessert", "italian", "coffee"]
  },
  {
    id: 8,
    name: "Strawberry Cheesecake",
    image: "https://i.pinimg.com/736x/ac/b1/57/acb157b80a29636830ae7c93212af598.jpg",
    description: "Creamy cheesecake topped with strawberries.",
    ingredients: ["200g biscuits", "100g butter", "250g cream cheese", "100g sugar", "2 eggs", "Strawberry topping"],
    steps: ["Crush biscuits and mix with melted butter for crust.", "Beat cream cheese with sugar and eggs.", "Pour over crust and bake for 40 mins.", "Cool and top with strawberries."],
    tags: ["dessert", "baking", "sweet"]
  },
  {
    id: 9,
    name: "Veggie Stir Fry",
    image: "https://jessicainthekitchen.com/wp-content/uploads/2022/07/Vegan-Stir-Fry01030.jpg",
    description: "Quick and healthy stir-fried vegetables.",
    ingredients: ["1 bell pepper", "1 carrot", "1 zucchini", "2 tbsp soy sauce", "1 tbsp sesame oil", "Garlic", "Salt"],
    steps: ["Chop veggies into strips.", "Heat oil and add garlic.", "Add veggies and stir fry 5 mins.", "Add soy sauce and cook 2 more mins.", "Serve hot."],
    tags: ["vegan", "dinner", "stir-fry"]
  },
  {
    id: 10,
    name: "Mango Smoothie",
    image: "https://i.pinimg.com/736x/3d/78/a4/3d78a48c8e3aadd0a7a8c4e44235b539.jpg",
    description: "A refreshing mango smoothie with tropical flavor.",
    ingredients: ["1 mango", "1/2 cup yogurt", "1/2 cup milk", "1 tbsp honey", "Ice cubes"],
    steps: ["Peel and chop mango.", "Blend all ingredients until smooth.", "Serve chilled."],
    tags: ["smoothie", "fruit", "refreshing"]
  }
];

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    await Recipe.deleteMany({});
    await Recipe.insertMany(recipes);
    console.log('🍽️ 10 recipes inserted!');
    mongoose.disconnect();
  })
  .catch(err => console.error('❌', err));


