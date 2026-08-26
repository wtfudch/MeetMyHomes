const listingsData       = require('../data/listings.json');
const { buildListingMedia } = require('../config/media');
const { getAmenityIcon } = require('../config/amenityIcons');
const { getBusyRangesForListing } = require('../config/calendarSync');

// Enrich each listing with generated image URLs, amenity icons and a numeric
// price (parsed once from "€160" style strings) so the search filters on the
// /listings page don't have to reparse it on every request.
const listings = Object.fromEntries(
  Object.entries(listingsData).map(([key, listing]) => {
    const { images } = buildListingMedia(listing.id, listing.media);
    const amenities = listing.amenities.map(name => ({ name, icon: getAmenityIcon(name) }));
    const priceValue = parseInt(String(listing.pricePerNight).replace(/[^\d]/g, ''), 10) || 0;
    return [key, { ...listing, images, amenities, priceValue }];
  })
);

// Options for the search filters on /listings, derived once at startup so
// they always reflect what's actually in data/listings.json.
const filterOptions = (() => {
  const all = Object.values(listings);

  const locations = [...new Set(all.map(l => l.location))].sort();
  const maxPrice  = Math.max(...all.map(l => l.priceValue), 0);
  const maxGuests = Math.max(...all.map(l => l.guests || 0), 0);

  return { locations, maxPrice, maxGuests };
})();

// ── GET /listings ───────────────────────────────────────────────────────────
const getAllListings = (req, res) => {
  res.render('listings/listings', {
    title: 'Vacation Rentals',
    listings: Object.values(listings),
    filterOptions,
  });
};

// ── GET /listings/:id ───────────────────────────────────────────────────────
const getListingById = async (req, res) => {
  const listing = listings[req.params.id];
  if (!listing) return res.status(404).render('404', { title: 'Listing not found' });

  // getBusyRangesForListing() already fails soft internally (bad/slow feeds
  // just contribute no ranges), but guard here too so nothing about the sync
  // can ever take down the listing page itself.
  let busyRanges = [];
  try {
    busyRanges = await getBusyRangesForListing(listing);
  } catch (err) {
    console.error(`Unexpected calendar sync error for ${listing.id}:`, err);
  }

  try {
    res.render('listings/listing', {
      title: listing.title,
      listing,
      busyRanges,
      web3formsKey: process.env.WEB3FORMS_ACCESS_KEY,
    });
  } catch (err) {
    console.error(`Failed to render listing ${listing.id}:`, err);
    res.status(500).render('404', { title: 'Something went wrong' });
  }
};

module.exports = { getAllListings, getListingById, listings };
