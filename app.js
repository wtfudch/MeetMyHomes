require('dotenv').config(); // Add this at the top
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Enhanced MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000 // Fail after 5s instead of 30s
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit with failure
  }
};
connectDB();

// Database connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Enhanced CSP Headers
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
app.use('/properties', require('./routes/propertyRoutes'));

// Property Details Route
app.get('/property/:id', (req, res) => {
  const propertyId = req.params.id;
  res.render('property', { propertyId });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});