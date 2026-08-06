// models/Property.js
// Currently unused — data is loaded from data/properties.json.
// Uncomment and expand when a database is introduced.
/*
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  id:           { type: String, required: true, unique: true },
  title:        { type: String, required: true },
  price:        String,
  area:         String,
  bedrooms:     Number,
  bathrooms:    Number,
  propertyType: String,
  isUrban:      Boolean,
  location:     String,
  coordinates:  { latitude: Number, longitude: Number },
  description:  { 'pt-PT': String, en: String },
  media:        { imageCount: Number, imageExt: String, plantCount: Number, plantExt: String, videoCount: Number },
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
*/
