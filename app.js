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

// Serve static files
app.use(express.static('public'));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Set Content Security Policy (CSP) headers
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' https://maps.googleapis.com https://maps.gstatic.com 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' https://*.googleapis.com https://*.gstatic.com data:; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://maps.googleapis.com; " +
    "frame-src https://www.google.com;"
  );
  next();
});


// Routes
app.use('/', require('./routes/homeRoutes'));
app.use('/contact', require('./routes/contactRoutes'));
app.use('/listings', require('./routes/listingsRoutes'));
app.use('/about', require('./routes/aboutRoutes'));
app.use('/', require('./routes/casaNevesRoutes')); 
app.use('/', require('./routes/arcoApartmentRoutes')); 

app.use('/properties', require('./routes/propertyRoutes')); // Changed to plural for RESTful convention

// Property Details Route
app.get('/property/:id', (req, res) => {
    const propertyId = req.params.id;
    // For now, just render a placeholder property page
    res.render('property', { propertyId });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});