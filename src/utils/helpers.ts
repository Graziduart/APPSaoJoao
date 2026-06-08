import { ImageSourcePropType, Linking, Platform, Share } from 'react-native';
import { polos } from '../data/events';

const NAVIGATION_CITY = 'Arcoverde, Pernambuco, Brasil';

export function getImageSource(image: string | number): ImageSourcePropType {
  return typeof image === 'number' ? image : { uri: image };
}

/** Evita deslocar o dia por fuso (ex.: 14/06 virar 13/06 no Brasil). */
export function parseEventDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

const WEEKDAY_SHORT_PT: Record<number, string> = {
  0: 'dom.',
  1: 'seg.',
  2: 'ter.',
  3: 'qua.',
  4: 'qui.',
  5: 'sex.',
  6: 'sáb.',
};

export const formatDate = (dateString: string): string => {
  const formatted = parseEventDate(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const formatShortDate = (dateString: string): string => {
  return parseEventDate(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });
};

/** Rótulo das abas de dia na programação (ex.: "dom. · 14/06"). */
export const formatProgramacaoChip = (dateString: string): string => {
  const date = parseEventDate(dateString);
  const weekday = WEEKDAY_SHORT_PT[date.getDay()];
  const dayMonth = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  });
  return `${weekday} · ${dayMonth}`;
};

export const getCategoryColor = (category: string): string => {
  const categoryColors: Record<string, string> = {
    restaurant: '#f97316',
    hotel: '#3b82f6',
    barraca: '#a855f7',
    Histórico: '#f59e0b',
    Natureza: '#22c55e',
    Cultural: '#a855f7',
    Temático: '#22c55e',
    'Turismo Religioso': '#eab308',
  };
  return categoryColors[category] || '#6b7280';
};

export const shareContent = async (title: string, message: string) => {
  try {
    await Share.share({ title, message });
  } catch {
    // usuário cancelou
  }
};

function findPolo(destination: string) {
  const trimmed = destination.trim();
  return polos.find(
    (item) => item.name === trimmed || item.address === trimmed,
  );
}

function resolveNavigationDestination(destination: string): string {
  const trimmed = destination.trim();
  if (!trimmed) return NAVIGATION_CITY;

  const polo = findPolo(trimmed);
  let address = polo?.address ?? trimmed;

  if (/diversos pontos/i.test(address)) {
    address = 'Centro';
  }

  if (/arcoverde/i.test(address)) {
    return /brasil/i.test(address) ? address : `${address}, Brasil`;
  }

  return `${address}, ${NAVIGATION_CITY}`;
}

function buildGoogleMapsUrl(destination: string): string {
  const polo = findPolo(destination);

  if (polo?.coordinates) {
    const { latitude, longitude } = polo.coordinates;
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }

  const query = encodeURIComponent(resolveNavigationDestination(destination));
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export const openNavigation = async (destination: string) => {
  const mapsUrl = buildGoogleMapsUrl(destination);

  try {
    await Linking.openURL(mapsUrl);
    return;
  } catch {
    // segue para fallback nativo
  }

  const query = encodeURIComponent(resolveNavigationDestination(destination));
  const nativeUrl =
    Platform.OS === 'ios'
      ? `maps:0,0?q=${query}`
      : `geo:0,0?q=${query}`;

  await Linking.openURL(nativeUrl);
};
