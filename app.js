// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/realestate')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static files with custom MIME type for .mov
app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.mov')) {
      res.set('Content-Type', 'video/quicktime');
    }
  }
}));
// Serve static files
app.use(express.static('public'));
app.use('/fonts', express.static('node_modules/@fortawesome/fontawesome-free/webfonts'));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Set Content Security Policy (CSP) headers
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "script-src 'self' https://maps.googleapis.com https://maps.gstatic.com 'unsafe-inline' https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com https://cdnjs.cloudflare.com;" +
    "img-src 'self' https://*.googleapis.com https://*.gstatic.com https://www.google.com data:; " + 
    "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; " + 
    "connect-src 'self' https://maps.googleapis.com https://translate.googleapis.com https://translate-pa.googleapis.com; " +
    "media-src 'self'; " +
    "frame-src https://www.google.com http://localhost:3000;"
  );
  next();
});

// Middleware to set language on res.locals
app.use((req, res, next) => {
  res.locals.getCurrentLanguage = function() {
    const urlParams = new URLSearchParams(req.query);
    let lang = urlParams.get('hl') || req.session?.selectedLanguage || 'en';
    console.log('Detected language:', lang); // Debug log
    if (['pt-PT', 'pt', 'es', 'fr', 'de', 'it', 'nl', 'sv', 'da', 'no', 'fi', 'pl', 'ru', 'zh-CN', 'ja', 'ko', 'ar', 'hi', 'tr', 'el'].indexOf(lang) === -1) {
      lang = 'en'; // Explicitly set English as default
    }
    if (req.session) req.session.selectedLanguage = lang;
    return lang;
  };
  next();
});

app.get('/debug-images', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  
  const imagePath = path.join(__dirname, 'public', 'images');
  
  fs.readdir(imagePath, (err, files) => {
    if (err) {
      return res.send(`Error reading images directory: ${err.message}`);
    }
    res.json({ 
      message: 'Images in directory',
      files: files,
      absolutePath: imagePath
    });
  });
});

// Routes
app.use('/', require('./routes/homeRoutes'));
app.use('/contact', require('./routes/contactRoutes'));
app.use('/listings', require('./routes/listingsRoutes'));
app.use('/about', require('./routes/aboutRoutes'));
app.use('/privacy-policy', require('./routes/privacyRoutes'));
app.use('/terms-of-service', require('./routes/termsRoutes'));
app.use('/properties', require('./routes/propertyRoutes'));

// Property Details Route
app.get('/property/:id', (req, res) => {
    const propertyId = req.params.id;
    res.render('property', { propertyId });
});

app.set('view cache', false);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});