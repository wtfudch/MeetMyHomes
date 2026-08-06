const { properties } = require('./propertyController');
const { listings }   = require('./listingController');

const getHomePage = (req, res) => {
  res.render('home', { title: 'Home', properties, listings });
};

module.exports = { getHomePage };
