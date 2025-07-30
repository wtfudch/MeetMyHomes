// Sample database (replace with real DB later)
const properties = {
    'terreno-atouguia': {
      id: 'terreno-atouguia',
      title: 'Terreno à venda no caminho do Lombo da Atouguia',
      price: '€315,000',
      area: '1032 m²',
      description: `
        Terreno com Casa para Recuperação à Venda – Atouguia (Calheta) – 1.032 m² – 325.000 €

        Descobre esta moradia independente com um vasto terreno de 1.032 m², ideal para quem procura um refúgio rural ou um projeto residencial único. A casa, datada de 1937, está pronta para recuperação e oferece um enorme potencial habitacional, rural e paisagístico. Com um terreno fértil e cultivado, é perfeita para quem deseja explorar a agricultura ou criar um espaço natural produtivo.

        A localização tranquila proporciona uma vista privilegiada, com um enquadramento natural deslumbrante que convida ao relaxamento. A proximidade com os serviços e as praias da Calheta torna esta propriedade ainda mais atrativa. A possibilidade de personalização ou transformação em casa de campo abre um leque de opções para investidores ou particulares que buscam um local especial.

        Com a possibilidade de construir de raiz, sujeito a licenciamento, esta moradia é uma excelente oportunidade para quem deseja investir no seu futuro. Não perca a chance de adquirir este imóvel por apenas 325.000 €. Venha conhecer e deixe-se encantar por tudo o que este espaço tem para oferecer!

        Interessados, contactar para mais informações e visitas.
    `.trim(), 
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
        ],
        energy: [
          'Propriedade isenta'
        ]
      },
      location: 'Caminho do Lombo da Atouguia, s/n',
      coordinates: {
        latitude: 32.73759010465314,
        longitude: -17.151411087160103
      },
      images: Array.from({length: 20}, (_, i) => `/images/terreno-atouguia/terreno-atouguia-${i+1}.jpg`),
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
      description: `
        Terreno à Venda na Ponta do Pargo

        Descubra este incrível terreno de 400 m², ideal para quem procura construir a casa dos seus sonhos num ambiente tranquilo e rodeado pela natureza. Com uma classificação urbanizável, este espaço oferece a possibilidade de edificação de até 160 m², perfeito para uma moradia unifamiliar.

        Localizado numa zona calma, o terreno proporciona vistas agradáveis e acesso fácil a miradouros e trilhos, permitindo desfrutar de momentos relaxantes ao ar livre.

        Com grande potencial de valorização, este terreno é uma oportunidade imperdível para investidores e famílias que sonham em construir um lar personalizado. Não perca a oportunidade de construir o seu refúgio num dos recantos mais bonitos e serenos da Ilha da Madeira.

        Agende já a sua visita!
    `.trim(), 
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
        ],
        energy: [
          'Propriedade isenta'
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
      description: `
        Terreno à Venda nos Prazeres, Ilha da Madeira

        Descubra a oportunidade perfeita para construir o seu sonho nos Prazeres, Ilha da Madeira! Este magnífico terreno de 1.745 m² está à venda por um preço atrativo de 220.000 €. Situado em um ambiente pacífico e natural, oferece uma vista deslumbrante que promete pôr do sol inesquecíveis. Com acesso para carro disponível, o espaço é ideal para quem busca tranquilidade sem abrir mão da conveniência.

        A localização privilegiada permite a edificação de uma moradia de luxo ou um refúgio personalizado, com potencial para construir uma casa grande ou várias habitações, sempre respeitando as licenças e regulamentos municipais.

        Seja para investidores ou particulares com visão e criatividade, esta é uma oportunidade imperdível! Não perca a chance de transformar este espaço em algo verdadeiramente especial. Venha conhecer e deixe-se encantar pela beleza e potencial deste terreno!
    `.trim(), 
      detailedFeatures: {
        specific: [
          'Superfície total do terreno 1745 m²',
          'Superficie mínima à venda 1745 m²',
          'Superfície edificável 1745 m²',
          'Acesso por estrada'
        ],
        urban: [
          'Terreno urbanizável',
          'Viabilidade para routra'
        ],
        equipamento: [
          'Água',
          'Calçadas'
        ],
        energy: [
          'Propriedade isenta'
        ]
      },
      location: 'Caminho dos Picos, s/n',
      coordinates: {
        latitude: 32.750298208973184,
        longitude: -17.20805738030026
      },
      images: Array.from({length: 30}, (_, i) => `/images/terreno-picos/terreno-picos-${i+1}.jpg`),
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
      description: `
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
      detailedFeatures: {
        specific: [
          'Superfície total do terreno 2030 m²',
          'Acesso por caminho'
        ],
        urban: [
          'Terreno não urbanizável'
        ],
        energy: [
          'Propriedade isenta'
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
      description: `
        Terreno com 200 m² de area bruta 

        Entre em contacto connosco para mais informações ou para agendar a sua visita!
    `.trim(), 
      detailedFeatures: {
        specific: [
          'Superfície total do terreno 200 m²',
          'Acesso por estrada'
        ],
        urban: [
          'Terreno urbano'
        ],
        energy: [
          'Propriedade com desempenho energético não facilitado'
        ]
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
      energyRating: 'C',
      isUrban: true,
      isUrbanizable: true
    },
    'terreno-faja-ovelha': {
      id: 'terreno-faja-ovelha',
      title: 'Terreno à venda em ER 222 s/n, Fajã da Ovelha',
      price: '€200,000',
      area: '2520 m²',
      description: `
        Terreno com 2.030 m² em Fajã da Ovelha – Zona Rural e Tranquila, Ideal para Projetos Sustentáveis

        Apresentamos este espaçoso terreno de 2.030 m², situado na tranquila Fajã da Ovelha, envolto pela natureza, perfeito para quem busca privacidade e um contacto próximo com o campo.

        Com acesso por caminho e localizado numa área não urbanizável, este terreno oferece um ambiente sereno, ideal para agricultura ou projetos sustentáveis. A propriedade inclui condições básicas para desenvolvimento, destacando-se pela sua localização isolada e potencial natural.

        Excelente para projetos agrícolas

        Não perca esta oportunidade única de investir num terreno versátil e tranquilo, perfeito para fins pessoais ou sustentáveis.

        Entre em contacto connosco para mais informações ou para agendar a sua visita!
    `.trim(), 
      detailedFeatures: {
        specific: [
          'Superfície total do terreno 2030 m²',
          'Acesso por caminho'
        ],
        urban: [
          'Terreno não urbanizável'
        ],
        energy: [
          'Propriedade isenta'
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
      description: `
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
        energy: [
          'Classe energética: D'
        ]
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
      energyRating: 'B'
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
  
module.exports = { getAllProperties, getPropertyById, properties }; // Export properties object