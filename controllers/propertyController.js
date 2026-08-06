const propertiesData     = require('../data/properties.json');
const { buildPropertyMedia } = require('../config/media');

// Enrich each property with generated media URLs once at startup
const properties = Object.fromEntries(
  Object.entries(propertiesData).map(([key, prop]) => {
    const { images, plants, videos } = buildPropertyMedia(prop.id, prop.media);
    return [key, { ...prop, images, plants, videos }];
  })
);

// ── GET /properties ─────────────────────────────────────────────────────────
const getAllProperties = (req, res) => {
  const lang = res.locals.getCurrentLanguage();

  const list = Object.values(properties).map(prop => ({
    ...prop,
    description: prop.description[lang] || prop.description['en'],
    // build energy feature if needed
    detailedFeatures: buildEnergyFeatures(prop),
  }));

  res.render('properties', { title: 'Properties for Sale', properties: list });
};

// ── GET /properties/:id ─────────────────────────────────────────────────────
const getPropertyById = (req, res) => {
  const property = properties[req.params.id];
  if (!property) return res.status(404).render('404', { title: 'Property not found' });

  const lang = res.locals.getCurrentLanguage();

  const translated = {
    ...property,
    description: property.description[lang] || property.description['en'],
    detailedFeatures: buildEnergyFeatures(property),
  };

  res.render('property', { title: translated.title, property: translated });
};

// ── Helper ──────────────────────────────────────────────────────────────────
function buildEnergyFeatures(prop) {
  const features = { ...prop.detailedFeatures };
  if (prop.energyRating) {
    features.energy = features.energy || [];
    const entry = `Class ${prop.energyRating}`;
    if (!features.energy.includes(entry)) features.energy.push(entry);
  }
  return features;
}

module.exports = { getAllProperties, getPropertyById, properties };
