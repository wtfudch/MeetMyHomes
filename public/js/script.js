document.addEventListener('DOMContentLoaded', async () => {
  // Redirect buttons
  document.getElementById('view-details-button-casa-neves').addEventListener('click', () => {
    window.location.href = '/casaNeves';
  });
  
  document.getElementById('view-details-button-arco-apartment').addEventListener('click', () => {
    window.location.href = '/arcoApartment';
  });

  // Load images with error handling
  try {
    await setupPropertyCarousel('casa-neves');
    await setupPropertyCarousel('arco-apartment');
  } catch (error) {
    console.error('Error initializing property carousels:', error);
  }
});

async function getPropertyImages(prefix) {
  try {
    const folder = prefix === 'casa-neves' ? 'casaNeves' : 'arcoApartment';
    const response = await fetch(`/images/${folder}/${folder}Images.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch images for ${prefix}`);
    }
    
    const data = await response.json();
    return data.images.map(img => `/images/${folder}/${img}`);
  } catch (error) {
    console.error(`Error loading images for ${prefix}:`, error);
    return [];
  }
}

async function setupPropertyCarousel(prefix) {
  const images = await getPropertyImages(prefix);
  if (images.length === 0) {
    console.warn(`No images found for ${prefix}`);
    return;
  }

  const imageElement = document.getElementById(`${prefix}-image`);
  const prevBtn = document.getElementById(`${prefix}-prev`);
  const nextBtn = document.getElementById(`${prefix}-next`);
  const counter = document.getElementById(`${prefix}-counter`);

  // Set fallback image if loading fails
  imageElement.onerror = function() {
    this.src = '/images/default-property.jpg';
    console.warn(`Failed to load image: ${this.src}`);
  };

  let currentIndex = 0;

  function updateImage() {
    imageElement.src = images[currentIndex];
    if (counter) {
      counter.textContent = `${currentIndex + 1}/${images.length}`;
    }
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateImage();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateImage();
    });
  }

  // Initialize with first image
  updateImage();
}