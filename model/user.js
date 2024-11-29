const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed passwords
});

// Before saving the user, hash the password
userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
  
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
      if (err) return next(err);
      this.password = hashedPassword;
      next();
    });
  });
  
  const User = mongoose.model('User', userSchema); // Create the model
  
  module.exports = User; 
  
  const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed passwords
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }] // Reference to recipes
  });