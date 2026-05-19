import { Linking, Platform, Share } from 'react-native';

/** Evita deslocar o dia por fuso (ex.: 14/06 virar 13/06 no Brasil). */
export function parseEventDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

export const formatDate = (dateString: string): string => {
  return parseEventDate(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  });
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
  const weekday = date.toLocaleDateString('pt-BR', { weekday: 'short' });
  const dayMonth = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  });
  return `${weekday} · ${dayMonth}`;
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    restaurant: '#f97316',
    hotel: '#3b82f6',
    barraca: '#a855f7',
    Histórico: '#f59e0b',
    Natureza: '#22c55e',
    Cultural: '#a855f7',
  };
  return colors[category] || '#6b7280';
};

export const shareContent = async (title: string, message: string) => {
  try {
    await Share.share({ title, message });
  } catch {
    // usuário cancelou
  }
};

export const openNavigation = async (destination: string) => {
  const query = encodeURIComponent(destination);
  const url =
    Platform.OS === 'ios'
      ? `maps:0,0?q=${query}`
      : `geo:0,0?q=${query}`;

  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
    return;
  }

  await Linking.openURL(
    `https://www.google.com/maps/search/?api=1&query=${query}`,
  );
};
