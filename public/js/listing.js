document.addEventListener('DOMContentLoaded', function() {
  // ── Photo modal / carousel ─────────────────────────────────────────────
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

  function openModal() {
    if (modalThumbs.length > 0) updateModalImage(0);
    photoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function updateModalImage(index) {
    currentImageIndex = index;
    modalMainImage.src = modalThumbs[index].src;
    modalMainImage.alt = modalThumbs[index].alt;
    currentImageCounter.textContent = index + 1;
    modalThumbs.forEach((thumb, i) => thumb.parentElement.classList.toggle('active', i === index));
  }

  const seeMoreBtn = document.getElementById('see-more-btn');
  if (seeMoreBtn) {
    seeMoreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  }

  modalThumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => updateModalImage(index));
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateModalImage((currentImageIndex - 1 + totalImages) % totalImages));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateModalImage((currentImageIndex + 1) % totalImages));
  }
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      photoModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  photoModal.addEventListener('click', function(e) {
    if (e.target === photoModal) {
      photoModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  document.addEventListener('keydown', function(e) {
    if (photoModal.style.display !== 'block') return;
    if (e.key === 'ArrowLeft') updateModalImage((currentImageIndex - 1 + totalImages) % totalImages);
    else if (e.key === 'ArrowRight') updateModalImage((currentImageIndex + 1) % totalImages);
    else if (e.key === 'Escape') {
      photoModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // ── Collapsible amenities / house rules ──────────────────────────────
  document.querySelectorAll('.toggle-list-btn[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const list = document.getElementById(btn.dataset.target);
      if (!list) return;
      const expanded = list.classList.toggle('expanded');
      btn.classList.toggle('expanded', expanded);
      btn.querySelector('.toggle-label').textContent = expanded ? btn.dataset.lessLabel : btn.dataset.moreLabel;
    });
  });

  // ── Collapsible text blocks (property description, location description) ──
  document.querySelectorAll('.toggle-list-btn[data-collapse-target]').forEach(btn => {
    const box = document.getElementById(btn.dataset.collapseTarget);
    if (!box) return;
    btn.addEventListener('click', () => {
      const stillCollapsed = box.classList.toggle('collapsed');
      btn.classList.toggle('expanded', !stillCollapsed);
      btn.querySelector('.toggle-label').textContent = stillCollapsed ? 'Read more' : 'Show less';
      if (stillCollapsed) box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
});

// ── Google Maps ──────────────────────────────────────────────────────────
// NOTE: the Google Maps script tag (with the API key from .env) is loaded by
// the page itself with `callback=initMap`, so this file no longer injects
// its own <script> tag or hardcodes a key. This avoids loading the Maps
// API twice and keeps the key out of source code.

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

    const loadingElement = mapContainer.querySelector('.map-loading');
    if (loadingElement) loadingElement.style.display = 'none';

    const { Map } = await google.maps.importLibrary('maps');
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

    const propertyMap = new Map(mapContainer, {
      center: { lat, lng },
      zoom: 15,
      mapId: 'DEMO_MAP_ID',
      disableDefaultUI: false,
      mapTypeControl: true
    });

    new AdvancedMarkerElement({ map: propertyMap, position: { lat, lng }, title });

  } catch (error) {
    console.error('Error initializing map:', error);
    showMapFallback();
  }
}

function showMapFallback() {
  const mapContainer = document.getElementById('property-map');
  if (mapContainer) {
    const lat = mapContainer.dataset.lat;
    const lng = mapContainer.dataset.lng;
    mapContainer.innerHTML = `
      <div style="padding: 20px; background: #f8f9fa; border-radius: 4px;">
        <p>Map could not be loaded.
          <a href="https://maps.google.com/maps?q=${lat},${lng}" target="_blank">View on Google Maps</a>
        </p>
      </div>
    `;
  }
}

// Handle authentication failures (e.g. wrong/missing key, referrer not allowed)
window.gm_authFailure = showMapFallback;
