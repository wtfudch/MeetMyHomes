function generateImagePaths(propertyId, count) {
  return Array.from({length: count}, (_, i) => 
    `/images/${propertyId}/${propertyId}-${i+1}.jpeg`
  );
}

// listingsController.js
const listings = {
    'casa-neves': {
        id: 'casa-neves',
        title: 'Charming Apartment in Arco da Calheta',
        description: `
            Desfrute de uma casa espaçosa e bem equipada, ideal para famílias ou grupos de até 6 pessoas. São 3 quartos confortáveis, cozinha completa, sala de estar ampla, Wi-Fi e TV. Localizada numa área central, terá fácil acesso a restaurantes, praias e atrações turísticas, tudo a poucos minutos de distância. Perfeita para quem busca conforto e comodidade num ambiente acolhedor. Reserve agora e aproveite!\n\n
            Acesso por escadas proporcionando uma boa vista do local e do mar.\n\n
            Outros serviços disponíveis aos hóspedes:\n
            - Aluguer de carro com seguro completo, não é necessário depósito ou cartão de crédito! (Entrega em qualquer local)\n
            - Passeio de barco para observação de golfinhos e baleias.\n\n
            Dados do registo\n
            158948/AL
        `.trim(),
        location: 'Funchal, Portugal',
        type: 'Entire apartment',
        bedrooms: 3,
        bathrooms: 3,
        guests: 6,
        pricePerNight: '€120',
        rating: 5,
        superhost: true,
        amenities: ['Wi-Fi', 'Kitchen', 'Washing Machine', 'Free Parking'],
        images: Array.from({length: 45}, (_, i) => `/images/casa-neves/casa-neves-${i+1}.jpeg`),
        host: {
          name: 'Maria Neves',
          since: 2018,
          superhost: true,
          description: 'I love hosting guests and sharing the beauty of Madeira.'
        },
        reviews: [
          {
            author: 'Jane Doe',
            rating: 5,
            comment: 'Great place to stay! Highly recommended.'
          },
          {
            author: 'John Smith',
            rating: 4,
            comment: 'The host was very welcoming and the property was clean.'
          }
        ],
        houseRules: [
          "No smoking",
          "No pets",
          "Check-in after 3 PM",
          "Check-out before 11 AM",
          "Max 6 guests",
          "No parties or events",
          "Quiet hours after 10 PM"
        ],
        coordinates: {
          latitude: 32.71394729614258,  
          longitude: -17.147069931030273
        }
    },
    'arco-apartment': {
        id: 'arco-apartment',
        title: 'Modern Apartment in City Center',
        description: 'A modern apartment in the heart of the city with excellent transportation links.',
        location: 'Funchal, Portugal',
        type: 'Entire apartment',
        bedrooms: 2,
        bathrooms: 1,
        guests: 4,
        pricePerNight: '€85',
        rating: 4.78,
        amenities: ['Wi-Fi', 'Kitchen', 'Air Conditioning', 'Elevator'],
        coordinates: {
          latitude: 32.71394729614258,  
          longitude: -17.147069931030273
        },
        images: Array.from({length: 33}, (_, i) => `/images/arco-apartment/arco-apartment-${i+1}.jpeg`),
        host: {
          name: 'Maria Neves',
          since: 2020,
          description: 'Professional host dedicated to making your stay perfect.'
        },
        reviews: [
          {
            author: 'Ana Rodrigues',
            rating: 5,
            comment: 'Perfect location and very clean!'
          }
        ],
        houseRules: [
          "No smoking",
          "No pets",
          "Check-in after 3 PM",
          "Check-out before 11 AM",
          "Max 6 guests",
          "No parties or events",
          "Quiet hours after 10 PM"
        ]
    },
    'green-house': {
        id: 'green-house',
        title: 'Modern Apartment in City Center',
        description: 'A modern apartment in the heart of the city with excellent transportation links.',
        location: 'Funchal, Portugal',
        type: 'Entire home',
        bedrooms: 2,
        bathrooms: 1,
        guests: 3,
        pricePerNight: '€100',
        rating: 4.86,
        amenities: ['Wi-Fi', 'Kitchen', 'Air Conditioning', 'Elevator'],
        coordinates: {
          latitude: 32.734912783773105,  
          longitude: -17.171956835767165
        },
        images: Array.from({length: 42}, (_, i) => `/images/green-house/green-house-${i+1}.jpg`),
        host: {
          name: 'João Manuel',
          since: 2024,
          description: 'Professional host dedicated to making your stay perfect.'
        },
        reviews: [
          {
            author: 'Jesper',
            rating: 5,
            comment: 'Tivemos uma estadia super simpática. As fotos e a descrição do espaço atenderam plenamente às nossas expectativas e a comunicação com o nosso anfitrião foi incrivelmente fácil e rápida. Gostaríamos de voltar noutra altura e podemos recomendar facilmente o espaço a outras pessoas. Muito obrigada por uma excelente estadia.'
          }
        ],
        houseRules: [
          "No smoking",
          "No pets",
          "Check-in after 3 PM",
          "Check-out before 11 AM",
          "Max 6 guests",
          "No parties or events",
          "Quiet hours after 10 PM"
        ]
    },
    'white-apartment': {
        id: 'white-apartment',
        title: 'Modern Apartment in City Center',
        description: 'A modern apartment in the heart of the city with excellent transportation links.',
        location: 'Funchal, Portugal',
        type: 'Entire home',
        bedrooms: 1,
        bathrooms: 1,
        guests: 3,
        pricePerNight: '€186',
        rating: 4.86,
        amenities: ['Wi-Fi', 'Kitchen', 'Air Conditioning', 'Elevator'],
        coordinates: {
          latitude: 32.64013422844118,  
          longitude: -16.932653261743692
        },
        images: Array.from({length: 29}, (_, i) => `/images/white-apartment/white-apartment-${i+1}.jpg`),
        host: {
          name: 'Catarina',
          since: 2024,
          description: 'Professional host dedicated to making your stay perfect.'
        },
        reviews: [
          {
            author: 'Jesper',
            rating: 5,
            comment: 'Tivemos uma estadia super simpática. As fotos e a descrição do espaço atenderam plenamente às nossas expectativas e a comunicação com o nosso anfitrião foi incrivelmente fácil e rápida. Gostaríamos de voltar noutra altura e podemos recomendar facilmente o espaço a outras pessoas. Muito obrigada por uma excelente estadia.'
          }
        ],
        houseRules: [
          "No smoking",
          "No pets",
          "Check-in after 3 PM",
          "Check-out before 11 AM",
          "Max 6 guests",
          "No parties or events",
          "Quiet hours after 10 PM"
        ]
    },
    'cantinho-da-flor': {
        id: 'cantinho-da-flor',
        title: 'Modern Apartment in City Center',
        description: 'A modern apartment in the heart of the city with excellent transportation links.',
        location: 'Funchal, Portugal',
        type: 'Entire apartment',
        bedrooms: 1,
        bathrooms: 1,
        guests: 3,
        pricePerNight: '€186',
        rating: 4.86,
        amenities: ['Wi-Fi', 'Kitchen', 'Air Conditioning', 'Elevator'],
        coordinates: {
          latitude: 32.700139624214714,  
          longitude: -17.117577113695408
        },
        images: Array.from({length: 41}, (_, i) => `/images/cantinho-da-flor/cantinho-da-flor-${i+1}.jpg`),
        host: {
          name: 'Catarina',
          since: 2024,
          description: 'Professional host dedicated to making your stay perfect.'
        },
        reviews: [
          {
            author: 'Jesper',
            rating: 5,
            comment: 'Tivemos uma estadia super simpática. As fotos e a descrição do espaço atenderam plenamente às nossas expectativas e a comunicação com o nosso anfitrião foi incrivelmente fácil e rápida. Gostaríamos de voltar noutra altura e podemos recomendar facilmente o espaço a outras pessoas. Muito obrigada por uma excelente estadia.'
          }
        ],
        houseRules: [
          "No smoking",
          "No pets",
          "Check-in after 3 PM",
          "Check-out before 11 AM",
          "Max 6 guests",
          "No parties or events",
          "Quiet hours after 10 PM"
        ]
    }
};

// Get all rental listings
const getAllListings = (req, res) => {
  res.render('listings/listings', { 
    title: 'Vacation Rentals',
    listings: Object.values(listings) 
  });
};

// Get single rental listing
const getListingById = (req, res) => {
  const listing = listings[req.params.id]; // Access by key directly
  if (!listing) {
    return res.status(404).render('404', { 
      title: 'Listing Not Found' 
    });
  }
  res.render('listings/listing', {
    title: listing.title,
    listing
  });
};

module.exports = { getAllListings, getListingById, listings }; // Export listings object