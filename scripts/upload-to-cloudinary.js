/**
 * scripts/upload-to-cloudinary.js
 *
 * One-off migration helper: uploads your existing local photos/videos to
 * Cloudinary, using the exact public_id structure that config/media.js
 * expects at runtime. Safe to re-run (uses overwrite: true).
 *
 * SETUP
 * 1. npm install        (installs the cloudinary SDK, listed as a devDependency)
 * 2. Fill in CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env
 *    (find them in Cloudinary Dashboard → API Keys)
 * 3. Create a folder called `media-to-upload` next to this project, with the
 *    SAME layout your old project used:
 *
 *      media-to-upload/
 *        images/<property-or-listing-id>/<id>-1.jpg, <id>-2.jpg, ...
 *        plants/<property-id>/<id>-1.jpg, ...
 *        videos/<property-id>/<id>-1.mov (or .mp4), ...
 *
 *    Property and listing ids must match the "id" fields in
 *    data/properties.json and data/listings.json. Listings use the
 *    `images/<id>/` folder same as properties — the script automatically
 *    routes listing photos to Cloudinary's images/listings/<id>/ folder.
 *
 * 4. Run:  node scripts/upload-to-cloudinary.js
 *
 *    Or only some listings/properties (much faster than re-sending everything):
 *      node scripts/upload-to-cloudinary.js bella-vista-home adif-sea-view-canhas
 *
 *    Add --dry-run to see what WOULD be uploaded without sending anything:
 *      node scripts/upload-to-cloudinary.js --dry-run
 *      node scripts/upload-to-cloudinary.js --dry-run bella-vista-home
 *
 * The script prints a summary at the end comparing how many files it found
 * locally vs. how many data/*.json expects — fix any mismatches before
 * trusting the live site.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

const properties = require('../data/properties.json');
const listings = require('../data/listings.json');

const SOURCE_ROOT = path.join(__dirname, '..', '..', 'media-to-upload');

// Optional command-line arguments: --dry-run, and/or the ids to upload
// (no ids = everything).
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const onlyIds = args.filter(a => !a.startsWith('--'));
const wanted = id => onlyIds.length === 0 || onlyIds.includes(id);

const unknownIds = onlyIds.filter(id => !(id in properties) && !(id in listings));
if (unknownIds.length) {
  console.error(`❌ Unknown id(s): ${unknownIds.join(', ')}. They must match an "id" in data/properties.json or data/listings.json.`);
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('❌ Missing Cloudinary credentials. Fill in .env first (see .env.example).');
  process.exit(1);
}

if (!fs.existsSync(SOURCE_ROOT)) {
  console.error(`❌ Source folder not found: ${SOURCE_ROOT}`);
  console.error('   Create a "media-to-upload" folder next to the project root with images/, plants/, videos/ subfolders.');
  process.exit(1);
}

// Natural sort so file-2 comes before file-10
const naturalSort = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => !f.startsWith('.')).sort(naturalSort);
}

const VIDEO_EXTENSIONS = new Set(['.mov', '.mp4', '.avi', '.mkv', '.webm']);

async function uploadFile(localPath, publicId, resourceType) {
  if (dryRun) return; // nothing is sent in a dry run
  await cloudinary.uploader.upload(localPath, {
    public_id: publicId,
    resource_type: resourceType,
    overwrite: true,
    invalidate: true,
  });
}

async function uploadFolder(localDir, cloudinaryFolder, resourceType) {
  const files = listFiles(localDir);
  for (const file of files) {
    const ext = path.extname(file);
    const baseName = path.basename(file, ext);
    const publicId = `${cloudinaryFolder}/${baseName}`;
    const fullPath = path.join(localDir, file);
    process.stdout.write(`  ⬆ ${file} → ${publicId} ... `);
    try {
      await uploadFile(fullPath, publicId, resourceType);
      console.log(dryRun ? 'dry run' : 'OK');
    } catch (err) {
      console.log('FAILED');
      console.error(`     ${err.message}`);
    }
  }
  return files.length;
}

async function run() {
  const report = [];

  if (dryRun) console.log('\n🔍 DRY RUN — nothing will be sent to Cloudinary.');

  console.log('\n📦 Uploading PROPERTY media (for sale)\n');
  for (const [id, prop] of Object.entries(properties)) {
    if (!wanted(id)) continue;
    console.log(`→ ${id}`);

    const imgDir = path.join(SOURCE_ROOT, 'images', id);
    const foundImages = await uploadFolder(imgDir, `meetmyhomes/images/${id}`, 'image');

    const plantDir = path.join(SOURCE_ROOT, 'plants', id);
    const foundPlants = await uploadFolder(plantDir, `meetmyhomes/plants/${id}`, 'image');

    const videoDir = path.join(SOURCE_ROOT, 'videos', id);
    const videoFiles = listFiles(videoDir);
    let foundVideos = 0;
    for (const file of videoFiles) {
      const ext = path.extname(file).toLowerCase();
      if (!VIDEO_EXTENSIONS.has(ext)) continue;
      const baseName = path.basename(file, ext);
      const publicId = `meetmyhomes/videos/${id}/${baseName}`;
      process.stdout.write(`  ⬆ ${file} → ${publicId} ... `);
      try {
        await uploadFile(path.join(videoDir, file), publicId, 'video');
        console.log(dryRun ? 'dry run' : 'OK');
        foundVideos++;
      } catch (err) {
        console.log('FAILED');
        console.error(`     ${err.message}`);
      }
    }

    report.push({
      id,
      type: 'property',
      images: { expected: prop.media.imageCount, found: foundImages },
      plants: { expected: prop.media.plantCount, found: foundPlants },
      videos: { expected: prop.media.videoCount, found: foundVideos },
    });
  }

  console.log('\n🏠 Uploading LISTING media (rentals)\n');
  for (const [id, listing] of Object.entries(listings)) {
    if (!wanted(id)) continue;
    console.log(`→ ${id}`);
    const imgDir = path.join(SOURCE_ROOT, 'images', id);
    const foundImages = await uploadFolder(imgDir, `meetmyhomes/images/listings/${id}`, 'image');

    report.push({
      id,
      type: 'listing',
      images: { expected: listing.media.imageCount, found: foundImages },
    });
  }

  // ── Summary ────────────────────────────────────────────────────────────
  console.log('\n📊 SUMMARY — expected (from data/*.json) vs. found locally\n');
  let hasMismatch = false;
  for (const r of report) {
    const parts = [];
    for (const key of ['images', 'plants', 'videos']) {
      if (!r[key]) continue;
      const { expected, found } = r[key];
      const ok = expected === found;
      if (!ok) hasMismatch = true;
      parts.push(`${key}: ${found}/${expected}${ok ? '' : ' ⚠️'}`);
    }
    console.log(`${r.type === 'property' ? '🏠' : '🛏 '} ${r.id.padEnd(22)} ${parts.join('  ')}`);
  }

  if (hasMismatch) {
    console.log('\n⚠️  Some counts don\'t match. Either:');
    console.log('   - update the "media" counts in data/properties.json / data/listings.json, or');
    console.log('   - check media-to-upload/ for missing/extra files.');
  } else {
    console.log('\n✅ Everything matches. Set CLOUDINARY_CLOUD_NAME in Render and deploy!');
  }

  if (dryRun) console.log('\n🔍 That was a dry run — nothing was uploaded. Run again without --dry-run to upload.');
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
