const listingsData       = require('../data/listings.json');
const { buildListingMedia } = require('../config/media');

// Enrich each listing with generated image URLs once at startup
const listings = Object.fromEntries(
  Object.entries(listingsData).map(([key, listing]) => {
    const { images } = buildListingMedia(listing.id, listing.media);
    return [key, { ...listing, images }];
  })
);

// ── GET /listings ───────────────────────────────────────────────────────────
const getAllListings = (req, res) => {
  res.render('listings/listings', {
    title: 'Vacation Rentals',
    listings: Object.values(listings),
  });
};

// ── GET /listings/:id ───────────────────────────────────────────────────────
const getListingById = (req, res) => {
  const listing = listings[req.params.id];
  if (!listing) return res.status(404).render('404', { title: 'Listing not found' });

  res.render('listings/listing', { title: listing.title, listing });
};

module.exports = { getAllListings, getListingById, listings };
