export interface Show {
  id: string;
  artist: string;
  category: string;
  date: string;
  time: string;
  polo: string;
  image: string;
  description?: string;
}

export interface PoloSubPolo {
  name: string;
  curator?: string;
}

export interface PoloCoordinates {
  latitude: number;
  longitude: number;
}

export interface Polo {
  id: string;
  name: string;
  address: string;
  image: string;
  showCount: number;
  description?: string;
  schedule?: string[];
  subPolos?: PoloSubPolo[];
  /** Coordenadas exatas para o botão Como Chegar */
  coordinates?: PoloCoordinates;
}

export interface TouristSpot {
  id: string;
  name: string;
  description: string;
  image: string | number;
  category: string;
  location: string;
}

export interface Establishment {
  id: string;
  name: string;
  category: 'restaurant' | 'hotel' | 'barraca';
  image: string;
  address: string;
  description: string;
}

export const ESTABLISHMENT_CATEGORY_LABELS: Record<
  Establishment['category'],
  string
> = {
  restaurant: 'Restaurante',
  hotel: 'Hotel',
  barraca: 'Barraca',
};

const IMAGES = [
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
  'https://images.unsplash.com/photo-1735837131977-a1ddcc5bf86d?w=800',
  'https://images.unsplash.com/photo-1769971818183-cc9e7a3cfb64?w=800',
];

/** Programação oficial — São João de Arcoverde 2026 */
const OFFICIAL_SCHEDULE: { date: string; artists: string[]; polo?: string }[] = [
  {
    date: '2026-06-13',
    artists: ['Coco das Irmãs Lopes', 'Flávio José', 'Alceu Valença'],
  },
  {
    date: '2026-06-14',
    artists: ['PV Calado', 'Junior e Jorge', 'Lipe Lucena'],
  },
  {
    date: '2026-06-15',
    artists: ['Festival de Quadrilhas'],
  },
  {
    date: '2026-06-16',
    artists: ['Juciê', 'Zé Vaqueiro', 'Nattan'],
  },
  {
    date: '2026-06-17',
    artists: ['Fernandinha', 'Eric Land', 'Vitor Fernandes'],
  },
  {
    date: '2026-06-18',
    artists: ['Maciel Kuré', 'Iguinho e Lulinha', 'Wesley Safadão'],
  },
  {
    date: '2026-06-19',
    artists: ['Dani Aguiar', 'Talita Mel', 'Priscila Senna'],
  },
  {
    date: '2026-06-20',
    artists: ['Mayana Neiva', 'Edy & Nathan', 'Fabinho Testado'],
  },
  {
    date: '2026-06-21',
    artists: [
      'Capital do Sol',
      'Ciro Santos',
      'Assisão',
      'Super Oara',
      'Felipe Amorim',
    ],
  },
  {
    date: '2026-06-22',
    artists: ['Coco Fulô do Barro', 'Geraldinho Lins', 'Garota Safada'],
  },
  {
    date: '2026-06-23',
    artists: [
      'Coco Raízes de Arcoverde',
      'George Silva',
      'Jorge de Altinho',
      'Cordel do Fogo Encantado',
    ],
  },
  {
    date: '2026-06-24',
    artists: ['João Vaqueiro', 'Magníficos', 'Xand Avião'],
  },
  {
    date: '2026-06-25',
    artists: ['Will', 'Nágylla Ferreira', 'João Gomes'],
  },
  {
    date: '2026-06-26',
    artists: ['Ycaro Andrade', 'Harry Estigado', 'Nathanzinho Lima'],
  },
  {
    date: '2026-06-27',
    artists: ['Flávio Leandro', 'Noda de Caju', 'Limão com Mel'],
  },
  {
    date: '2026-06-28',
    artists: ['Carlos e Fábio', 'Forrozão Chacal', 'Matheus & Kauan'],
  },
];

const TIMES_3 = ['20:00', '21:30', '23:00'];
const TIMES_4 = ['20:00', '21:15', '22:30', '23:45'];
const TIMES_5 = ['19:30', '20:30', '21:30', '22:30', '23:30'];
const TIMES_POLO_3 = ['16:00', '17:30', '19:00'];
const TIMES_POLO_4 = ['16:00', '17:30', '19:00', '20:30'];
const TIMES_CULTURAL = ['18:00', '19:00', '20:00', '21:00'];

const CULTURAL_POLO_ARTISTS = [
  'Polo das Artes — Henry Pereira',
  'Polo da Poesia — Elizeu Pereira',
  'Polo Pé de Serra — João Silva',
  'Polo Corredor Cultural',
];

const THEMATIC_POLO_ARTISTS = [
  'Polo do CGA — Centro de Gastronomia de Arcoverde',
  'Polo Alternativo / Multimusical — Rubens Pastor',
  'Polo da Cruz — Cruzeiro Velho',
  'Polo Moxotó — Minha Arte, Minha Vida',
];

const FESTIVAL_DATES = [
  '2026-06-13', '2026-06-14', '2026-06-15', '2026-06-16', '2026-06-17',
  '2026-06-18', '2026-06-19', '2026-06-20', '2026-06-21', '2026-06-22',
  '2026-06-23', '2026-06-24', '2026-06-25', '2026-06-26', '2026-06-27',
  '2026-06-28',
];

/** Programação dos polos além do Polo Central */
function buildPoloSchedule(): { date: string; polo: string; artists: string[]; times?: string[] }[] {
  const schedule: { date: string; polo: string; artists: string[]; times?: string[] }[] = [
    {
      polo: 'Polo Raízes do Coco',
      date: '2026-06-19',
      artists: ["En'cantos do Coco", 'Coco Irmãs Lopes', 'Josildo Sá'],
      times: TIMES_POLO_3,
    },
    {
      polo: 'Polo Raízes do Coco',
      date: '2026-06-20',
      artists: ['Valdinho Paes', 'Samba de Coco Raízes', 'Maciel Melo', 'Almério'],
      times: TIMES_POLO_4,
    },
    {
      polo: 'Polo Raízes do Coco',
      date: '2026-06-21',
      artists: ['Samba de Coco Eremim', 'Samba de Coco Trupé', "Samba de Coco d'Malandro"],
      times: TIMES_POLO_3,
    },
    {
      polo: 'Polo Raízes do Coco',
      date: '2026-06-22',
      artists: ['Samba de Coco Eremim', 'Samba de Coco Trupé', "Samba de Coco d'Malandro"],
      times: TIMES_POLO_3,
    },
    {
      polo: 'Polo Raízes do Coco',
      date: '2026-06-23',
      artists: ['Samba de Coco Eremim', 'Samba de Coco Trupé', "Samba de Coco d'Malandro"],
      times: TIMES_POLO_3,
    },
  ];

  for (const date of FESTIVAL_DATES) {
    schedule.push({
      polo: 'Polos Culturais e de Arte',
      date,
      artists: CULTURAL_POLO_ARTISTS,
      times: TIMES_CULTURAL,
    });
    schedule.push({
      polo: 'Polos Temáticos e Gastronômicos',
      date,
      artists: THEMATIC_POLO_ARTISTS,
      times: TIMES_CULTURAL,
    });
  }

  return schedule;
}

function getCategory(artist: string, polo?: string): string {
  if (polo === 'Polos Culturais e de Arte') return 'Cultural';
  if (polo === 'Polos Temáticos e Gastronômicos') return 'Temático';
  const name = artist.toLowerCase();
  if (name.includes('coco') || name.includes('fulô')) return 'Coco';
  if (name.includes('quadrilha')) return 'Quadrilha';
  if (
    name.includes('alceu') ||
    name.includes('cordel') ||
    name.includes('flávio josé') ||
    name.includes('flavio jose')
  ) {
    return 'MPB / Forró';
  }
  if (name.includes('forrozão') || name.includes('forrozao')) return 'Forró';
  return 'São João';
}

function getDescription(artist: string, date: string, polo?: string): string {
  const [year, month, day] = date.split('-').map(Number);
  const parsed = new Date(year, month - 1, day, 12, 0, 0, 0);
  const dayLabel = parsed.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });
  if (polo && polo !== 'Polo Central') {
    return `${artist} no ${polo} — São João de Arcoverde 2026, ${dayLabel}.`;
  }
  return `${artist} no São João de Arcoverde 2026 — ${dayLabel}.`;
}

function buildShowsFromSchedule(
  schedule: { date: string; artists: string[]; polo?: string; times?: string[] }[],
  startId: number,
): Show[] {
  const shows: Show[] = [];
  let id = startId;

  for (const day of schedule) {
    const times =
      day.times ??
      (day.artists.length >= 5
        ? TIMES_5
        : day.artists.length === 4
          ? TIMES_4
          : TIMES_3);

    const polo = day.polo ?? 'Polo Central';

    day.artists.forEach((artist, index) => {
      shows.push({
        id: String(id++),
        artist,
        category: getCategory(artist, polo),
        date: day.date,
        time: times[index] ?? '21:00',
        polo,
        image: IMAGES[id % IMAGES.length],
        description: getDescription(artist, day.date, polo),
      });
    });
  }

  return shows;
}

function buildAllShows(): Show[] {
  const centralShows = buildShowsFromSchedule(OFFICIAL_SCHEDULE, 1);
  const nextId = centralShows.length + 1;
  const poloShows = buildShowsFromSchedule(buildPoloSchedule(), nextId);
  return [...centralShows, ...poloShows];
}

export const shows: Show[] = buildAllShows();

export const EVENT_START_DATE = '2026-06-13';
export const EVENT_END_DATE = '2026-06-28';

export const polos: Polo[] = [
  {
    id: '1',
    name: 'Polo Central',
    address: 'Praça Coronel João Queiroz, Centro, Arcoverde - PE',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
    showCount: shows.filter((s) => s.polo === 'Polo Central').length,
    description:
      'Palco principal do São João de Arcoverde 2026, com as maiores atrações da festa.',
  },
  {
    id: '2',
    name: 'Polo Raízes do Coco',
    address: 'R. Davi Liberiano de Souza, Alto do Cruzeiro, Arcoverde - PE',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
    showCount: shows.filter((s) => s.polo === 'Polo Raízes do Coco').length,
    coordinates: { latitude: -8.4176445, longitude: -37.0585205 },
    description:
      'Focado na tradição do Samba de Coco e manifestações culturais, com destaque para grupos e artistas que mantêm viva a identidade arcoverdense.',
    schedule: [
      '19/06: En\'cantos do Coco, Coco Irmãs Lopes, Josildo Sá',
      '20/06: Valdinho Paes, Samba de Coco Raízes, Maciel Melo, Almério',
      '21 a 23/06: Samba de Coco Eremim, Trupé e d\'Malandro',
    ],
  },
  {
    id: '3',
    name: 'Polos Culturais e de Arte',
    address: 'Praça Winston Siqueira, Arcoverde - PE',
    image: 'https://images.unsplash.com/photo-1735837131977-a1ddcc5bf86d?w=800',
    showCount: shows.filter((s) => s.polo === 'Polos Culturais e de Arte').length,
    description:
      'Conjunto de polos dedicados às artes, à poesia, ao forró pé de serra e ao corredor cultural da festa.',
    subPolos: [
      { name: 'Polo das Artes', curator: 'Henry Pereira' },
      { name: 'Polo da Poesia', curator: 'Elizeu Pereira' },
      { name: 'Polo Pé de Serra', curator: 'João Silva' },
      { name: 'Polo Corredor Cultural' },
    ],
  },
  {
    id: '4',
    name: 'Polos Temáticos e Gastronômicos',
    address: 'Centro, Arcoverde - PE',
    image: 'https://images.unsplash.com/photo-1709114107937-6dec855d9ab5?w=800',
    showCount: shows.filter((s) => s.polo === 'Polos Temáticos e Gastronômicos').length,
    description:
      'Espaços temáticos que reúnem gastronomia, música alternativa, tradição religiosa e manifestações populares.',
    subPolos: [
      {
        name: 'Polo do CGA',
        curator: 'Centro de Gastronomia de Arcoverde',
      },
      { name: 'Polo Alternativo / Multimusical', curator: 'Rubens Pastor' },
      { name: 'Polo da Cruz', curator: 'Cruzeiro Velho' },
      { name: 'Polo Moxotó', curator: 'Minha Arte, Minha Vida' },
    ],
  },
];

export const touristSpots: TouristSpot[] = [
  {
    id: '1',
    name: 'Paróquia Nossa Senhora do Livramento',
    description:
      'Localizada bem no centro urbano, a igreja matriz dedicada à padroeira da cidade possui uma arquitetura imponente e histórica, marcando as primeiras origens do povoamento da região.',
    image: require('../../assets/igreja-matriz.png'),
    category: 'Turismo Religioso',
    location: 'Centro, Arcoverde - PE',
  },
  {
    id: '3',
    name: 'Terra da Misericórdia (CEDEC)',
    description:
      'Localizado na região rural da Serra das Varas, a Terra da Misericórdia é um imenso santuário ecológico e religioso. O espaço atrai milhares de fiéis em busca de retiros espirituais, trilhas meditativas e momentos de paz em meio a uma natureza preservada e acolhedora.',
    image: require('../../assets/terra-da-misericordia.png'),
    category: 'Turismo Religioso',
    location: 'Serra das Varas, Arcoverde - PE',
  },
  {
    id: '2',
    name: 'Alto do Cruzeiro (Cruzeiro Novo)',
    description:
      'Este mirante proporciona a vista panorâmica mais famosa de Arcoverde. Além de apreciar o visual de toda a cidade, o visitante encontra no topo o epicentro da comunidade do Samba de Coco, onde a tradição do trupé e dos tamancos de madeira permanece viva.',
    image: require('../../assets/alto-do-cruzeiro.png'),
    category: 'Cultural',
    location: 'Alto do Cruzeiro, Arcoverde - PE',
  },
];

export const establishments: Establishment[] = [
  {
    id: '1',
    name: 'Restaurante Sabor Nordestino',
    category: 'restaurant',
    image: 'https://images.unsplash.com/photo-1709114107937-6dec855d9ab5?w=800',
    address: 'Rua Coronel Antônio Alves, 123, Arcoverde - PE',
    description: 'Comida regional autêntica com os melhores pratos da culinária sertaneja.',
  },
  {
    id: '2',
    name: 'Hotel Pousada do Sertão',
    category: 'hotel',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
    address: 'Av. Agamenon Magalhães, 456, Arcoverde - PE',
    description: 'Conforto e hospitalidade com decoração inspirada na cultura nordestina.',
  },
  {
    id: '3',
    name: 'Barraca do João',
    category: 'barraca',
    image: 'https://images.unsplash.com/photo-1735837131977-a1ddcc5bf86d?w=800',
    address: 'Praça Coronel João Queiroz, Polo Central, Arcoverde - PE',
    description: 'Canjica, milho cozido, pamonha e todas as delícias juninas!',
  },
  {
    id: '4',
    name: 'Restaurante Viva Nordeste',
    category: 'restaurant',
    image: 'https://images.unsplash.com/photo-1709114107937-6dec855d9ab5?w=800',
    address: 'Praça João Queiroz, 78, Arcoverde - PE',
    description: 'Buffet completo com variedade de pratos regionais e internacionais.',
  },
  {
    id: '5',
    name: 'Hotel Central Plaza',
    category: 'hotel',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
    address: 'Centro, Arcoverde - PE',
    description: 'Localização privilegiada próximo aos principais polos do São João.',
  },
  {
    id: '6',
    name: 'Barraca da Maria',
    category: 'barraca',
    image: 'https://images.unsplash.com/photo-1735837131977-a1ddcc5bf86d?w=800',
    address: 'Praça Coronel João Queiroz, Polo Central, Arcoverde - PE',
    description: 'Quentão, vinho quente e cocada artesanal feita na hora!',
  },
];
