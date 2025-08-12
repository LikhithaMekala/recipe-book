const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// ✅ Serve static frontend files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/recipebook', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// ✅ Routes
const recommendRoutes = require('./routes/recommendRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/authRoutes'); // ✅ Corrected file name

app.use('/api/recommendations', recommendRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes); // ✅ Corrected variable name

// ✅ Default route - serve home.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// ❌ Catch-all route (for undefined paths)
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
