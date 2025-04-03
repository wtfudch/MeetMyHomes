// Sample database (replace with real DB later)
const properties = {
    'casa-neves': {
      id: 'casa-neves',
      title: 'Casa Neves',
      price: '€450,000',
      area: '180 m²',
      bedrooms: 3,
      bathrooms: 2,
      description: 'Charming villa with sea views in Funchal',
      features: ['Swimming pool', 'Garden', 'Parking', 'Fireplace'],
      location: 'Funchal, Madeira',
      images: [
        '/images/casaNeves/casaNeves1.jpeg',
        '/images/casaNeves/casaNeves2.jpeg'
      ],
      yearBuilt: 2010,
      energyRating: 'B'
    },
    'arco-apartment': {
      id: 'arco-apartment',
      title: 'Arco Apartment',
      price: '€320,000',
      area: '110 m²',
      bedrooms: 2,
      bathrooms: 1,
      description: 'Modern downtown apartment with balcony',
      features: ['Balcony', 'Elevator', 'Storage', 'Central location'],
      location: 'Lisbon, Portugal',
      images: [
        '/images/arcoApartment/arcoApartment1.jpeg',
        '/images/arcoApartment/arcoApartment2.jpeg'
      ],
      yearBuilt: 2018,
      energyRating: 'A'
    }
  };
  
const getAllProperties = (req, res) => {
    res.render('properties', { 
      title: 'Our Properties',
      properties: Object.values(properties) 
    });
};
  
const getPropertyById = (req, res) => {
    const property = properties[req.params.id];
    if (!property) {
      return res.status(404).render('404');
    }
    res.render('property', { 
      title: property.title,
      property 
    });
};
  
module.exports = { getAllProperties, getPropertyById };