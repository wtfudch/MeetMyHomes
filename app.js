// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const fs = require('fs');

// MongoDB connection - Remove or comment out for production if not using MongoDB
/*
mongoose.connect('mongodb://localhost:27017/realestate')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));
*/

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static files
app.use(express.static('public', {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.mov')) {
      res.set('Content-Type', 'video/quicktime');
    }
  }
}));

app.use('/fonts', express.static('node_modules/@fortawesome/fontawesome-free/webfonts'));

// ===== COMPREHENSIVE DEBUG ROUTES =====

// 1. Check if public directory exists and its contents
app.get('/debug-public', (req, res) => {
  const publicPath = path.join(__dirname, 'public');
  
  if (!fs.existsSync(publicPath)) {
    return res.json({ error: 'Public directory does not exist', path: publicPath });
  }
  
  const items = fs.readdirSync(publicPath);
  const structure = items.map(item => {
    const itemPath = path.join(publicPath, item);
    const stats = fs.statSync(itemPath);
    return {
      name: item,
      type: stats.isDirectory() ? 'directory' : 'file',
      path: itemPath,
      size: stats.isDirectory() ? null : stats.size + ' bytes',
      modified: stats.mtime
    };
  });
  
  res.json({ 
    message: 'Public directory contents',
    publicPath: publicPath,
    exists: true,
    items: structure
  });
});

// 2. Check specific image files
app.get('/debug-images', (req, res) => {
  const testImages = [
    'terreno-faja-ovelha/terreno-faja-ovelha-1.jpg',
    'terreno-capela/terreno-capela-1.jpg',
    'terreno-atouguia/terreno-atouguia-1.jpg',
    'casa-laranjeiras/casa-laranjeiras-1.jpg',
    'fallback.jpg'
  ];
  
  const results = testImages.map(imagePath => {
    const fullPath = path.join(__dirname, 'public', 'images', imagePath);
    const exists = fs.existsSync(fullPath);
    
    return {
      image: imagePath,
      exists: exists,
      fullPath: fullPath,
      url: `/images/${imagePath}`,
      size: exists ? fs.statSync(fullPath).size + ' bytes' : 'N/A',
      accessible: exists ? fs.accessSync(fullPath, fs.constants.R_OK) === undefined : false
    };
  });
  
  res.json({
    message: 'Image file check',
    imagesPath: path.join(__dirname, 'public', 'images'),
    imagesPathExists: fs.existsSync(path.join(__dirname, 'public', 'images')),
    results: results
  });
});

// 3. List all images in a specific property folder
app.get('/debug-property-images/:propertyId', (req, res) => {
  const propertyId = req.params.propertyId;
  const propertyPath = path.join(__dirname, 'public', 'images', propertyId);
  
  if (!fs.existsSync(propertyPath)) {
    return res.json({
      error: `Property folder not found: ${propertyId}`,
      path: propertyPath,
      exists: false
    });
  }
  
  const files = fs.readdirSync(propertyPath);
  const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
  
  res.json({
    property: propertyId,
    path: propertyPath,
    exists: true,
    totalFiles: files.length,
    imageFiles: imageFiles.map(file => ({
      name: file,
      path: `/images/${propertyId}/${file}`,
      size: fs.statSync(path.join(propertyPath, file)).size + ' bytes',
      url: `https://${req.get('host')}/images/${propertyId}/${file}`
    }))
  });
});

// 4. Test image serving directly
app.get('/test-image-serving', (req, res) => {
  const testImages = [
    { path: 'terreno-faja-ovelha/terreno-faja-ovelha-1.jpg', alt: 'Test Image 1' },
    { path: 'terreno-capela/terreno-capela-1.jpg', alt: 'Test Image 2' },
    { path: 'fallback.jpg', alt: 'Fallback Image' }
  ];
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Image Serving Test</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .image-test { margin: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .success { border-color: green; background: #f0fff0; }
        .error { border-color: red; background: #fff0f0; }
        img { max-width: 200px; border: 2px solid #ccc; margin: 10px 0; }
      </style>
    </head>
    <body>
      <h1>Image Serving Test</h1>
      <p>Testing if images are being served correctly from: ${path.join(__dirname, 'public', 'images')}</p>
      
      ${testImages.map((test, index) => `
        <div class="image-test" id="test-${index}">
          <h3>Test ${index + 1}: ${test.path}</h3>
          <img src="/images/${test.path}" alt="${test.alt}" 
               onerror="document.getElementById('test-${index}').className += ' error';"
               onload="document.getElementById('test-${index}').className += ' success';">
          <p>URL: <code>/images/${test.path}</code></p>
          <p>Status: <span id="status-${index}">Loading...</span></p>
        </div>
      `).join('')}
      
      <script>
        // Add event listeners to update status
        document.querySelectorAll('img').forEach((img, index) => {
          img.addEventListener('error', () => {
            document.getElementById('status-' + index).textContent = '❌ Error loading image';
          });
          img.addEventListener('load', () => {
            document.getElementById('status-' + index).textContent = '✅ Image loaded successfully';
          });
        });
      </script>
    </body>
    </html>
  `;
  
  res.send(html);
});

// 5. Check file permissions and ownership
app.get('/debug-permissions', (req, res) => {
  const checkPaths = [
    path.join(__dirname, 'public'),
    path.join(__dirname, 'public', 'images'),
    path.join(__dirname, 'public', 'images', 'terreno-faja-ovelha'),
    path.join(__dirname, 'public', 'images', 'terreno-faja-ovelha', 'terreno-faja-ovelha-1.jpg')
  ];
  
  const results = checkPaths.map(checkPath => {
    try {
      if (fs.existsSync(checkPath)) {
        const stats = fs.statSync(checkPath);
        return {
          path: checkPath,
          exists: true,
          isDirectory: stats.isDirectory(),
          permissions: {
            readable: true, // Assume readable if we can stat it
            size: stats.isDirectory() ? null : stats.size + ' bytes'
          },
          uid: stats.uid,
          gid: stats.gid,
          mode: stats.mode.toString(8)
        };
      } else {
        return {
          path: checkPath,
          exists: false,
          error: 'Path does not exist'
        };
      }
    } catch (error) {
      return {
        path: checkPath,
        error: error.message,
        exists: false
      };
    }
  });
  
  res.json(results);
});

// ===== END DEBUG ROUTES =====

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Set Content Security Policy (CSP) headers
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "script-src 'self' https://maps.googleapis.com https://maps.gstatic.com 'unsafe-inline' https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com https://cdnjs.cloudflare.com;" +
    "img-src 'self' https://*.googleapis.com https://*.gstatic.com https://www.google.com data: blob:; " +
    "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; " + 
    "connect-src 'self' https://maps.googleapis.com https://translate.googleapis.com https://translate-pa.googleapis.com; " +
    "media-src 'self' blob:; " +
    "frame-src 'self' https://www.google.com http://localhost:3000 https://meetmyhomes.com;"
  );
  next();
});

// Middleware to set language on res.locals
app.use((req, res, next) => {
  res.locals.getCurrentLanguage = function() {
    const urlParams = new URLSearchParams(req.query);
    let lang = urlParams.get('hl') || req.session?.selectedLanguage || 'en';
    if (['pt-PT', 'pt', 'es', 'fr', 'de', 'it', 'nl', 'sv', 'da', 'no', 'fi', 'pl', 'ru', 'zh-CN', 'ja', 'ko', 'ar', 'hi', 'tr', 'el'].indexOf(lang) === -1) {
      lang = 'en';
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
const PORT = process.env.PORT || 10000; // Changed to 10000 to match your Render logs
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});