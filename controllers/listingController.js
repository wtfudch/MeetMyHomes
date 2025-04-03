const Property = require('../models/property');

const getListingsPage = async (req, res) => {
  const properties = await Property.find();
  res.render('listings', { title: 'Listings', properties });
};

module.exports = {getListingsPage};