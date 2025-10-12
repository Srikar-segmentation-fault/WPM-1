const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// Helper function to generate and send a JWT
const sendJSONresponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

// --- Registration Controller ---
const register = (req, res) => {
  // Simple validation: check for required fields
  if (!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  // Create a new user instance
  const user = new User();
  
  // Set the user's details from the request body
  user.name = req.body.name;
  user.email = req.body.email;

  // Use the setPassword method from the model to hash the password
  user.setPassword(req.body.password);

  // Save the new user to the database
  user.save((err) => {
    if (err) {
      // If there's an error (e.g., duplicate email), send an error response
      sendJSONresponse(res, 404, err);
    } else {
      // If successful, we should log the user in by generating a JWT
      // For now, let's just send a success message. We will add JWT generation later.
      sendJSONresponse(res, 200, {
        "message": "Registration successful!"
      });
    }
  });
};


// --- Login Controller ---
const login = (req, res) => {
  // Simple validation
  if (!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  
  // We will use Passport to authenticate the user.
  // This is a placeholder for now. We will implement passport strategy next.
  sendJSONresponse(res, 200, {
    "message": "Login functionality to be implemented with Passport.js"
  });
};

module.exports = {
  register,
  login
};
