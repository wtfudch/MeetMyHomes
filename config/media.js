/**
 * config/media.js
 *
 * Generates media URLs for images, plants and videos.
 *
 * LOCAL DEV  → set CLOUDINARY_CLOUD_NAME= (empty) in .env
 *              Files must exist in public/images/, public/plants/, public/videos/
 *
 * PRODUCTION → set CLOUDINARY_CLOUD_NAME=yourcloudname in Render env vars
 *              Upload files to Cloudinary maintaining this folder structure:
 *
 *              meetmyhomes/images/{id}/{id}-1.jpg          (property photos)
 *              meetmyhomes/plants/{id}/{id}-1.jpg          (floor plans)
 *              meetmyhomes/videos/{id}/{id}-1.mp4          (videos)
 *              meetmyhomes/images/listings/{id}/{id}-1.jpg (rental photos)
 */

function getImageBase() {
  const n = process.env.CLOUDINARY_CLOUD_NAME;
  return n
    ? `https://res.cloudinary.com/${n}/image/upload/q_auto,f_auto/meetmyhomes`
    : '';
}

function getVideoBase() {
  const n = process.env.CLOUDINARY_CLOUD_NAME;
  return n
    ? `https://res.cloudinary.com/${n}/video/upload/meetmyhomes`
    : '';
}

/**
 * Build image, plant and video URL arrays for a property.
 * @param {string} id       - property slug, e.g. 'terreno-atouguia'
 * @param {object} media    - { imageCount, imageExt, plantCount, plantExt, videoCount }
 */
function buildPropertyMedia(id, media = {}) {
  const imgBase   = getImageBase();
  const videoBase = getVideoBase();
  const imgExt    = media.imageExt  || 'jpg';
  const plantExt  = media.plantExt  || 'jpg';

  const images = Array.from({ length: media.imageCount || 0 }, (_, i) =>
    `${imgBase}/images/${id}/${id}-${i + 1}.${imgExt}`
  );

  const plants = Array.from({ length: media.plantCount || 0 }, (_, i) =>
    `${imgBase}/plants/${id}/${id}-${i + 1}.${plantExt}`
  );

  const videos = Array.from({ length: media.videoCount || 0 }, (_, i) =>
    `${videoBase}/videos/${id}/${id}-${i + 1}.mp4`
  );

  return { images, plants, videos };
}

/**
 * Build image URL array for a rental listing.
 * @param {string} id       - listing slug, e.g. 'casa-neves'
 * @param {object} media    - { imageCount, imageExt }
 */
function buildListingMedia(id, media = {}) {
  const imgBase = getImageBase();
  const imgExt  = media.imageExt || 'jpg';

  const images = Array.from({ length: media.imageCount || 0 }, (_, i) =>
    `${imgBase}/images/listings/${id}/${id}-${i + 1}.${imgExt}`
  );

  return { images };
}

module.exports = { buildPropertyMedia, buildListingMedia };
