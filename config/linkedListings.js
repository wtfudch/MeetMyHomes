/**
 * config/linkedListings.js
 *
 * Some listings share the same physical space: a "whole house" listing plus
 * the separate parts it is made of (e.g. Villa Atlântico = Garden apartment
 * + Balcony apartment). data/linked-listings.json describes that as
 *   { "<whole-house id>": ["<part id>", "<part id>"] }
 *
 * Booking the whole house takes up every part, and booking any part takes up
 * the whole house. The parts themselves stay independent of each other.
 */

let links = {};
try {
  links = require('../data/linked-listings.json');
} catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') throw err;
}

// id -> ids whose bookings also make this listing unavailable
const related = {};
for (const [whole, parts] of Object.entries(links)) {
  related[whole] = [...(related[whole] || []), ...parts];
  for (const part of parts) related[part] = [...(related[part] || []), whole];
}

const getRelatedIds = id => related[id] || [];

module.exports = { links, getRelatedIds };
