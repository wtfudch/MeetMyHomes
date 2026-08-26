// listingsMap.js — overview map on /listings with one pin per rental listing.
// Loaded via the Google Maps script's callback, same pattern as the
// single-property map in listing.js/propertymaps.js.

function escapeMapHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

function showListingsMapFallback() {
  const mapContainer = document.getElementById('listings-map');
  if (!mapContainer) return;
  mapContainer.innerHTML = `
    <div class="map-fallback">
      <p>Map could not be loaded.
        <a href="https://www.google.com/maps/search/?api=1&query=Madeira+Portugal" target="_blank">View on Google Maps</a>
      </p>
    </div>`;
}

async function initListingsMap() {
  const mapContainer = document.getElementById('listings-map');
  if (!mapContainer) return;

  let listingsData = [];
  try {
    listingsData = JSON.parse(mapContainer.dataset.listings || '[]');
  } catch (err) {
    listingsData = [];
  }

  if (listingsData.length === 0) {
    mapContainer.innerHTML = '<div class="map-loading">No locations to show yet.</div>';
    return;
  }

  try {
    if (typeof google === 'undefined' || typeof google.maps === 'undefined' || typeof google.maps.importLibrary !== 'function') {
      throw new Error('Google Maps API not loaded');
    }

    const { Map, InfoWindow } = await google.maps.importLibrary('maps');
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

    const bounds = new google.maps.LatLngBounds();
    listingsData.forEach(l => bounds.extend({ lat: l.lat, lng: l.lng }));

    const map = new Map(mapContainer, {
      mapId: 'DEMO_MAP_ID',
      center: bounds.getCenter(),
      zoom: 11,
      disableDefaultUI: false,
      mapTypeControl: false,
    });

    if (listingsData.length > 1) {
      map.fitBounds(bounds, 40);
    } else {
      map.setZoom(13);
    }

    const infoWindow = new InfoWindow();

    listingsData.forEach(l => {
      const marker = new AdvancedMarkerElement({
        map,
        position: { lat: l.lat, lng: l.lng },
        title: l.title,
      });

      marker.addListener('click', () => {
        infoWindow.setContent(`
          <div class="map-info-window">
            <h3>${escapeMapHtml(l.title)}</h3>
            <p>${escapeMapHtml(l.location)}</p>
            <a href="/listings/${encodeURIComponent(l.id)}">View listing →</a>
          </div>
        `);
        infoWindow.open({ map, anchor: marker });
      });
    });
  } catch (error) {
    console.error('Listings map failed to load:', error);
    showListingsMapFallback();
  }
}

// Handle authentication/billing failures (wrong/missing key, billing not
// enabled, referrer not allowed) — Google calls this global instead of
// throwing, so the map degrades gracefully instead of showing a blank box.
window.gm_authFailure = showListingsMapFallback;
