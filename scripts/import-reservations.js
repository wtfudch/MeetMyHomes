/**
 * scripts/import-reservations.js
 *
 * Reads the reservations spreadsheet (one row per booking: property name,
 * check-in date, check-out date) and writes data/bookings.json, which the
 * availability calendar uses to grey out booked dates.
 *
 * Usage:
 *   npm run import-reservations -- "C:\path\to\reservas.xlsx"
 *
 * Property names in the sheet are matched to listing ids through
 * data/reservations-names.json (matching ignores case, accents and extra
 * spaces). A name can map to one id, to a list of ids (one booking that
 * covers several listings, e.g. both apartments of a building), or to null to
 * ignore it on purpose.
 *
 * Listings that share the same space (data/linked-listings.json) are checked
 * against each other: a whole-house booking that overlaps a booking of one of
 * its parts is reported, with the whole-house booking taking priority.
 */
const fs = require('fs');
const path = require('path');
const { readSheet } = require('read-excel-file/node');
const { links, getRelatedIds } = require('../config/linkedListings');

const DATA_DIR      = path.join(__dirname, '..', 'data');
const NAMES_PATH    = path.join(DATA_DIR, 'reservations-names.json');
const LISTINGS_PATH = path.join(DATA_DIR, 'listings.json');
const OUT_PATH      = path.join(DATA_DIR, 'bookings.json');

const normalize = s =>
  String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();

const toISODate = value =>
  value instanceof Date && !isNaN(value) ? value.toISOString().slice(0, 10) : null;

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error('Usage: npm run import-reservations -- "path\\to\\reservas.xlsx"');
    process.exit(1);
  }

  const nameMap = new Map(
    Object.entries(JSON.parse(fs.readFileSync(NAMES_PATH, 'utf8'))).map(([name, id]) => [normalize(name), id])
  );
  const listingIds = Object.keys(JSON.parse(fs.readFileSync(LISTINGS_PATH, 'utf8')));

  const rows = await readSheet(file);

  const bookings = {};          // listing id -> [{ start, end }]
  const warnings = [];
  const unmapped = new Map();   // sheet name -> number of rows
  let duplicates = 0;

  rows.slice(1).forEach((row, i) => {
    const rowNumber = i + 2; // spreadsheet row (row 1 is the header)
    const [rawName, rawStart, rawEnd] = row;
    if (row.every(cell => cell === null || cell === '')) return;

    const start = toISODate(rawStart);
    const end   = toISODate(rawEnd);

    if (!rawName || !String(rawName).trim()) {
      warnings.push(`row ${rowNumber}: no property name (${start || '?'} -> ${end || '?'}) - skipped`);
      return;
    }

    const key = normalize(rawName);
    if (!nameMap.has(key)) {
      const label = String(rawName).trim();
      unmapped.set(label, (unmapped.get(label) || 0) + 1);
      return;
    }

    const target = nameMap.get(key);
    if (target === null) return; // ignored on purpose
    const targetIds = [].concat(target); // one id, or several for a booking covering more than one listing

    const unknownId = targetIds.find(id => !listingIds.includes(id));
    if (unknownId) {
      warnings.push(`row ${rowNumber}: "${rawName}" maps to "${unknownId}", which is not in data/listings.json - skipped`);
      return;
    }
    if (!start || !end) {
      warnings.push(`row ${rowNumber}: ${rawName} has a missing or invalid date (${start || '?'} -> ${end || '?'}) - skipped`);
      return;
    }
    if (end <= start) {
      warnings.push(`row ${rowNumber}: ${rawName} check-out ${end} is not after check-in ${start} - skipped`);
      return;
    }

    for (const id of targetIds) {
      const list = (bookings[id] = bookings[id] || []);
      if (list.some(r => r.start === start && r.end === end)) {
        duplicates++;
        continue;
      }
      list.push({ start, end });
    }
  });

  // Sort, and flag bookings that overlap within the same property
  const overlaps = [];
  for (const [id, list] of Object.entries(bookings)) {
    list.sort((a, b) => a.start.localeCompare(b.start) || a.end.localeCompare(b.end));
    let latest = list[0]; // the booking that runs furthest so far
    for (let i = 1; i < list.length; i++) {
      if (list[i].start < latest.end) {
        overlaps.push(`${id}: ${latest.start} -> ${latest.end}  overlaps  ${list[i].start} -> ${list[i].end}`);
      }
      if (list[i].end > latest.end) latest = list[i];
    }
  }

  // Whole-house bookings against the bookings of their parts. The whole-house
  // booking takes priority, so an overlapping part booking is the one to check.
  // Conflicts that are already over are only counted, not listed.
  const today = new Date().toISOString().slice(0, 10);
  const linkedConflicts = [];
  let pastLinkedConflicts = 0;
  for (const [whole, parts] of Object.entries(links)) {
    for (const part of parts) {
      for (const w of bookings[whole] || []) {
        for (const p of bookings[part] || []) {
          if (p.start < w.end && w.start < p.end) {
            if ((w.end < p.end ? w.end : p.end) < today) pastLinkedConflicts++;
            else linkedConflicts.push(`${whole} ${w.start} -> ${w.end}  overlaps  ${part} ${p.start} -> ${p.end}`);
          }
        }
      }
    }
  }

  // One range per line keeps the file readable and git diffs small
  const ids = Object.keys(bookings).sort();
  const body = ids
    .map(id => `    ${JSON.stringify(id)}: [\n${bookings[id].map(r => `      ${JSON.stringify(r)}`).join(',\n')}\n    ]`)
    .join(',\n');
  const output =
    `{\n  "source": ${JSON.stringify(path.basename(file))},\n  "importedAt": ${JSON.stringify(new Date().toISOString())},\n` +
    `  "bookings": {\n${body}\n  }\n}\n`;
  JSON.parse(output); // fail loudly rather than write a broken file
  fs.writeFileSync(OUT_PATH, output);

  const total = ids.reduce((sum, id) => sum + bookings[id].length, 0);
  console.log(`Imported ${total} bookings for ${ids.length} properties from ${path.basename(file)} -> data/bookings.json\n`);
  ids.forEach(id => console.log(`  ${id.padEnd(36)} ${bookings[id].length}`));

  if (duplicates) console.log(`\n${duplicates} identical duplicate row(s) ignored.`);

  if (unmapped.size) {
    console.log('\nNOT IMPORTED - no matching listing (add them to data/reservations-names.json):');
    unmapped.forEach((count, name) => console.log(`  "${name}" (${count} rows)`));
  }
  if (warnings.length) {
    console.log('\nWARNINGS:');
    warnings.forEach(w => console.log(`  ${w}`));
  }
  if (overlaps.length) {
    console.log('\nOVERLAPPING BOOKINGS (same property, check for double bookings or leftover duplicates):');
    overlaps.forEach(o => console.log(`  ${o}`));
  }

  if (linkedConflicts.length) {
    console.log('\nLINKED CONFLICTS (whole-house booking overlaps one of its parts; the whole-house booking takes priority, so check the part\'s booking):');
    linkedConflicts.forEach(c => console.log(`  ${c}`));
  }
  if (pastLinkedConflicts) {
    console.log(`\n${pastLinkedConflicts} whole-house/part overlap(s) in the past not listed (they don't affect the calendar).`);
  }

  // A listing counts as covered if it, or a listing sharing its space, has bookings
  const missing = listingIds.filter(id => ![id, ...getRelatedIds(id)].some(other => bookings[other]));
  if (missing.length) {
    console.log('\nListings with NO bookings in this sheet (their calendar will show every date as free):');
    console.log(`  ${missing.join(', ')}`);
  }
}

main().catch(err => {
  console.error('Import failed:', err.message);
  process.exit(1);
});
