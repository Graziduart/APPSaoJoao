import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'sao_joao_favorites';

export interface Favorites {
  shows: string[];
  places: string[];
}

export async function getFavorites(): Promise<Favorites> {
  try {
    const stored = await AsyncStorage.getItem(FAVORITES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading favorites:', error);
  }
  return { shows: [], places: [] };
}

async function saveFavorites(favorites: Favorites): Promise<void> {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
}

export async function toggleShowFavorite(showId: string): Promise<boolean> {
  const favorites = await getFavorites();
  const index = favorites.shows.indexOf(showId);

  if (index > -1) {
    favorites.shows.splice(index, 1);
    await saveFavorites(favorites);
    return false;
  }

  favorites.shows.push(showId);
  await saveFavorites(favorites);
  return true;
}

export async function togglePlaceFavorite(placeId: string): Promise<boolean> {
  const favorites = await getFavorites();
  const index = favorites.places.indexOf(placeId);

  if (index > -1) {
    favorites.places.splice(index, 1);
    await saveFavorites(favorites);
    return false;
  }

  favorites.places.push(placeId);
  await saveFavorites(favorites);
  return true;
}

export async function isShowFavorite(showId: string): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.shows.includes(showId);
}

export async function isPlaceFavorite(placeId: string): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.places.includes(placeId);
}
