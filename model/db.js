<<<<<<< HEAD

=======
>>>>>>> 7e3ea8a32fe9c8001c7c98b4f9f8d747378cc8bb

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipeApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose; // Export mongoose for use in other files
