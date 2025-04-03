const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  location: String,
});

module.exports = mongoose.model('Property', propertySchema);