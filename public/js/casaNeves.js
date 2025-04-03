// Fetch images from the server
async function fetchImages() {
    try {
      const response = await fetch('/images/casaNeves/casaNevesImages.json');
      const data = await response.json();
      return data.images.map(image => `/images/casaNeves/${image}`);
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  }
  
  // Load images into the carousel
  async function loadImages() {
    const images = await fetchImages();
    const mainImage = document.getElementById('main-image');
    const thumbnailsContainer = document.getElementById('thumbnails');
  
    if (images.length > 0) {
      mainImage.src = images[0]; // Set the first image as the main image
  
      // Add thumbnails
      images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image;
        thumbnail.alt = `Thumbnail ${index + 1}`;
        thumbnail.addEventListener('click', () => {
          mainImage.src = image;
        });
        thumbnailsContainer.appendChild(thumbnail);
      });
    }
  }
  
  // "More Pictures" button functionality
  document.getElementById('more-pictures').addEventListener('click', () => {
    const thumbnailsContainer = document.getElementById('thumbnails');
    thumbnailsContainer.scrollBy({ left: 200, behavior: 'smooth' });
  });
  
  // Load images on page load
  loadImages();