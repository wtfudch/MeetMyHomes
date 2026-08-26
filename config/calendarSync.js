/**
 * config/calendarSync.js
 *
 * Fetches each listing's Airbnb/Booking.com "export calendar" (.ics) feed
 * and turns it into a list of busy date ranges, so the availability
 * calendar on the listing page can grey out dates that are already booked
 * on those platforms.
 *
 * A listing opts in by having a `calendarSync` object in data/listings.json:
 *   "calendarSync": { "airbnbIcal": "https://...ics", "bookingIcal": "https://...ics" }
 * Either key is optional. Listings without `calendarSync` simply show no
 * synced busy dates (the calendar still works, just without that data).
 */

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

/**
 * Returns the merged busy ranges for a listing, from every calendar source
 * it has configured (Airbnb and/or Booking.com). Fails soft: a broken or
 * slow feed never breaks the page, it just contributes no ranges.
 */
async function getBusyRangesForListing(listing) {
  const sync = listing.calendarSync || {};
  const urls = [sync.airbnbIcal, sync.bookingIcal].filter(Boolean);
  if (urls.length === 0) return [];

  const results = await Promise.all(urls.map(fetchIcalRanges));
  return results.flat();
}

module.exports = { getBusyRangesForListing, parseIcalBusyRanges };
