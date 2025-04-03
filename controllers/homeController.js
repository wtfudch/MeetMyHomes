const Property = require('../models/property');

const getHomePage = async (req, res) => {
  try {
    const properties = await Property.find();
    res.render('home', { title: 'Home', properties });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = {getHomePage}