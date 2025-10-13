/* GET 'home' page */
const homelist = (req, res) => {
  res.render('locations-list', {
    title: 'TFI-24 - Find a place to work with wifi',
    pageHeader: {
      title: 'TFI-24',
      strapline: 'Find places to work with wifi near you!'
    },
    sidebar:
      "Looking for practice and a showcase? TFI-24 helps you find places " +
      "to work when out and about. Perhaps with coffee, cake or a pint? " +
      "Let TFI-24 help you find the place you're looking for.",
    locations: [
      {
        name: 'Jubilee Hills, Hyderabad',
        address: '124 High Street, Reading, RG6 1PS',
        rating: 3,
        facilities: ['Practice rooms', 'Food', 'Premium wifi'],
        distance: '100m'
      },
      {
        name: 'Ghatkesar, Hyderabad',
        address: 'Singapore township, Hyderabad',
        rating: 4,
        facilities: ['Hot drinks', 'Food', 'Premium wifi'],
        distance: '200m'
      },
    ]
  });
};

/* Location data */
const location = {
  name: 'Amberpet, Hyderabad',
  address: '125 High Street',
  rating: 3,
  facilities: ['Wifi', 'Food', 'Practice Rooms'],
  coords: {
    lat: 51.455041,
    lng: -0.9690884
  },
  openingTimes: [
    {
      days: 'Monday - Friday',
      opening: '7:00am',
      closing: '7:00pm',
      closed: false
    },
    {
      days: 'Saturday',
      opening: '8:00am',
      closing: '5:00pm',
      closed: false
    },
    {
      days: 'Sunday',
      closed: true
    }
  ],
  reviews: [
    {
      author: 'Simon Holmes',
      rating: 5,
      timestamp: '16 July 2013',
      reviewText: "What a great place. I can't say enough good things about it."
    },
    {
      author: 'Charlie Chaplin',
      rating: 3,
      timestamp: '16 June 2013',
      reviewText: "It was okay. Coffee wasn't great, but the wifi was fast."
    }
  ]
};

/* GET 'Location info' page */
const locationInfo = (req, res) => {
  res.render('location-info', {
    title: location.name,
    pageHeader: { title: location.name },
    sidebar: {
      context:
        'TFI-24 has accessible wifi and space to practice your lines. And execute your talent to the fullest.',
      callToAction:
        "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
    },
    location
  });
};

/* GET 'Add review' page */
const addReview = (req, res) => {
  res.render('location-review-form', { title: 'Add review' });
};

/* GET 'Login' page */
   const renderLoginPage = (req, res) => {
     res.render('login', { title: 'Login' });
   };

module.exports = {
  homelist,
  locationInfo,
  addReview,
  renderLoginPage
};