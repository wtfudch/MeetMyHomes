/**
 * config/calendarSync.js
 *
 * Builds the list of busy date ranges the availability calendar on each
 * listing page greys out. Two sources are merged:
 *
 * 1. data/bookings.json — generated from the reservations spreadsheet with
 *    `npm run import-reservations` (see scripts/import-reservations.js).
 * 2. Optional Airbnb/Booking.com "export calendar" (.ics) feeds, fetched live.
 *    A listing opts in with a `calendarSync` object in data/listings.json:
 *      "calendarSync": { "airbnbIcal": "https://...ics", "bookingIcal": "https://...ics" }
 *    Either key is optional.
 *
 * Listings that share the same physical space (a whole house and its parts,
 * see config/linkedListings.js) also inherit each other's busy dates.
 *
 * A listing with no source at all simply shows every future date as free.
 */

const listingsData = require('../data/listings.json');
const { getRelatedIds } = require('./linkedListings');

// Reservations imported from the spreadsheet: { listingId: [{ start, end }] }.
// Loaded once at startup; a missing file just means "no imported bookings yet".
let sheetBookings = {};
try {
  sheetBookings = require('../data/bookings.json').bookings || {};
} catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') throw err;
}

const CACHE_TTL_MS = 3 * 60 * 60 * 1000; // 3 hours — plenty fresh for a booking calendar, avoids hammering Airbnb/Booking on every page view
const cache = new Map(); // url -> { fetchedAt, ranges }

// iCal lines longer than 75 octets are "folded" across multiple lines, with
// each continuation line starting with a space or tab. Undo that before
// parsing so a folded DTSTART/DTEND value isn't split in half.
function unfoldIcal(text) {
  const rawLines = text.split(/\r\n|\n|\r/);
  const lines = [];
  for (const line of rawLines) {
    if ((line.startsWith(' ') || line.startsWith('\t')) && lines.length > 0) {
      lines[lines.length - 1] += line.slice(1);
    } else {
      lines.push(line);
    }
  }
  return lines;
}

// "20260615" or "20260615T000000Z" → "2026-06-15"
function parseIcalDate(value) {
  const match = value.match(/(\d{4})(\d{2})(\d{2})/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
}

/**
 * Parses raw .ics text into [{ start, end }] busy ranges (ISO date strings).
 * `end` follows the iCal convention of being the checkout date — i.e. the
 * range is booked for [start, end), and `end` itself is free for a new
 * check-in.
 */
function parseIcalBusyRanges(icalText) {
  const lines = unfoldIcal(icalText);
  const ranges = [];
  let inEvent = false;
  let start = null;
  let end = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line === 'BEGIN:VEVENT') {
      inEvent = true;
      start = null;
      end = null;
      continue;
    }
    if (line === 'END:VEVENT') {
      if (start && end) ranges.push({ start, end });
      inEvent = false;
      continue;
    }
    if (!inEvent) continue;

    if (line.startsWith('DTSTART')) {
      start = parseIcalDate(line.split(':')[1] || '');
    } else if (line.startsWith('DTEND')) {
      end = parseIcalDate(line.split(':')[1] || '');
    }
  }

  return ranges;
}

async function fetchIcalRanges(url) {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) return cached.ranges;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    const ranges = parseIcalBusyRanges(text);
    cache.set(url, { fetchedAt: Date.now(), ranges });
    return ranges;
  } catch (err) {
    console.error(`Calendar sync failed for ${url}:`, err.message);
    if (cached) return cached.ranges; // serve stale data rather than nothing
    return [];
  }
}

// Busy ranges of one listing on its own: spreadsheet bookings plus any
// Airbnb/Booking.com feeds it has configured.
async function getOwnBusyRanges(id) {
  const imported = sheetBookings[id] || [];

  const sync = (listingsData[id] && listingsData[id].calendarSync) || {};
  const urls = [sync.airbnbIcal, sync.bookingIcal].filter(Boolean);
  if (urls.length === 0) return imported;

  const results = await Promise.all(urls.map(fetchIcalRanges));
  return [...imported, ...results.flat()];
}

/**
 * Returns the merged busy ranges for a listing: its own bookings plus those
 * of every listing sharing its space. Fails soft: a broken or slow feed
 * never breaks the page, it just contributes no ranges.
 */
async function getBusyRangesForListing(listing) {
  const ids = [listing.id, ...getRelatedIds(listing.id)];
  const results = await Promise.all(ids.map(getOwnBusyRanges));
  return results.flat();
}

module.exports = { getBusyRangesForListing, parseIcalBusyRanges };
