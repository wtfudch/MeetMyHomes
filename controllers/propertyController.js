// Sample database (replace with real DB later)
const properties = {
    'terreno-atouguia': {
      id: 'terreno-atouguia',
      title: 'Terreno à venda no caminho do Lombo da Atouguia',
      price: '€315,000',
      area: '1032 m²',
      bedrooms:'4',
      description: {
        'pt-PT': `
        Terreno com Casa para Recuperação à Venda – Atouguia (Calheta) – 1.032 m² – 315.000 €

        Descobre esta moradia independente com um vasto terreno de 1.032 m², ideal para quem procura um refúgio rural ou um projeto residencial único. A casa, datada de 1937, está pronta para recuperação e oferece um enorme potencial habitacional, rural e paisagístico. Com um terreno fértil e cultivado, é perfeita para quem deseja explorar a agricultura ou criar um espaço natural produtivo.

        A localização tranquila proporciona uma vista privilegiada, com um enquadramento natural deslumbrante que convida ao relaxamento. A proximidade com os serviços e as praias da Calheta torna esta propriedade ainda mais atrativa. A possibilidade de personalização ou transformação em casa de campo abre um leque de opções para investidores ou particulares que buscam um local especial.

        Com a possibilidade de construir de raiz, sujeito a licenciamento, esta moradia é uma excelente oportunidade para quem deseja investir no seu futuro. Não perca a chance de adquirir este imóvel por apenas 315.000 €. Venha conhecer e deixe-se encantar por tudo o que este espaço tem para oferecer!

        Interessados, contactar para mais informações e visitas.
    `.trim(),
        'en': `
        Land with House for Recovery for Sale – Atouguia (Calheta) – 1,032 m² – €315,000

        Discover this independent house with a vast 1,032 m² plot, ideal for those seeking a rural retreat or a unique residential project. The house, dating from 1937, is ready for recovery and offers enormous housing, rural, and landscape potential. With fertile and cultivated land, it's perfect for exploring agriculture or creating a productive natural space.

        The tranquil location provides a privileged view with a stunning natural setting that invites relaxation. Proximity to Calheta's services and beaches makes this property even more attractive. The possibility of customization or transformation into a country house opens a range of options for investors or individuals seeking a special place.

        With the possibility of building from scratch, subject to licensing, this house is an excellent opportunity for those wishing to invest in their future. Don't miss the chance to acquire this property for just €315,000. Come visit and let yourself be enchanted by everything this space has to offer!

        Interested parties, contact us for more information and visits.
    `.trim()
      },
      detailedFeatures: {
        specific: [
          'Superfície total do terreno 1.032 m²',
          'Superfície mínima à venda 1.032 m²',
          'Superfície edificável 400 m²',
          'Acesso por estrada'
        ],
        urban: [
          'Terreno Urbano',
          'Viabilidade para residencial unifamiliar (moradias)'
        ]
      },
      location: 'Caminho do Lombo da Atouguia, s/n',
      coordinates: {
        latitude: 32.73759010465314,
        longitude: -17.151411087160103
      },
      images: Array.from({length: 25}, (_, i) => `/images/terreno-atouguia/terreno-atouguia-${i+1}.jpg`),
      plants: Array.from({length: 1}, (_, i) => `/plants/terreno-atouguia/terreno-atouguia-${i+1}.jpg`),
      videos: Array.from({length: 4}, (_, i) => `/videos/terreno-atouguia/terreno-atouguia-${i+1}.mp4`),
      propertyType: 'terrain',
      isUrban: true
    },
    'terreno-capela': {
      id: 'terreno-capela',
      title: 'Terreno à venda na rua da Capela',
      price: '€100,000',
      area: '400 m²',
      description: {
        'pt-PT': `
        Terreno à Venda na Ponta do Pargo

        Descubra este incrível terreno de 400 m², ideal para quem procura construir a casa dos seus sonhos num ambiente tranquilo e rodeado pela natureza. Com uma classificação urbanizável, este espaço oferece a possibilidade de edificação de até 160 m², perfeito para uma moradia unifamiliar.

        Localizado numa zona calma, o terreno proporciona vistas agradáveis e acesso fácil a miradouros e trilhos, permitindo desfrutar de momentos relaxantes ao ar livre.

        Com grande potencial de valorização, este terreno é uma oportunidade imperdível para investidores e famílias que sonham em construir um lar personalizado. Não perca a oportunidade de construir o seu refúgio num dos recantos mais bonitos e serenos da Ilha da Madeira.

        Agende já a sua visita!
    `.trim(),
        'en': `
        Land for Sale in Ponta do Pargo

        Discover this incredible 400 m² plot, ideal for those seeking to build their dream home in a tranquil environment surrounded by nature. With an urbanizable classification, this space offers the possibility of building up to 160 m², perfect for a single-family residence.

        Located in a calm area, the plot provides pleasant views and easy access to viewpoints and trails, allowing you to enjoy relaxing outdoor moments.

        With great potential for appreciation, this plot is an unmissable opportunity for investors and families dreaming of building a personalized home. Don't miss the chance to build your retreat in one of Madeira's most beautiful and serene corners.

        Schedule your visit now!
    `.trim()
      },
      detailedFeatures: {
        specific: [
          'Superfície total do terreno 400 m²',
          'Superficie mínima à venda 400 m²',
          'Superfície edificável 160 m²',
          'Acesso por estrada'
        ],
        urban: [
          'Terreno urbanizável',
          'Viabilidade para residencial unifamiliar (moradias)'
        ]
      },
      location: 'Rua da Capela, s/n',
      coordinates: {
        latitude: 32.82976190146658,
        longitude: -17.22806895767973
      },
      images: Array.from({length: 13}, (_, i) => `/images/terreno-capela/terreno-capela-${i+1}.jpg`),
      plants: Array.from({length: 0}, () => []),
      videos: Array.from({length: 4}, (_, i) => `/videos/terreno-capela/terreno-capela-${i+1}.mp4`),
      propertyType: 'terrain',
      isUrban: false,
      isUrbanizable: true
    },
    'terreno-picos': {
      id: 'terreno-picos',
      title: 'Terreno à venda no caminho dos Picos',
      price: '€220,000',
      area: '1745 m²',
      description: {
        'pt-PT': `
        Terreno à Venda nos Prazeres, Ilha da Madeira

        Descubra a oportunidade perfeita para construir o seu sonho nos Prazeres, Ilha da Madeira! Este magnífico terreno de 1.745 m² está à venda por um preço atrativo de 220.000 €. Situado em um ambiente pacífico e natural, oferece uma vista deslumbrante que promete pôr do sol inesquecíveis. Com acesso para carro disponível, o espaço é ideal para quem busca tranquilidade sem abrir mão da conveniência.

        A localização privilegiada permite a edificação de uma moradia de luxo ou um refúgio personalizado, com potencial para construir uma casa grande ou várias habitações, sempre respeitando as licenças e regulamentos municipais.

        Seja para investidores ou particulares com visão e criatividade, esta é uma oportunidade imperdível! Não perca a chance de transformar este espaço em algo verdadeiramente especial. Venha conhecer e deixe-se encantar pela beleza e potencial deste terreno!
    `.trim(),
        'en': `
        Land for Sale in Prazeres, Madeira Island

        Discover the perfect opportunity to build your dream in Prazeres, Madeira Island! This magnificent 1,745 m² plot is for sale at an attractive price of €220,000. Located in a peaceful and natural environment, it offers a stunning view that promises unforgettable sunsets. With car access available, the space is ideal for those seeking tranquility without sacrificing convenience.

        The privileged location allows for the construction of a luxury residence or a personalized retreat, with potential to build a large house or multiple dwellings, always respecting licenses and municipal regulations.

        Whether for investors or individuals with vision and creativity, this is an unmissable opportunity! Don't miss the chance to transform this space into something truly special. Come visit and let yourself be enchanted by the beauty and potential of this land!
    `.trim()
      },
      detailedFeatures: {
        specific: [
          'Superfície total do terreno 1745 m²',
          'Superficie mínima à venda 1745 m²',
          'Superfície edificável 1745 m²',
          'Acesso por estrada'
        ],
        urban: [
          'Terreno urbanizável',
        ],
        
      },
      location: 'Caminho dos Picos, s/n',
      coordinates: {
        latitude: 32.750298208973184,
        longitude: -17.20805738030026
      },
      images: Array.from({length: 18}, (_, i) => `/images/terreno-picos/terreno-picos-${i+1}.jpg`),
      plants: Array.from({length: 0}, () => []),
      videos: Array.from({length: 0}, () => []),
      propertyType: 'terrain',
      isUrban: false,
      isUrbanizable: true
    },
    'terreno-chiqueiros': {
      id: 'terreno-chiqueiros',
      title: 'Terreno à venda em Chiqueiros',
      price: '€65,000',
      area: '2030 m²',
      description: {
        'pt-PT': `
        Terreno com 2.030 m² nos Canhas – Zona Alta, Tranquila e Ideal para Agricultura ou Projeto Sustentável

        Apresentamos este amplo terreno com 2.030 m², localizado na zona dos Canhas, numa área extremamente sossegada e envolta pela natureza, ideal para quem procura privacidade, espaço e contacto direto com o campo.

        Com uma incrível diversidade agrícola, este terreno conta com mais de 120 árvores de frutos, incluindo abacateiros, limoeiros, laranjeiras, maracujeiros, pereiras rocha, amoreiras, entre outras espécies, o que o torna uma excelente opção para cultivo, lazer ou até mesmo um projeto turístico de base sustentável.

        A propriedade dispõe ainda de um churrasco, sistema de rega instalado e um armazém de apoio à atividade agrícola, oferecendo todas as condições para quem pretende usufruir ou desenvolver um projeto agrícola num ambiente calmo e fértil.

        Características principais:
        - Área total: 2.030 m²
        - Localização: Canhas
        - Mais de 120 árvores de fruto variadas
        - Churrasco e armazém agrícola incluídos
        - Sistema de rega instalado
        - Excelente exposição solar

        Não perca esta oportunidade única de investimento num terreno versátil, fértil e com enorme potencial, seja para fins pessoais ou comerciais.

        Entre em contacto connosco para mais informações ou para agendar a sua visita!
    `.trim(),
        'en': `
        2,030 m² Plot in Canhas – High, Tranquil Area Ideal for Agriculture or Sustainable Project

        We present this spacious 2,030 m² plot, located in the Canhas area, in an extremely peaceful zone surrounded by nature, ideal for those seeking privacy, space, and direct contact with the countryside.

        With incredible agricultural diversity, this plot boasts over 120 fruit trees, including avocado trees, lemon trees, orange trees, passion fruit vines, Rocha pear trees, mulberry trees, among other species, making it an excellent option for cultivation, leisure, or even a sustainable tourism project.

        The property also includes a barbecue, installed irrigation system, and a storage shed for agricultural support, offering all conditions for those wishing to enjoy or develop an agricultural project in a calm and fertile environment.

        Main features:
        - Total area: 2,030 m²
        - Location: Canhas
        - Over 120 varied fruit trees
        - Barbecue and agricultural storage shed included
        - Installed irrigation system
        - Excellent sun exposure

        Don't miss this unique investment opportunity in a versatile, fertile plot with enormous potential, whether for personal or commercial purposes.

        Contact us for more information or to schedule your visit!
    `.trim()
      },
      detailedFeatures: {
        specific: [
          'Superfície total do terreno 2030 m²',
          'Acesso por caminho'
        ],
        urban: [
          'Terreno não urbanizável'
        ]
      },
      location: 'Chiqueiros, s/n',
      coordinates: {
        latitude: 32.696631549511444,
        longitude: -17.104452771272985
      },
      images: Array.from({length: 11}, () => []),
      plants: Array.from({length: 0}, () => []),
      videos: Array.from({length: 0}, () => []),
      propertyType: 'terrain',
      isUrban: false,
      isUrbanizable: false
    },
    'casa-lombo-salao': {
      id: 'casa-lombo-salao',
      title: 'Moradia independente em Caminho Lombo do Salão',
      price: '€194,000',
      area: '200 m²',
      bedrooms: 4,
      bathrooms: 1,
      description: {
        'pt-PT': `
       
      Moradia para Reconstrução com Vista Mar – Calheta – Terreno de 300 m²

      Oportunidade única no coração da Calheta! Esta moradia, inserida num terreno com cerca de 300 m², oferece uma localização excecional e uma vista soberba sobre a Estrela da Calheta e o oceano Atlântico.

      Embora a casa necessite de reconstrução total, o seu enorme potencial torna-a ideal para quem procura criar uma residência personalizada, um refúgio de férias ou até um projeto de alojamento local, numa das zonas mais procuradas da Madeira.

      Principais destaques:
      Moradia para reconstrução total
      Terreno com cerca de 300 m²
      Localização central e muito acessível, próxima de serviços, comércio, marina e praia
      Vista aberta para o mar e para a Estrela da Calheta
      Bons acessos e fácil ligação às vias principais
      Ideal para projeto de habitação própria, casa de férias ou investimento turístico
      Este é o tipo de imóvel que combina localização, vista e potencial — uma tela em branco para transformar num espaço único e valorizado.

      Contacta-nos para mais informações ou para agendar uma visita!
    `.trim(),
        'en': `
        House for Reconstruction with Sea View – Calheta – 300 m² Plot

        A unique opportunity in the heart of Calheta! This house, set on a 300 m² plot, offers an exceptional location and a stunning view over Estrela da Calheta and the Atlantic Ocean.

        Although the house requires total reconstruction, its huge potential makes it ideal for creating a customized residence, a vacation retreat, or even a local accommodation project in one of Madeira’s most sought-after areas.

        Main highlights:
        House for total reconstruction
        Plot of approximately 300 m²
        Central and highly accessible location, near services, shops, marina, and beach
        Open sea view and Estrela da Calheta
        Good access and easy connection to main roads
        Ideal for personal housing, vacation home, or tourist investment
        This is the type of property that combines location, view, and potential—a blank canvas to transform into a unique and valuable space.

        Contact us for more information or to schedule a visit!
    `.trim()
      },
      detailedFeatures: {
        specific: [
          'Superfície total do terreno 200 m²',
          'Acesso por estrada'
        ],
        urban: [
          'Terreno urbano'
        ],
        energy: []
      },
      location: 'Caminho Lombo do Salão 83, Calheta',
      coordinates: {
        latitude: 32.728288816736494,
        longitude: -17.174326532135876
      },
      images: Array.from({length: 39}, (_, i) => `/images/casa-lombo-salao/casa-lombo-salao-${i+1}.jpg`),
      plants: Array.from({length: 0}, () => []),
      videos: Array.from({length: 4}, (_, i) => `/videos/casa-lombo-salao/casa-lombo-salao-${i+1}.mp4`),
      propertyType: 'house',
      yearBuilt: 1995,
      energyRating: 'D',
      isUrban: true,
      isUrbanizable: true
    },
    'terreno-faja-ovelha': {
      id: 'terreno-faja-ovelha',
      title: 'Terreno à venda em ER 222 s/n, Fajã da Ovelha',
      price: '€200,000',
      area: '2520 m²',
      description: {
        'pt-PT': `
        Terreno com 2.030 m² em Fajã da Ovelha – Zona Rural e Tranquila, Ideal para Projetos Sustentáveis

        Apresentamos este espaçoso terreno de 2.030 m², situado na tranquila Fajã da Ovelha, envolto pela natureza, perfeito para quem busca privacidade e um contacto próximo com o campo.

        Com acesso por caminho e localizado numa área não urbanizável, este terreno oferece um ambiente sereno, ideal para agricultura ou projetos sustentáveis. A propriedade inclui condições básicas para desenvolvimento, destacando-se pela sua localização isolada e potencial natural.

        Excelente para projetos agrícolas

        Não perca esta oportunidade única de investir num terreno versátil e tranquilo, perfeito para fins pessoais ou sustentáveis.

        Entre em contacto connosco para mais informações ou para agendar a sua visita!
    `.trim(),
        'en': `
        2,030 m² Plot in Fajã da Ovelha – Rural and Tranquil Area Ideal for Sustainable Projects

        We present this spacious 2,030 m² plot, situated in the tranquil Fajã da Ovelha, surrounded by nature, perfect for those seeking privacy and close contact with the countryside.

        With access by path and located in a non-urbanizable area, this plot offers a serene environment, ideal for agriculture or sustainable projects. The property includes basic development conditions, standing out for its isolated location and natural potential.

        Excellent for agricultural projects

        Don't miss this unique investment opportunity in a versatile and tranquil plot, perfect for personal or sustainable purposes.

        Contact us for more information or to schedule your visit!
    `.trim()
      },
      detailedFeatures: {
        specific: [
          'Superfície total do terreno 2030 m²',
          'Acesso por caminho'
        ],
        urban: [
          'Terreno não urbanizável'
        ]
      },
      location: 'ER 222 s/n, Fajã da Ovelha',
      coordinates: {
        latitude: 32.78265863857103,
        longitude: -17.232071034748284
      },
      images: Array.from({length: 6}, (_, i) => `/images/terreno-faja-ovelha/terreno-faja-ovelha-${i+1}.jpg`),
      plants: Array.from({length: 0}, () => []),
      videos: Array.from({length: 0}, () => []),
      propertyType: 'terrain',
      isUrban: false,
      isUrbanizable: false
    },
    'casa-laranjeiras': {
      id: 'casa-laranjeiras',
      title: 'Moradia independente em Lombo das Laranjeiras',
      price: '€244,550',
      area: '127 m²',
      bedrooms: 3,
      bathrooms: 1,
      description: {
        'pt-PT': `
        Moradia com 407 m² para Reconstrução no Lombo das Laranjeiras – Excelente Localização e Potencial de Investimento

        Apresentamos esta moradia antiga de dois pisos, situada no Lombo das Laranjeiras, Calheta – uma zona calma, com bons acessos e cada vez mais procurada por quem pretende investir ou criar um refúgio com charme madeirense.

        Com um terreno de 407 m² e uma extensa frente de estrada, esta propriedade é ideal para quem procura um projeto de reconstrução, seja para alojamento local, revenda ou mesmo como segunda habitação com identidade própria. A estrutura existente permite pensar numa renovação com história, mantendo a autenticidade do lugar e ao mesmo tempo adaptando às exigências atuais.

        A vista aberta e a boa exposição solar conferem à casa um ambiente luminoso e agradável, valorizando ainda mais o resultado final de qualquer intervenção.

        Pontos fortes da propriedade:

        Moradia de dois pisos para reconstrução total
        Terreno com 407 m²
        Ampla frente de estrada, com ótimo acesso
        Boa vista e excelente orientação solar
        Localização tranquila, mas com bons acessos e crescente procura
        Ideal para projeto de alojamento local ou reconstrução para revenda
        Se procura um imóvel com potencial de valorização e liberdade para criar um espaço único, esta é uma excelente oportunidade no coração da Calheta.

        Fale connosco para mais informações ou para agendar a sua visita ao local.
    `.trim(),
        'en': `
        Independent House in Lombo das Laranjeiras for Reconstruction – Excellent Location and Investment Potential

        We present this old two-story house, located in Lombo das Laranjeiras, Calheta – a calm area with good access and increasingly sought after by those looking to invest or create a retreat with Madeiran charm.

        With a 407 m² plot and an extensive road frontage, this property is ideal for those seeking a reconstruction project, whether for local accommodation, resale, or even as a second home with its own identity. The existing structure allows for a renovation with history, maintaining the place's authenticity while adapting to current requirements.

        The open view and good sun exposure give the house a luminous and pleasant environment, further enhancing the final result of any intervention.

        Property strengths:

        Two-story house for total reconstruction
        Plot of 407 m²
        Wide road frontage with excellent access
        Good view and excellent sun orientation
        Tranquil location, but with good access and increasing demand
        Ideal for local accommodation project or reconstruction for resale
        If you're looking for a property with potential for appreciation and freedom to create a unique space, this is an excellent opportunity in the heart of Calheta.

        Talk to us for more information or to schedule your visit to the site.
    `.trim()
      },
      detailedFeatures: {
        specific: [
          'Superfície total do terreno 407 m²',
          'Superfície edificável 127 m²',
          'Acesso por estrada'
        ],
        urban: [
          'Terreno urbano',
          'Viabilidade para residencial unifamiliar (moradias)'
        ],
        energy: []
      },
      location: 'Caminho Lombo das Laranjeiras 60, Calheta',
      coordinates: {
        latitude: 32.73055264887412,
        longitude: -17.17473604544298
      },
      images: Array.from({length: 24}, () => []),
      plants: Array.from({length: 2}, () => []),
      videos: Array.from({length: 0}, () => []),
      propertyType: 'house',
      yearBuilt: 2005,
      energyRating: 'D'
    }
};

const getAllProperties = (req, res) => {
  const lang = res.locals.getCurrentLanguage();
  console.log('Properties language:', lang);
  const translatedProperties = Object.values(properties).map(prop => {
    const updatedFeatures = { ...prop.detailedFeatures };
    if (prop.energyRating && !updatedFeatures.energy.includes(`Class ${prop.energyRating}`)) {
      updatedFeatures.energy.push(`Class ${prop.energyRating}`);
    }
    return {
      ...prop,
      detailedFeatures: updatedFeatures,
      title: prop.title[lang] || prop.title['en'],
      description: prop.description[lang] || prop.description['en']
    };
  });
  res.render('properties', { 
    title: 'Our Properties',
    properties: translatedProperties 
  });
};

const getPropertyById = (req, res) => {
  const property = properties[req.params.id];
  if (!property) {
    return res.status(404).render('404');
  }
  const lang = res.locals.getCurrentLanguage();
  console.log('Property detail language:', lang);
  const updatedFeatures = { ...property.detailedFeatures };
  if (property.energyRating && !updatedFeatures.energy.includes(`Class ${property.energyRating}`)) {
    updatedFeatures.energy.push(`Class ${property.energyRating}`);
  }
  const translatedProperty = {
    ...property,
    detailedFeatures: updatedFeatures,
    title: property.title[lang] || property.title['en'],
    description: property.description[lang] || property.description['en']
  };

    // propertyController.js
  res.locals.getEnergyClass = function(feature) {
    const rating = feature.match(/Class ([A-G])/);
    if (rating) {
      return 'energy-' + rating[1];
    }
    return '';
  };

  res.render('property', { 
    title: translatedProperty.title,
    property: translatedProperty 
  });
};

module.exports = { getAllProperties, getPropertyById, properties };