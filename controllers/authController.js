const User = require('../models/user');
const Menu = require('../models/menus')
const {hashPassword, comparePasswords} =require('../helpers/auth')

const test = (req, res) => {
    res.json('test is working');
}; 
//register endpoint
const registerUser = async (req, res) => {
    try {
        const { name, email, password, streetaddress, zipcode, isCompany } = req.body;

        // Check if name, email, and password are provided
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        // Check if password is strong enough
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password should be at least 6 characters long' });
        }

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Create user object
        const user = new User({
            name,
            email,
            password,
            streetaddress,
            zipcode,
            isCompany
        });

        // Save user to the database
        await user.save();

        // Redirect to appropriate dashboard based on user type
        if (isCompany) {
            return res.status(201).json({ message: 'Company registered successfully' });
        } else {
            return res.status(201).json({ message: 'Individual registered successfully' });
        }
    } catch (error) {
        console.error('Error in registerUser:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


//Login endpoint

// Login endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'No user found' });
        }

        // Check if password matches
        const match = await comparePasswords(password, user.password);
        if (match) {
            // Passwords match, return user data
            return res.status(200).json({ _id: user._id, isCompany: user.isCompany });
        } else {
            // Passwords don't match
            return res.status(400).json({ error: 'Incorrect password' });
        }
    } catch (error) {
        console.error('Error in loginUser:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

//postEndpoint
// authController.js

// Assuming you have required the necessary models at the top of the file

const postMenu = async (req, res) => {
    try {
      // Extract data from the request body
      const { companyName, closingTime, menuItems } = req.body;
  
      // Do something with the data (e.g., save it to the database)
      // For example, if you have a Menu model:
      const menu = new Menu({
        companyName, // Include companyName in the menu data
        closingTime,
        menuItems
      });
      await menu.save();
  
      // Respond with a success message
      res.status(200).json({ message: 'Menu posted successfully', companyName }); // Include companyName in the response
    } catch (error) {
      console.error('Error posting menu:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = {
    test,
    registerUser,
    loginUser,
    postMenu
  };
  