const mongoose = require('mongoose');

// Define the recipe schema
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  ingredients: [String], 
  instructions: [String], 
  time: { type: String }, 
  category: { type: String }, 
  image: { type: String }, // URL to the image
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Associate recipes with users
});

// Create the Recipe model
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe; // Export the model
