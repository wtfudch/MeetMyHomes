// maps.js - Modern Google Maps Implementation with Advanced Markers
let map;
let marker;

async function initMap() {
  try {
    // Show loading state
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      throw new Error('Map container not found');
    }

    // Check if Google Maps API is loaded
    if (!window.google || !window.google.maps) {
      throw new Error('Google Maps API not loaded');
    }

    // Load the Advanced Markers library
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // Coordinates for Casa Neves
    const casaNeves = { 
      lat: 32.71398162841797, 
      lng: -17.147111892700195 
    };

    // Create the map instance
    map = new Map(mapContainer, {
      zoom: 15,
      center: casaNeves,
      mapId: 'YOUR_MAP_ID', // Optional: Create in Google Cloud Console
      disableDefaultUI: false,
      mapTypeControl: true,
      styles: [
        {
          featureType: 'poi',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    // Create Advanced Marker
    marker = new AdvancedMarkerElement({
      map,
      position: casaNeves,
      title: "Casa Neves"
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 10px; max-width: 200px;">
          <h3 style="margin: 0 0 5px 0; font-size: 16px;">Casa Neves</h3>
          <p style="margin: 0; font-size: 14px;">Beautiful property in Funchal</p>
        </div>
      `
    });
    
    marker.addListener('click', () => {
      infoWindow.open({
        anchor: marker,
        map
      });
    });

    // Hide loading state
    if (document.getElementById('map-loading')) {
      document.getElementById('map-loading').style.display = 'none';
    }

  } catch (error) {
    console.error('Google Maps initialization failed:', error);
    showMapFallback();
  }
}

function showMapFallback() {
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;
  
  mapContainer.innerHTML = `
    <div style="padding: 20px; background: #f8d7da; color: #721c24; border-radius: 4px;">
      <p>Map could not be loaded. 
        <a href="https://www.google.com/maps/place/32.71394729614258,-17.147069931030273" 
           target="_blank" 
           style="color: #721c24; text-decoration: underline;">
          View on Google Maps
        </a>
      </p>
    </div>
  `;
}

// Modern Google Maps loading pattern
async function loadGoogleMaps() {
  try {
    // Create script element
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

// Initialize
if (document.readyState === 'complete') {
  loadGoogleMaps();
} else {
  document.addEventListener('DOMContentLoaded', loadGoogleMaps);
}