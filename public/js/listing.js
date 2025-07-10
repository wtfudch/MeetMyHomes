document.addEventListener('DOMContentLoaded', function() {
  // Modal elements
  const photoModal = document.getElementById('photo-modal');
  const modalMainImage = document.getElementById('modal-main-image');
  const currentImageCounter = document.getElementById('current-image');
  const totalImagesCounter = document.getElementById('total-images');
  const closeModal = document.querySelector('.close-modal');
  const prevBtn = document.querySelector('.modal-nav.prev');
  const nextBtn = document.querySelector('.modal-nav.next');
  const modalThumbs = document.querySelectorAll('.modal-thumb');
  
  let currentImageIndex = 0;
  const totalImages = modalThumbs.length;

  // Open modal with first image
  function openModal() {
    if (modalThumbs.length > 0) {
      updateModalImage(0);
    }
    photoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  // Update modal image display
  function updateModalImage(index) {
    currentImageIndex = index;
    modalMainImage.src = modalThumbs[index].src;
    modalMainImage.alt = modalThumbs[index].alt;
    currentImageCounter.textContent = index + 1;
    
    // Update active thumbnail
    modalThumbs.forEach((thumb, i) => {
      thumb.parentElement.classList.toggle('active', i === index);
    });
  }

  // See More button functionality
  const seeMoreBtn = document.getElementById('see-more-btn');
  if (seeMoreBtn) {
    seeMoreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  }

  // Thumbnail click handler
  modalThumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', function() {
      updateModalImage(index);
    });
  });

  // Previous button
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      const newIndex = (currentImageIndex - 1 + totalImages) % totalImages;
      updateModalImage(newIndex);
    });
  }

  // Next button
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      const newIndex = (currentImageIndex + 1) % totalImages;
      updateModalImage(newIndex);
    });
  }

  // Close modal
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      photoModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  // Close when clicking outside image
  photoModal.addEventListener('click', function(e) {
    if (e.target === photoModal) {
      photoModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (photoModal.style.display !== 'block') return;
    
    if (e.key === 'ArrowLeft') {
      const newIndex = (currentImageIndex - 1 + totalImages) % totalImages;
      updateModalImage(newIndex);
    } else if (e.key === 'ArrowRight') {
      const newIndex = (currentImageIndex + 1) % totalImages;
      updateModalImage(newIndex);
    } else if (e.key === 'Escape') {
      photoModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});

// Initialize Google Maps
loadGoogleMaps();


// Google Maps functionality
async function initMap() {
  try {
    const mapContainer = document.getElementById('property-map');
    if (!mapContainer) return;

    const lat = parseFloat(mapContainer.dataset.lat);
    const lng = parseFloat(mapContainer.dataset.lng);
    const title = mapContainer.dataset.title || 'Property Location';

    if (isNaN(lat) || isNaN(lng)) {
      console.error('Invalid coordinates');
      return;
    }

    // Hide loading message
    const loadingElement = mapContainer.querySelector('.map-loading');
    if (loadingElement) loadingElement.style.display = 'none';

    // Load required libraries
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // Create the map
    const propertyMap = new Map(mapContainer, {
      center: { lat, lng },
      zoom: 15,
      mapId: "DEMO_MAP_ID",
      disableDefaultUI: false,
      mapTypeControl: true
    });

    // Add marker
    new AdvancedMarkerElement({
      map: propertyMap,
      position: { lat, lng },
      title: title
    });

  } catch (error) {
    console.error('Error initializing map:', error);
    showMapFallback();
  }
}

function loadGoogleMaps() {
  if (window.google && window.google.maps) {
    initMap();
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyANA6a0rUnsATDz8ewvfuj_ZV6oTXmuxmc&loading=async&libraries=marker&callback=initMap';
  script.async = true;
  script.defer = true;
  script.onerror = function() {
    console.error('Failed to load Google Maps API');
    showMapFallback();
  };
  document.head.appendChild(script);
}

function showMapFallback() {
  const mapContainer = document.getElementById('property-map');
  if (mapContainer) {
    const lat = mapContainer.dataset.lat;
    const lng = mapContainer.dataset.lng;
    mapContainer.innerHTML = `
      <div style="padding: 20px; background: #f8f9fa; border-radius: 4px;">
        <p>Map could not be loaded. 
          <a href="https://maps.google.com/maps?q=${lat},${lng}" target="_blank">
            View on Google Maps
          </a>
        </p>
      </div>
    `;
  }
}

// Handle authentication failures
window.gm_authFailure = showMapFallback;