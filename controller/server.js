const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require("http");
const app = express();
const Recipe = require('../model/recipe'); // Import the Recipe model
const db = require('../model/db'); // MongoDB connection
const bcrypt = require('bcrypt'); // Add this line to import bcrypt


app.use(express.static(path.join(__dirname, '/../view'))); // Serve static files (CSS, JS, images)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

http.createServer(app).listen(8080, () => {
  console.log("Server is running at http://localhost:8080");
});

// Route to fetch all recipes from the MongoDB database
app.get('/recipes', (req, res) => {
  Recipe.find() // Fetch all recipes from the database
    .then(recipes => {
      res.json(recipes); // Send the recipes as JSON (or render if you're using a template engine)
    })
    .catch(err => {
      res.status(500).send('Error fetching recipes');
    });
});

// Route to fetch a specific recipe by ID from the MongoDB database
app.get('/recipes/:id', (req, res) => {
  Recipe.findById(req.params.id) // Find recipe by ID
    .then(recipe => {
      if (recipe) {
        res.json(recipe); // Send the recipe as JSON if found
      } else {
        res.status(404).send('Recipe not found');
      }
    })
    .catch(err => {
      res.status(500).send('Error fetching recipe');
    });
});

const User = require('../model/user'); // Import the User model

// Signup route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: 'Username already exists!' });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ msg: 'Signup successful!' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ msg: 'An error occurred during signup.' });
  }
});

const session = require('express-session'); // Import session for storing user sessions

// Add session middleware (use Redis for better scalability, but for now, we'll just use in-memory store)
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

/// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username }); // Find the user by username
  
      if (!user) {
        return res.status(400).json({ msg: 'User not found' }); // Handle case if the user does not exist
      }
  
      const isMatch = await bcrypt.compare(password, user.password); // Compare the password with the hashed password
  
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid password' }); // Handle invalid password
      }
  
      // If login is successful, set a session or token for the user (optional)
      req.session.userId = user._id;
      res.json({ msg: 'Login successful', userId: user._id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  });

function isAuthenticated(req, res, next) {
    if (!req.session.userId) {
      return res.status(401).json({ msg: 'Unauthorized. Please log in.' });
    }
    next(); // Proceed to the next middleware or route handler
  }


  app.post('/recipes', isAuthenticated, (req, res) => {
    // Handle adding a recipe, but only if the user is authenticated
  });
  

  // Check if the user is logged in
app.get('/check-session', (req, res) => {
    if (req.session.userId) {
      res.json({ loggedIn: true });
    } else {
      res.json({ loggedIn: false });
    }
  });
  
  // Logout route
  app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ msg: 'Error logging out' });
      }
      res.json({ msg: 'Logged out successfully' });
    });
  });
  

// Route to fetch logged-in user details
app.get('/profile', isAuthenticated, async (req, res) => {
    try {
      const user = await User.findById(req.session.userId, 'username'); // Fetch only the username
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json(user); // Send the user data as JSON
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  });

// Route to update user password
app.post('/update-profile', isAuthenticated, async (req, res) => {
    const { password } = req.body;
  
    try {
      if (!password) {
        return res.status(400).json({ msg: 'Password is required' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Update the user's password in the database
      await User.findByIdAndUpdate(req.session.userId, { password: hashedPassword });
  
      res.json({ msg: 'Password updated successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'An error occurred while updating the profile.' });
    }
  });
  

// Route to delete the user account
app.post('/delete-account', isAuthenticated, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.session.userId); // Delete the user from the database
      req.session.destroy(); // Destroy the session
      res.json({ msg: 'Account deleted successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'An error occurred while deleting the account.' });
    }
  });
  