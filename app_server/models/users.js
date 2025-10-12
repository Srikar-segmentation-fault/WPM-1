const mongoose = require('mongoose');
const crypto = require('crypto');

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true, // Emails must be unique
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String, // This will store the hashed password
  salt: String  // This is used to create the hash
});

/**
 * Sets the password for a user.
 * This method takes a plain-text password, generates a random salt,
 * and then creates a hash from the password and salt.
 * @param {string} password - The plain-text password to hash.
 */
userSchema.methods.setPassword = function(password) {
  // Create a unique, random salt for each user
  this.salt = crypto.randomBytes(16).toString('hex');
  
  // Hash the salt and password with 1000 iterations and sha512 algorithm
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

/**
 * Validates a submitted password against the stored hash.
 * @param {string} password - The plain-text password to validate.
 * @returns {boolean} - True if the password is correct, false otherwise.
 */
userSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

// Compile the schema into a model
mongoose.model('User', userSchema);
