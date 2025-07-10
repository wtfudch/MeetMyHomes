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
    "default-src 'self'; " +
    "script-src 'self' https://maps.googleapis.com https://maps.gstatic.com 'unsafe-inline' https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com https://cdnjs.cloudflare.com;" +
    "img-src 'self' https://*.googleapis.com https://*.gstatic.com https://www.google.com data:; " + 
    "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; " + // Added https://cdnjs.cloudflare.com
    "connect-src 'self' https://maps.googleapis.com https://translate.googleapis.com https://translate-pa.googleapis.com; " +
    "media-src 'self'; " +
    "frame-src https://www.google.com http://localhost:3000;" // For local development
  );
  next();
});


// Routes
app.use('/', require('./routes/homeRoutes'));
app.use('/contact', require('./routes/contactRoutes'));
app.use('/listings', require('./routes/listingsRoutes'));
app.use('/about', require('./routes/aboutRoutes'));


app.use('/properties', require('./routes/propertyRoutes')); // Changed to plural for RESTful convention

// Property Details Route
app.get('/property/:id', (req, res) => {
    const propertyId = req.params.id;
    // For now, just render a placeholder property page
    res.render('property', { propertyId });
});
app.set('view cache', false);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
