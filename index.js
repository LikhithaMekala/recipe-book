const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// ------------------- MongoDB Connection -------------------
mongoose.connect('mongodb://127.0.0.1:27017/recipebook', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ DB connection error:', err));

// ------------------- Recipe Schema -------------------
const recipeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  description: String,
  ingredients: [String],
  steps: [String]
});
const Recipe = mongoose.model("Recipe", recipeSchema);

// ------------------- Middleware -------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ------------------- Routes -------------------

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Signup
app.post('/signup', async (req, res) => {
  const { firstName, lastName, mobileno, email, password } = req.body;
  const cleanEmail = email.trim().toLowerCase();

  try {
    const userExists = await mongoose.connection.db.collection('users').findOne({ email: cleanEmail });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    await mongoose.connection.db.collection('users').insertOne({
      firstName, lastName, mobileno, email: cleanEmail, password
    });

    console.log(`✅ New user registered: ${cleanEmail}`);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login
app.post('/login', async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password.trim();

  try {
    const user = await mongoose.connection.db.collection('users').findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.password !== password) return res.status(401).json({ message: "Invalid password" });

    res.cookie('userEmail', email, {
      httpOnly: false,
      path: '/',
    });

    console.log(`✅ Login successful for: ${email}`);
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Logout
app.get('/logout', (req, res) => {
  res.clearCookie('userEmail');
  res.status(200).json({ message: "Logged out successfully" });
});

// 📥 Upload Recipe
app.post('/api/recipes', async (req, res) => {
  const { id, name, image, description, ingredients, steps } = req.body;

  const recipe = new Recipe({ id, name, image, description, ingredients, steps });

  try {
    await recipe.save();
    console.log(`✅ Recipe "${name}" saved to DB`);
    res.status(201).json({ message: "Recipe saved successfully" });
  } catch (err) {
    console.error('❌ Recipe save error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 📋 Get all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.json(recipes);
  } catch (err) {
    console.error('❌ Fetch error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 📄 Get a single recipe by ID
app.get("/api/recipes/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid recipe ID" });
  }

  try {
    const recipe = await Recipe.findOne({ id });
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
app.get('/api/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send('Not found');
    res.json(recipe);
  } catch (error) {
    res.status(500).send("Error fetching recipe");
  }
});

