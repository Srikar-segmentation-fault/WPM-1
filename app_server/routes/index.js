const express = require('express');
const router = express.Router();

// Require all your controllers
const ctrlMain = require('../controllers/main');
const ctrlLocations = require('../controllers/locations');
const ctrlAuth = require('../controllers/authentication');

/* --- Main Pages (from main.js) --- */
router.get('/', ctrlMain.index);
router.get('/about', ctrlMain.about);
// This is the route that is missing
router.get('/register', ctrlMain.register); 

/* --- Location Pages (from locations.js) --- */
router.get('/locations', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location-review-form', ctrlLocations.addReview);

/* --- Authentication Pages --- */
// This is the other route that is missing
router.get('/login', ctrlLocations.renderLoginPage); 
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;

