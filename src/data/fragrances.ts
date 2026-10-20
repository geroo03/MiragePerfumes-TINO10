import { Fragrance } from '../types';

/** Imágenes alojadas en /public/img (respeta la base de GitHub Pages). */
const img = (file: string) => `${import.meta.env.BASE_URL}img/${file}`;

export const FRAGRANCES: Fragrance[] = [
  {
    id: 'lattafa-khamrah-qahwa',
    name: 'Khamrah Qahwa',
    house: 'Lattafa',
    badge: 'Best Seller',
    category: ['all', 'arabes', 'decants', 'unisex', 'masculinos'],
    gender: 'Unisex',
    shortNotes: 'Ámbar · Café tostado · Vainilla',
    description: 'Una suntuosa interpretación oriental donde el café arábigo tostado se entrelaza con canela cálida, licor de praliné y un fondo resinoso de vainilla de Madagascar y haba tonka.',
    image: img('khamrah-qahwa.jpg'),
    imageAlt: 'Lattafa Khamrah Qahwa frasco oriental sobre lino',
    fullBottlePrice: 84500,
    decant5mlPrice: 9200,
    decant10mlPrice: 16500,
    batchCode: 'LT-2408-KQ',
    concentration: 'Eau de Parfum',
    origin: 'Emiratos Árabes Unidos',
    pyramid: {
      salida: ['Café Arábigo', 'Canela de Ceilán', 'Cardamomo'],
      corazon: ['Praliné confitado', 'Frutas confitadas', 'Flores blancas'],
      fondo: ['Vainilla de Madagascar', 'Haba Tonka', 'Benjuí', 'Café tostado']
    },
    longevity: '12+ horas',
    sillage: 'Pesada',
    occasion: 'Citas nocturnas, otoño e invierno, ocasiones especiales',
    season: ['Otoño', 'Invierno']
  },
  {
    id: 'afnan-9pm-pour-homme',
    name: '9 PM Pour Homme',
    house: 'Afnan',
    badge: 'Tendencia',
    category: ['all', 'arabes', 'decants', 'masculinos', 'unisex'],
    gender: 'Masculino',
    shortNotes: 'Vainilla negra · Lavanda · Canela',
    description: 'La bomba seductora por excelencia. Abre con manzana silvestre y canela fresca, evolucionando hacia un corazón floral empolvado y una base de ámbar y vainilla negra con proyección imponente.',
    image: img('afnan-9pm.jpg'),
    imageAlt: 'Afnan 9 PM frasco elegante de autor',
    fullBottlePrice: 76000,
    decant5mlPrice: 8100,
    decant10mlPrice: 14800,
    batchCode: 'AF-9PM-882B',
    concentration: 'Eau de Parfum',
    origin: 'Emiratos Árabes Unidos',
    pyramid: {
      salida: ['Manzana verde', 'Canela', 'Lavanda silvestre', 'Bergamota'],
      corazon: ['Flor de azahar', 'Lirio de los valles'],
      fondo: ['Vainilla bourbon', 'Haba tonka', 'Ámbar gris', 'Pachulí']
    },
    longevity: '10-12 horas',
    sillage: 'Pesada',
    occasion: 'Boliche, salidas nocturnas, clima templado a fresco',
    season: ['Todo el año', 'Otoño', 'Invierno']
  },
  {
    id: 'armaf-club-de-nuit-intense',
    name: 'Club de Nuit Intense',
    house: 'Armaf',
    badge: 'Más Reseñado',
    category: ['all', 'arabes', 'decants', 'masculinos'],
    gender: 'Masculino',
    shortNotes: 'Cítrico · Ahumado · Abedul',
    description: 'El legendario rey de los cumplidos masculinos. Salida cítrica chispeante de limón y grosellas que rápidamente madura en maderas nobles ahumadas de abedul negro y almizcle blanco.',
    image: img('club-de-nuit-intense.jpg'),
    imageAlt: 'Armaf Club de Nuit Intense Man dark square perfume bottle',
    fullBottlePrice: 89000,
    decant5mlPrice: 9500,
    decant10mlPrice: 17200,
    batchCode: 'AR-CDNI-0924',
    concentration: 'Eau de Parfum',
    origin: 'Francia / EAU',
    pyramid: {
      salida: ['Limón Amalfi', 'Grosellas negras', 'Manzana', 'Bergamota'],
      corazon: ['Abedul ahumado', 'Jazmín', 'Rosa'],
      fondo: ['Ámbar gris', 'Almizcle', 'Pachulí', 'Vainilla']
    },
    longevity: '10+ horas',
    sillage: 'Enorme',
    occasion: 'Oficina ejecutiva, uso diario versátil, eventos formales',
    season: ['Primavera', 'Verano', 'Otoño']
  },
  {
    id: 'jean-paul-gaultier-le-male-elixir',
    name: 'Le Male Elixir',
    house: 'Jean Paul Gaultier',
    badge: 'Exclusivo',
    category: ['all', 'disenador', 'decants', 'masculinos'],
    gender: 'Masculino',
    shortNotes: 'Miel · Tabaco · Haba Tonka',
    description: 'La cumbre de la línea Le Male. Una sobredosis de miel dorada líquida, benjuí balsámico y tabaco aromático con la firma inconfundible de lavanda y menta en su inicio.',
    image: img('le-male-elixir.jpg'),
    imageAlt: 'Jean Paul Gaultier Le Male Elixir golden torso flacon',
    fullBottlePrice: 165000,
    decant5mlPrice: 16000,
    decant10mlPrice: 29500,
    batchCode: 'JPG-LE-31401',
    concentration: 'Parfum',
    origin: 'Francia',
    pyramid: {
      salida: ['Lavanda especiada', 'Menta fresca'],
      corazon: ['Vainilla bourbon', 'Benjuí resinoso'],
      fondo: ['Miel pura', 'Haba tonka', 'Tabaco rubio']
    },
    longevity: '14+ horas',
    sillage: 'Pesada',
    occasion: 'Citas nocturnas, invierno, seducción elegante',
    season: ['Otoño', 'Invierno']
  },
  {
    id: 'aurelia-essence-d-ambre',
    name: "Aurélia Essence d'Ambre",
    house: 'Mirage Atelier',
    badge: 'Novedad',
    category: ['all', 'decants', 'unisex', 'femeninos'],
    gender: 'Unisex',
    shortNotes: 'Ámbar blanco · Higo maduro · Cedro del Líbano',
    description: 'Creación insignia del atelier. Maceración lenta de 180 días que combina la cremosidad láctea del higo mediterráneo con resinas ambarinas transparentes y maderas balsámicas.',
    image: img('hero-aurelia.jpg'),
    imageAlt: 'Aurelia Essence d Ambre botella artesanal de autor',
    fullBottlePrice: 112000,
    decant5mlPrice: 11800,
    decant10mlPrice: 21500,
    batchCode: 'MRG-AUR-2024A',
    concentration: 'Extrait de Parfum',
    origin: 'Buenos Aires / Grasse',
    pyramid: {
      salida: ['Hojas de higuera', 'Cardamomo verde', 'Bergamota'],
      corazon: ['Leche de higo', 'Iris florentino', 'Incienso blanco'],
      fondo: ['Ámbar gris suave', 'Cedro del Líbano', 'Sándalo cremoso']
    },
    longevity: '11-13 horas',
    sillage: 'Moderada',
    occasion: 'Firmas personales, momentos introspectivos, eventos culturales',
    season: ['Primavera', 'Otoño', 'Todo el año']
  },
  {
    id: 'lattafa-oud-for-glory',
    name: 'Bade\'e Al Oud (Oud for Glory)',
    house: 'Lattafa',
    badge: 'Tendencia',
    category: ['all', 'arabes', 'decants', 'unisex', 'masculinos'],
    gender: 'Unisex',
    shortNotes: 'Oud ahumado · Azafrán · Nuez moscada',
    description: 'Poderoso tributo a las maderas de agar orientales. Azafrán misterioso, lavanda y nuez moscada abren paso a una sinfonía de oud natural, pachulí terroso y almizcle oscuro.',
    image: img('bade-al-oud.jpg'),
    imageAlt: 'Badee Al Oud Lattafa frasco negro con grabados dorados',
    fullBottlePrice: 79000,
    decant5mlPrice: 8500,
    decant10mlPrice: 15500,
    batchCode: 'LT-BG-4911',
    concentration: 'Eau de Parfum',
    origin: 'Emiratos Árabes Unidos',
    pyramid: {
      salida: ['Azafrán', 'Nuez moscada', 'Lavanda'],
      corazon: ['Oud ahumado', 'Pachulí'],
      fondo: ['Oud natural', 'Pachulí oscuro', 'Almizcle']
    },
    longevity: '12+ horas',
    sillage: 'Pesada',
    occasion: 'Noche, eventos de gala, noches frías de invierno',
    season: ['Otoño', 'Invierno']
  },
  {
    id: 'al-haramain-amber-oud-gold',
    name: 'Amber Oud Gold Edition',
    house: 'Al Haramain',
    badge: 'Best Seller',
    category: ['all', 'arabes', 'decants', 'unisex', 'femeninos'],
    gender: 'Unisex',
    shortNotes: 'Melón dulce · Piña · Ámbar dorado',
    description: 'La combinación frutal tropical más adictiva de la perfumería árabe. Melón fresco y piña madura reposando sobre una base cálida y voluptuosa de ámbar dorado y vainilla.',
    image: img('amber-oud-gold.jpg'),
    imageAlt: 'Al Haramain Amber Oud Gold Edition frasco dorado pulido',
    fullBottlePrice: 125000,
    decant5mlPrice: 12900,
    decant10mlPrice: 23800,
    batchCode: 'AH-AOG-771',
    concentration: 'Eau de Parfum',
    origin: 'Emiratos Árabes Unidos',
    pyramid: {
      salida: ['Bergamota', 'Notas verdes frescas'],
      corazon: ['Melón dulce', 'Piña jugosa', 'Ámbar', 'Notas dulces'],
      fondo: ['Almizcle blanco', 'Vainilla', 'Maderas aromáticas']
    },
    longevity: '14+ horas',
    sillage: 'Enorme',
    occasion: 'Verano, tardes soleadas, citas divertidas, todo el año',
    season: ['Primavera', 'Verano', 'Todo el año']
  },
  {
    id: 'creed-aventus-millesime',
    name: 'Aventus Millésime',
    house: 'Creed',
    badge: 'Exclusivo',
    category: ['all', 'disenador', 'decants', 'masculinos'],
    gender: 'Masculino',
    shortNotes: 'Piña ahumada · Abedul · Almizcle real',
    description: 'El icono definitivo del lujo masculino. Creado en honor al emperador Napoleón, combina piña jugosa y grosella negra con el inconfundible corazón ahumado de abedul de Luisiana.',
    image: img('aventus-millesime.jpg'),
    imageAlt: 'Creed Aventus frasco histórico con jinete en relieve',
    fullBottlePrice: 420000,
    decant5mlPrice: 32000,
    decant10mlPrice: 59000,
    batchCode: 'CR-F000388',
    concentration: 'Eau de Parfum',
    origin: 'Francia',
    pyramid: {
      salida: ['Piña real', 'Bergamota italiana', 'Grosellas negras', 'Manzana verde'],
      corazon: ['Abedul ahumado', 'Pachulí noble', 'Jazmín de Marruecos', 'Rosa'],
      fondo: ['Almizcle', 'Musgo de roble', 'Ámbar gris natural', 'Vainilla']
    },
    longevity: '9-11 horas',
    sillage: 'Pesada',
    occasion: 'Reuniones de alto impacto, casamientos, status indiscutible',
    season: ['Primavera', 'Verano', 'Otoño']
  }
];

export const INSTAGRAM_PHOTOS = [
  {
    id: 'ig-1',
    src: img('ig-decant.jpg'),
    alt: 'Pipeta de vidrio dosificando decant artesanal de 5ml',
    caption: 'Proceso de decantación manual con pipeta graduada en vidrio borosilicato.'
  },
  {
    id: 'ig-2',
    src: img('amber-oud-gold.jpg'),
    alt: 'Lote nuevo de attars y perfumería árabe en frascos dorados',
    caption: 'Llegaron los nuevos lotes de Al Haramain y Lattafa. Botellas selladas de origen.'
  },
  {
    id: 'ig-3',
    src: img('ig-atelier.jpg'),
    alt: 'Bandeja de decants numerados con notas manuscritas',
    caption: 'Colección de muestras listas para despacho en cajas reforzadas con sello de cera.'
  },
  {
    id: 'ig-4',
    src: img('ig-lacrado.jpg'),
    alt: 'Sellado artesanal de paquete con lacre verde oliva',
    caption: 'Cada paquete se sella a mano con lacre botánico para garantizar su inviolabilidad.'
  },
  {
    id: 'ig-5',
    src: img('ig-notas.jpg'),
    alt: 'Granos de café arábigo, vainas de vainilla y frascos de autor',
    caption: 'Acordes de Khamrah Qahwa: café moka, canela y praliné en maceración.'
  },
  {
    id: 'ig-6',
    src: img('ig-cliente.jpg'),
    alt: 'Cliente sosteniendo decant Mirage de 10ml en ventana soleada',
    caption: 'El formato de 10ml: más de 140 atomizaciones para llevar tu firma a todos lados.'
  }
];

export const FORMAT_DETAILS = {
  '5ml': {
    name: 'Decant 5 ml',
    sprays: '~70 atomizaciones',
    duration: '2 a 3 semanas de uso diario',
    badge: 'El Descubrimiento',
    features: [
      'Frasco de vidrio grueso con atomizador fino',
      'Ideal para bolsillo, cartera o salidas de fin de semana',
      'Rinde entre 2 y 3 semanas de uso diario'
    ]
  },
  '10ml': {
    name: 'Decant 10 ml',
    sprays: '~140 atomizaciones',
    duration: 'Más de 1 mes completo',
    badge: 'Formato Favorito',
    features: [
      'Atomizador a rosca hermético antiderrame',
      'Perfecto para llevar de viaje o rotación de temporada',
      'Rinde más de 1 mes completo de aplicaciones'
    ]
  },
  'full': {
    name: 'Botella Completa',
    sprays: '~1000 atomizaciones',
    duration: 'Frasco original sellado de fábrica',
    badge: 'Pieza de Colección',
    features: [
      'Caja original sellada con celofán de origen',
      'Batch code verificable en CheckFresh',
      'Máxima presencia en tu tocador o colección'
    ]
  }
};
