/* GET homepage */
const index = (req, res) => {
  res.render('index', { 
    title: 'TFI-24 - Find Auditions',
    crafts: [
      {
        icon: 'fa-user-check',
        title: 'Verified Opportunities',
        text: "We verify every casting call to ensure it's legitimate."
      },
      {
        icon: 'fa-rocket',
        title: 'Direct Connections',
        text: 'Apply directly and get seen by casting directors.'
      },
      {
        icon: 'fa-lightbulb',
        title: 'Showcase Your Talent',
        text: 'Build a beautiful online portfolio to share.'
      }
    ]
  });
};

/* GET 'about' page */
const about = (req, res) => {
  res.render('about', { 
    title: 'About TFI-24',
    pageHeader: { title: 'About TFI-24' }
  });
};

/* GET 'register' page */
// This is the function that was missing
const register = (req, res) => {
  res.render('register', { 
    title: 'Create an Account',
    pageHeader: { title: 'Sign Up' }
  });
};

module.exports = {
  index,
  about,
  register // <-- This export fixes the error
};

