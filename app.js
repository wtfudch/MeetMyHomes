// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path'); 

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

// Debug route to check public folder structure
app.get('/debug-public', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  
  const publicPath = path.join(__dirname, 'public');
  
  fs.readdir(publicPath, (err, items) => {
    if (err) {
      return res.send(`Error reading public directory: ${err.message}`);
    }
    
    const structure = items.map(item => {
      const itemPath = path.join(publicPath, item);
      const isDir = fs.statSync(itemPath).isDirectory();
      return {
        name: item,
        type: isDir ? 'directory' : 'file',
        path: `/${item}`
      };
    });
    
    res.json({ 
      message: 'Public directory contents',
      publicPath,
      items: structure
    });
  });
});
// Check file existence on server
app.get('/check-file-existence', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  
  const testFiles = [
    path.join(__dirname, 'public', 'images', 'terreno-capela', 'terreno-capela-1.jpg'),
    path.join(__dirname, 'public', 'images', 'terreno-atouguia', 'terreno-atouguia-1.jpg'),
    path.join(__dirname, 'public') // Check if public folder exists
  ];
  
  const results = testFiles.map(filePath => {
    try {
      const exists = fs.existsSync(filePath);
      const isDir = exists ? fs.statSync(filePath).isDirectory() : false;
      return {
        path: filePath,
        exists: exists,
        isDirectory: isDir,
        files: exists && isDir ? fs.readdirSync(filePath).slice(0, 5) : []
      };
    } catch (error) {
      return {
        path: filePath,
        error: error.message
      };
    }
  });
  
  res.json(results);
});
app.get('/debug-structure', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  
  const checkPath = (basePath, relativePath = '') => {
    const fullPath = path.join(basePath, relativePath);
    try {
      if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
          return {
            path: relativePath || '/',
            type: 'directory',
            exists: true,
            contents: fs.readdirSync(fullPath).slice(0, 10)
          };
        } else {
          return {
            path: relativePath,
            type: 'file',
            exists: true,
            size: stats.size
          };
        }
      } else {
        return {
          path: relativePath,
          exists: false
        };
      }
    } catch (error) {
      return {
        path: relativePath,
        error: error.message
      };
    }
  };
  
  const results = {
    root: checkPath(__dirname),
    public: checkPath(__dirname, 'public'),
    images: checkPath(__dirname, 'public/images'),
    terreno_capela: checkPath(__dirname, 'public/images/terreno-capela'),
    terreno_atouguia: checkPath(__dirname, 'public/images/terreno-atouguia')
  };
  
  res.json(results);
});
app.get('/debug-images/:property', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  const propertyId = req.params.property;
  
  const imageDir = path.join(__dirname, 'public', 'images', propertyId);
  
  if (!fs.existsSync(imageDir)) {
    return res.json({
      error: `Directory not found: ${imageDir}`,
      exists: false
    });
  }
  
  const files = fs.readdirSync(imageDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );
  
  res.json({
    property: propertyId,
    directory: imageDir,
    totalFiles: files.length,
    imageFiles: imageFiles,
    exists: true
  });
});

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Set Content Security Policy (CSP) headers
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "script-src 'self' https://maps.googleapis.com https://maps.gstatic.com 'unsafe-inline' https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com https://cdnjs.cloudflare.com;" +
    "img-src 'self' https://*.googleapis.com https://*.gstatic.com https://www.google.com data: blob:; " + // ← ADDED blob:
    "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; " + 
    "connect-src 'self' https://maps.googleapis.com https://translate.googleapis.com https://translate-pa.googleapis.com; " +
    "media-src 'self' blob:; " + // ← ADDED blob:
    "frame-src 'self' https://www.google.com http://localhost:3000 https://meetmyhomes.com;" // ← ADDED your domain
  );
  next();
});
// Middleware to set language on res.locals
app.use((req, res, next) => {
  res.locals.getCurrentLanguage = function() {
    const urlParams = new URLSearchParams(req.query);
    let lang = urlParams.get('hl') || req.session?.selectedLanguage || 'en';
    if (['pt-PT', 'pt', 'es', 'fr', 'de', 'it', 'nl', 'sv', 'da', 'no', 'fi', 'pl', 'ru', 'zh-CN', 'ja', 'ko', 'ar', 'hi', 'tr', 'el'].indexOf(lang) === -1) {
      lang = 'en'; // Explicitly set English as default
    }
    if (req.session) req.session.selectedLanguage = lang;
    return lang;
  };
  next();
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