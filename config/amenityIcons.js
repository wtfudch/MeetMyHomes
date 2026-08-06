/**
 * config/amenityIcons.js
 *
 * Maps amenity labels (as stored in data/listings.json) to a Font Awesome 6
 * free solid icon class, so listing pages can render an icon next to each
 * amenity instead of a plain bulleted list (matching Airbnb's style).
 */

const ICONS = {
  'Wi-Fi': 'fa-wifi',
  'Kitchen': 'fa-kitchen-set',
  'Kitchenette': 'fa-kitchen-set',
  'Cooking basics': 'fa-utensils',
  'Dishes and silverware': 'fa-utensils',
  'Dining table': 'fa-utensils',
  'Wine glasses': 'fa-wine-glass',
  'Coffee': 'fa-mug-saucer',
  'Coffee maker': 'fa-mug-hot',
  'Blender': 'fa-blender',
  'Refrigerator': 'fa-snowflake',
  'Mini fridge': 'fa-snowflake',
  'Freezer': 'fa-snowflake',
  'Microwave': 'fa-square',
  'Oven': 'fa-fire-burner',
  'Stove': 'fa-fire-burner',
  'Toaster': 'fa-bread-slice',
  'Dishwasher': 'fa-sink',
  'Trash compactor': 'fa-trash',

  'Air Conditioning': 'fa-snowflake',
  'Heating': 'fa-temperature-high',
  'Ceiling fan': 'fa-fan',
  'Portable fans': 'fa-fan',

  'Free Parking': 'fa-square-parking',
  'Free Street Parking': 'fa-square-parking',
  'EV charger': 'fa-charging-station',
  'Gated community': 'fa-lock',
  'Elevator': 'fa-elevator',
  'Single-story home': 'fa-house',

  'TV': 'fa-tv',
  'Sound system': 'fa-volume-high',
  'Board games': 'fa-dice',
  'Books and toys for children': 'fa-child-reaching',
  'Dedicated workspace': 'fa-laptop',
  'Ethernet connection': 'fa-ethernet',

  'Bed linen': 'fa-bed',
  'Extra pillows and blankets': 'fa-bed',
  'Hangers': 'fa-shirt',
  'Closet': 'fa-door-closed',
  'Iron': 'fa-shirt',
  'Drying rack': 'fa-shirt',
  'Dryer': 'fa-arrows-rotate',
  'Washing Machine': 'fa-arrows-rotate',
  'Blackout blinds': 'fa-moon',

  'Bathtub': 'fa-bath',
  'Bidet': 'fa-toilet',
  'Body soap': 'fa-pump-soap',
  'Shampoo': 'fa-pump-soap',
  'Shower gel': 'fa-pump-soap',
  'Conditioner': 'fa-pump-soap',
  'Hair dryer': 'fa-wind',
  'Hot water': 'fa-droplet',

  'Pool': 'fa-water-ladder',
  'Pool view': 'fa-water-ladder',
  'Hot Tub': 'fa-hot-tub-person',
  'Private Hot Tub': 'fa-hot-tub-person',
  'Outdoor shower': 'fa-shower',

  'Sea view': 'fa-water',
  'Ocean view': 'fa-water',
  'Waterfront': 'fa-water',
  'Beach view': 'fa-umbrella-beach',
  'Mountain view': 'fa-mountain-sun',
  'Valley view': 'fa-mountain-sun',
  'Garden view': 'fa-seedling',
  'City view': 'fa-city',
  'Patio view': 'fa-umbrella',

  'Patio or balcony': 'fa-umbrella',
  'Backyard': 'fa-tree',
  'Outdoor dining area': 'fa-utensils',
  'Outdoor furniture': 'fa-chair',
  'Outdoor playground': 'fa-child-reaching',
  'Sun loungers': 'fa-umbrella-beach',
  'Hammock': 'fa-tree',
  'BBQ grill': 'fa-fire-burner',
  'BBQ utensils': 'fa-utensils',
  'Solar panels': 'fa-solar-panel',

  'Self check-in': 'fa-key',
  'Host greets you': 'fa-handshake',
  'Private entrance': 'fa-door-open',
  'Long-term stays allowed': 'fa-calendar-check',
  'Luggage drop-off allowed': 'fa-suitcase-rolling',

  'Safe': 'fa-shield-halved',
  'Smoke alarm': 'fa-bell',
  'Carbon monoxide alarm': 'fa-triangle-exclamation',
  'Fire extinguisher': 'fa-fire-extinguisher',
  'First aid kit': 'fa-suitcase-medical',
  'Window guards': 'fa-window-restore',

  'Essentials': 'fa-suitcase',
  'Cleaning products': 'fa-spray-can-sparkles',
  'Crib': 'fa-baby-carriage',
  'High chair': 'fa-chair',
};

const DEFAULT_ICON = 'fa-circle-check';

function getAmenityIcon(name) {
  return ICONS[name] || DEFAULT_ICON;
}

module.exports = { getAmenityIcon };
