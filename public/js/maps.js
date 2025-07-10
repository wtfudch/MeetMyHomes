// maps.js - Dynamic Property Maps Implementation
let maps = new Map(); // Stores map instances by container ID
let markers = new Map(); // Stores marker instances by container ID

let propertyMap;

async function initMap() {
  try {
    const mapContainer = document.getElementById('property-map');
    if (!mapContainer) return;

    // Get coordinates from data attributes
    const lat = parseFloat(mapContainer.dataset.lat);
    const lng = parseFloat(mapContainer.dataset.lng);
    
    if (isNaN(lat) || isNaN(lng)) {
      console.error('Invalid coordinates');
      return showMapFallback();
    }

    // Hide loading message
    const loadingElement = mapContainer.querySelector('.map-loading');
    if (loadingElement) loadingElement.style.display = 'none';

    // Load libraries
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // Create map
    propertyMap = new Map(mapContainer, {
      center: { lat, lng },
      zoom: 15,
      mapId: "DEMO_MAP_ID",
      disableDefaultUI: false
    });

    // Add marker
    new AdvancedMarkerElement({
      map: propertyMap,
      position: { lat, lng },
      title: mapContainer.dataset.title || 'Property Location'
    });

  } catch (error) {
    console.error('Map error:', error);
    showMapFallback();
  }
}

function showMapFallback() {
  document.querySelectorAll('[data-lat][data-lng]').forEach(mapContainer => {
    const lat = mapContainer.dataset.lat;
    const lng = mapContainer.dataset.lng;
    const title = mapContainer.dataset.title || 'Property Location';

    mapContainer.innerHTML = `
      <div style="padding: 20px; background: #f8d7da; color: #721c24; border-radius: 4px;">
        <p>Map could not be loaded. 
          <a href="https://www.google.com/maps/place/${lat},${lng}" 
             target="_blank" 
             style="color: #721c24; text-decoration: underline;">
            View ${title} on Google Maps
          </a>
        </p>
      </div>
    `;
  });
}

// Modern Google Maps loading pattern
async function loadGoogleMaps() {
  try {
    // Check if already loaded
    if (window.google && window.google.maps) {
      initMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyANA6a0rUnsATDz8ewvfuj_ZV6oTXmuxmc&loading=async&libraries=marker&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      throw new Error('Failed to load Google Maps API');
    };
    
    document.head.appendChild(script);
  } catch (error) {
    console.error('Error loading Google Maps:', error);
    showMapFallback();
  }
}

// Error handler for authentication failures
window.gm_authFailure = function() {
  console.error('Google Maps authentication failed');
  showMapFallback();
};

// Initialize when DOM is ready
if (document.readyState === 'complete') {
  loadGoogleMaps();
} else {
  document.addEventListener('DOMContentLoaded', loadGoogleMaps);
}