const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose'); // Correct import
const app = express();
const MenuItem = require("../server/models/menus")
const UserModel = require("../server/models/user")
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));



// database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected!'))
  .catch((err) => console.log('Database not Connected!', err)); // Added error parameter




// Define route to fetch data
app.get('/api/users', async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await UserModel.find();
    res.json(users); // Return fetched users as JSON
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/menus', async (req, res) => {
  try {
    // Fetch all menu items from the database
    const menuItems = await MenuItem.find();
    res.json(menuItems); // Return fetched menu items as JSON
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/menus/', async (req, res) => {
  try {
    // Fetch the top 5 newest menu items sorted by price
    const menuItems = await MenuItem.find().sort({ createdAt: -1 }).limit(5).sort({ price: 1 });
    res.json(menuItems); // Return fetched menu items as JSON
  } catch (error) {
    console.error('Error fetching top 5 menu items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



//middleware
app.use(express.json())
app.use('/', require('./routes/authRoutes'));

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
