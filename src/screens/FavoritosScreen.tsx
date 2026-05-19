import { useCallback, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen } from '../components/Screen';
import { ScreenHeader } from '../components/ScreenHeader';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { shows, touristSpots } from '../data/events';
import {
  getFavorites,
  toggleShowFavorite,
  togglePlaceFavorite,
} from '../services/storage';
import { colors, spacing } from '../theme/colors';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { formatShortDate } from '../utils/helpers';

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Favoritos'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export function FavoritosScreen() {
  const navigation = useNavigation<Nav>();
  const [tab, setTab] = useState<'shows' | 'places'>('shows');
  const [favoriteShowIds, setFavoriteShowIds] = useState<string[]>([]);
  const [favoritePlaceIds, setFavoritePlaceIds] = useState<string[]>([]);

  const loadFavorites = useCallback(async () => {
    const fav = await getFavorites();
    setFavoriteShowIds(fav.shows);
    setFavoritePlaceIds(fav.places);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites]),
  );

  const favoriteShows = shows.filter((s) => favoriteShowIds.includes(s.id));
  const favoritePlaces = touristSpots.filter((p) =>
    favoritePlaceIds.includes(p.id),
  );

  return (
    <View style={styles.root}>
      <ScreenHeader
        title="Favoritos"
        subtitle="Seus shows e lugares salvos"
        colors={['#dc2626', '#db2777']}
        icon={<Feather name="heart" size={32} color={colors.white} />}
      />

      <View style={styles.tabs}>
        <Pressable
          onPress={() => setTab('shows')}
          style={[styles.tab, tab === 'shows' && styles.tabActive]}
        >
          <Feather name="music" size={16} color={tab === 'shows' ? colors.white : colors.gray400} />
          <Text style={[styles.tabText, tab === 'shows' && styles.tabTextActive]}>
            Shows ({favoriteShows.length})
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setTab('places')}
          style={[styles.tab, tab === 'places' && styles.tabActive]}
        >
          <Feather name="compass" size={16} color={tab === 'places' ? colors.white : colors.gray400} />
          <Text style={[styles.tabText, tab === 'places' && styles.tabTextActive]}>
            Lugares ({favoritePlaces.length})
          </Text>
        </Pressable>
      </View>

      <Screen withTabBar contentStyle={styles.content}>
        {tab === 'shows' ? (
          favoriteShows.length === 0 ? (
            <EmptyState icon="music" message="Você ainda não favoritou nenhum show" />
          ) : (
            favoriteShows.map((show) => (
              <Card key={show.id}>
                <View style={styles.showRow}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('ShowDetails', { id: show.id })
                    }
                  >
                    <Image source={{ uri: show.image }} style={styles.showThumb} />
                  </Pressable>
                  <View style={styles.showInfo}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('ShowDetails', { id: show.id })
                      }
                    >
                      <Text style={styles.showArtist}>{show.artist}</Text>
                    </Pressable>
                    <Badge label={show.category} />
                    <Text style={styles.showMeta}>
                      {formatShortDate(show.date)} • {show.time}
                    </Text>
                    <Text style={styles.showMeta}>{show.polo}</Text>
                  </View>
                  <Pressable
                    onPress={async () => {
                      await toggleShowFavorite(show.id);
                      await loadFavorites();
                    }}
                    style={styles.removeBtn}
                  >
                    <Feather name="trash-2" size={20} color={colors.red400} />
                  </Pressable>
                </View>
              </Card>
            ))
          )
        ) : favoritePlaces.length === 0 ? (
          <EmptyState icon="compass" message="Você ainda não favoritou nenhum lugar" />
        ) : (
          favoritePlaces.map((place) => (
            <Card key={place.id}>
              <Image source={{ uri: place.image }} style={styles.placeImage} />
              <Pressable
                onPress={async () => {
                  await togglePlaceFavorite(place.id);
                  await loadFavorites();
                }}
                style={styles.placeHeart}
              >
                <Feather name="heart" size={22} color={colors.red500} />
              </Pressable>
              <View style={styles.placeBody}>
                <Badge label={place.category} color={colors.blue400} />
                <Text style={styles.placeName}>{place.name}</Text>
                <Text style={styles.placeLocation}>{place.location}</Text>
                <Text style={styles.placeDesc} numberOfLines={2}>
                  {place.description}
                </Text>
              </View>
            </Card>
          ))
        )}

        {(favoriteShows.length > 0 || favoritePlaces.length > 0) && (
          <Card style={styles.savedTip}>
            <Feather name="heart" size={20} color={colors.red400} />
            <View style={styles.savedTipText}>
              <Text style={styles.savedTitle}>Seus favoritos estão salvos</Text>
              <Text style={styles.savedBody}>
                Os favoritos ficam salvos no seu celular, mesmo offline!
              </Text>
            </View>
          </Card>
        )}
      </Screen>
    </View>
  );
}

function EmptyState({
  icon,
  message,
}: {
  icon: keyof typeof Feather.glyphMap;
  message: string;
}) {
  return (
    <Card style={styles.empty}>
      <Feather name={icon} size={56} color={colors.gray500} />
      <Text style={styles.emptyText}>{message}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.black },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: spacing.screen,
    marginTop: -8,
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  tabActive: {
    backgroundColor: colors.red500,
  },
  tabText: {
    color: colors.gray400,
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.white,
  },
  content: {
    paddingHorizontal: spacing.screen,
    paddingTop: 16,
    gap: 12,
  },
  showRow: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    alignItems: 'flex-start',
  },
  showThumb: {
    width: 96,
    height: 96,
    borderRadius: 12,
  },
  showInfo: { flex: 1, gap: 6 },
  showArtist: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
  },
  showMeta: { color: colors.gray300, fontSize: 13 },
  removeBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    padding: 10,
    borderRadius: 10,
  },
  placeImage: { width: '100%', height: 160 },
  placeHeart: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 24,
  },
  placeBody: { padding: 16, gap: 8 },
  placeName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  placeLocation: { color: colors.gray300, fontSize: 13 },
  placeDesc: { color: colors.gray400, fontSize: 13, lineHeight: 18 },
  empty: {
    alignItems: 'center',
    padding: 40,
    gap: 12,
  },
  emptyText: {
    color: colors.gray400,
    fontSize: 16,
    textAlign: 'center',
  },
  savedTip: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    marginTop: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  savedTipText: { flex: 1 },
  savedTitle: {
    color: colors.white,
    fontWeight: '700',
    marginBottom: 4,
  },
  savedBody: {
    color: colors.gray300,
    fontSize: 13,
    lineHeight: 18,
  },
});
