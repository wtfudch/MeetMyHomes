// propertymaps.js

async function initPropertyMap(containerId, loadingDivId) {
  const mapContainer = document.getElementById(containerId);
  const loadingDiv = document.getElementById(loadingDivId);

  if (!mapContainer || mapContainer.classList.contains('map-initialized')) {
    if (loadingDiv) loadingDiv.style.display = 'none'; // Ensure spinner is hidden if already initialized
    return;
  }

  try {
    if (loadingDiv) {
      loadingDiv.style.display = 'flex'; // Show loading message
    }

    // Ensure google.maps and importLibrary are available here
    if (typeof google === 'undefined' || typeof google.maps === 'undefined' || typeof google.maps.importLibrary !== 'function') {
        throw new Error('Google Maps API not fully loaded or importLibrary not available.');
    }

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const lat = parseFloat(mapContainer.dataset.lat);
    const lng = parseFloat(mapContainer.dataset.lng);
    const title = mapContainer.dataset.title || 'Property Location';

    if (isNaN(lat) || isNaN(lng)) {
        throw new Error("Invalid latitude or longitude coordinates.");
    }

    const coords = { lat, lng };

    const map = new Map(mapContainer, {
      center: coords,
      zoom: 15,
      mapId: 'e5cce81db978f045	', // <--- REPLACE THIS WITH YOUR ACTUAL MAP ID!
      disableDefaultUI: true
    });

    new AdvancedMarkerElement({
      map,
      position: coords,
      title: title
    });

    if (loadingDiv) {
      loadingDiv.style.display = 'none'; // Hide loading message
    }
    mapContainer.classList.add('map-initialized');

  } catch (error) {
    console.error(`Map initialization failed for '${containerId}':`, error);
    if (loadingDiv) {
        loadingDiv.style.display = 'none'; // Hide loading message on error
    }
    const fallbackLink = `https://maps.google.com/maps?q=${mapContainer.dataset.lat},${mapContainer.dataset.lng}`;
    if (mapContainer) {
      mapContainer.innerHTML = `
        <div class="map-fallback">
          <p>Não foi possível carregar o mapa.</p>
          <a href="${fallbackLink}" target="_blank">
            Ver no Google Maps
          </a>
        </div>`;
    }
  }
}