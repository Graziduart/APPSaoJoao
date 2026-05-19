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

export interface Polo {
  id: string;
  name: string;
  address: string;
  image: string;
  showCount: number;
  description?: string;
}

export interface TouristSpot {
  id: string;
  name: string;
  description: string;
  image: string;
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
    artists: ['Festival de Quadrilhas no Sesc'],
    polo: 'Sesc Arcoverde',
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

function getCategory(artist: string): string {
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

function getDescription(artist: string, date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  const parsed = new Date(year, month - 1, day, 12, 0, 0, 0);
  const dayLabel = parsed.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });
  return `${artist} no São João de Arcoverde 2026 — ${dayLabel}.`;
}

function buildOfficialShows(): Show[] {
  const shows: Show[] = [];
  let id = 1;

  for (const day of OFFICIAL_SCHEDULE) {
    const times =
      day.artists.length >= 5
        ? TIMES_5
        : day.artists.length === 4
          ? TIMES_4
          : day.artists.length === 1
            ? ['19:00']
            : TIMES_3;

    const polo = day.polo ?? 'Polo Central';

    day.artists.forEach((artist, index) => {
      shows.push({
        id: String(id++),
        artist,
        category: getCategory(artist),
        date: day.date,
        time: times[index] ?? '21:00',
        polo,
        image: IMAGES[id % IMAGES.length],
        description: getDescription(artist, day.date),
      });
    });
  }

  return shows;
}

export const shows: Show[] = buildOfficialShows();

export const EVENT_START_DATE = '2026-06-13';
export const EVENT_END_DATE = '2026-06-28';

export const polos: Polo[] = [
  {
    id: '1',
    name: 'Polo Central',
    address: 'Praça Coronel João Queiroz, Centro',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
    showCount: shows.filter((s) => s.polo === 'Polo Central').length,
    description:
      'Palco principal do São João de Arcoverde 2026, com as maiores atrações da festa.',
  },
  {
    id: '2',
    name: 'Sesc Arcoverde',
    address: 'Sesc Arcoverde',
    image: 'https://images.unsplash.com/photo-1769971818183-cc9e7a3cfb64?w=800',
    showCount: shows.filter((s) => s.polo === 'Sesc Arcoverde').length,
    description: 'Espaço cultural com programação especial de quadrilhas juninas.',
  },
];

export const touristSpots: TouristSpot[] = [
  {
    id: '1',
    name: 'Igreja Matriz de Nossa Senhora da Conceição',
    description: 'Igreja histórica do século XIX, marco arquitetônico de Arcoverde.',
    image: 'https://images.unsplash.com/photo-1489194889484-95eac94a140f?w=800',
    category: 'Histórico',
    location: 'Centro, Arcoverde',
  },
  {
    id: '2',
    name: 'Pedra do Cachorro',
    description: 'Formação rochosa natural com vista panorâmica da cidade.',
    image: 'https://images.unsplash.com/photo-1773171033296-b1c3ec409cbe?w=800',
    category: 'Natureza',
    location: 'Zona Rural',
  },
  {
    id: '3',
    name: 'Serra das Varas',
    description: 'Complexo natural perfeito para trilhas e ecoturismo.',
    image: 'https://images.unsplash.com/photo-1773171033296-b1c3ec409cbe?w=800',
    category: 'Natureza',
    location: 'Zona Rural',
  },
  {
    id: '4',
    name: 'Mercado Público',
    description: 'Local tradicional com artesanato, comidas típicas e cultura local.',
    image: 'https://images.unsplash.com/photo-1735837131977-a1ddcc5bf86d?w=800',
    category: 'Cultural',
    location: 'Centro, Arcoverde',
  },
];

export const establishments: Establishment[] = [
  {
    id: '1',
    name: 'Restaurante Sabor Nordestino',
    category: 'restaurant',
    image: 'https://images.unsplash.com/photo-1709114107937-6dec855d9ab5?w=800',
    address: 'Rua Coronel Antônio Alves, 123',
    description: 'Comida regional autêntica com os melhores pratos da culinária sertaneja.',
  },
  {
    id: '2',
    name: 'Hotel Pousada do Sertão',
    category: 'hotel',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
    address: 'Av. Agamenon Magalhães, 456',
    description: 'Conforto e hospitalidade com decoração inspirada na cultura nordestina.',
  },
  {
    id: '3',
    name: 'Barraca do João',
    category: 'barraca',
    image: 'https://images.unsplash.com/photo-1735837131977-a1ddcc5bf86d?w=800',
    address: 'Polo Central',
    description: 'Canjica, milho cozido, pamonha e todas as delícias juninas!',
  },
  {
    id: '4',
    name: 'Restaurante Viva Nordeste',
    category: 'restaurant',
    image: 'https://images.unsplash.com/photo-1709114107937-6dec855d9ab5?w=800',
    address: 'Praça João Queiroz, 78',
    description: 'Buffet completo com variedade de pratos regionais e internacionais.',
  },
  {
    id: '5',
    name: 'Hotel Central Plaza',
    category: 'hotel',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
    address: 'Centro, Arcoverde',
    description: 'Localização privilegiada próximo aos principais polos do São João.',
  },
  {
    id: '6',
    name: 'Barraca da Maria',
    category: 'barraca',
    image: 'https://images.unsplash.com/photo-1735837131977-a1ddcc5bf86d?w=800',
    address: 'Polo Central',
    description: 'Quentão, vinho quente e cocada artesanal feita na hora!',
  },
];
