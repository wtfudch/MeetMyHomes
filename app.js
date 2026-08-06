require('dotenv').config();
const express = require('express');
const path    = require('path');
const app     = express();

// ── View engine ────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', process.env.NODE_ENV === 'production');

// ── Static files ───────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));
app.use('/fonts', express.static(
  path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts')
));

// ── Body parsing ───────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ── Security headers (CSP) ─────────────────────────────────────────────────
app.use((req, res, next) => {
  const cloudinaryImgSrc = process.env.CLOUDINARY_CLOUD_NAME
    ? `https://res.cloudinary.com`
    : '';

  res.setHeader('Content-Security-Policy', [
    `default-src 'self' 'unsafe-inline' 'unsafe-eval'`,
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.gstatic.com https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com https://cdnjs.cloudflare.com`,
    `img-src 'self' data: blob: https://*.googleapis.com https://*.gstatic.com https://www.google.com ${cloudinaryImgSrc}`,
    `font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com`,
    `connect-src 'self' https://maps.googleapis.com https://translate.googleapis.com https://translate-pa.googleapis.com`,
    `media-src 'self' blob: ${cloudinaryImgSrc}`,
    `frame-src 'self' https://www.google.com`,
  ].join('; '));
  next();
});

// ── Global locals (available in all EJS views) ─────────────────────────────
app.use((req, res, next) => {
  // Language helper
  res.locals.getCurrentLanguage = () => {
    const supported = ['pt-PT','pt','es','fr','de','it','nl','sv','da','no','fi','pl','ru','zh-CN','ja','ko','ar','hi','tr','el'];
    const lang = req.query.hl || 'en';
    return supported.includes(lang) ? lang : 'en';
  };

  // Google Maps API key exposed to views
  res.locals.googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY || '';

  next();
});

// ── Routes ─────────────────────────────────────────────────────────────────
app.use('/',               require('./routes/homeRoutes'));
app.use('/properties',     require('./routes/propertyRoutes'));
app.use('/listings',       require('./routes/listingsRoutes'));
app.use('/contact',        require('./routes/contactRoutes'));
app.use('/about',          require('./routes/aboutRoutes'));
app.use('/privacy-policy', require('./routes/privacyRoutes'));
app.use('/terms-of-service', require('./routes/termsRoutes'));

// ── 404 ────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('404', { title: 'Página não encontrada' });
});

// ── Start ──────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
