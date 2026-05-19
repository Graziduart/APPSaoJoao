import { useCallback, useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Screen } from '../components/Screen';
import { ScreenHeader } from '../components/ScreenHeader';
import { FilterChips } from '../components/FilterChips';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { touristSpots } from '../data/events';
import { isPlaceFavorite, togglePlaceFavorite } from '../services/storage';
import { getCategoryColor, openNavigation } from '../utils/helpers';
import { colors, spacing } from '../theme/colors';

export function TuristicoScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const categories = useMemo(
    () => [
      { value: 'all', label: 'Todos' },
      ...Array.from(new Set(touristSpots.map((s) => s.category))).map((c) => ({
        value: c,
        label: c,
      })),
    ],
    [],
  );

  const filteredSpots = useMemo(
    () =>
      selectedCategory === 'all'
        ? touristSpots
        : touristSpots.filter((s) => s.category === selectedCategory),
    [selectedCategory],
  );

  const refreshFavorites = useCallback(async () => {
    const ids = new Set<string>();
    await Promise.all(
      touristSpots.map(async (spot) => {
        if (await isPlaceFavorite(spot.id)) ids.add(spot.id);
      }),
    );
    setFavoriteIds(ids);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshFavorites();
    }, [refreshFavorites]),
  );

  return (
    <View style={styles.root}>
      <ScreenHeader
        title="Pontos Turísticos"
        subtitle="Conheça as belezas de Arcoverde"
        colors={['#2563eb', '#0891b2']}
        icon={<Feather name="compass" size={32} color={colors.yellow400} />}
      >
        <FilterChips
          chips={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </ScreenHeader>

      <Screen withTabBar contentStyle={styles.content}>
        {filteredSpots.map((spot) => {
          const isFav = favoriteIds.has(spot.id);
          return (
            <Card key={spot.id}>
              <View style={styles.imageWrap}>
                <Image source={{ uri: spot.image }} style={styles.image} />
                <View style={styles.imageTop}>
                  <Badge label={spot.category} color={getCategoryColor(spot.category)} />
                  <Pressable
                    onPress={async () => {
                      await togglePlaceFavorite(spot.id);
                      await refreshFavorites();
                    }}
                    style={styles.heartBtn}
                  >
                    <Feather
                      name="heart"
                      size={22}
                      color={isFav ? colors.red500 : colors.white}
                    />
                  </Pressable>
                </View>
                <Text style={styles.spotName}>{spot.name}</Text>
              </View>
              <View style={styles.details}>
                <View style={styles.locationRow}>
                  <Feather name="map-pin" size={16} color={colors.cyan400} />
                  <Text style={styles.location}>{spot.location}</Text>
                </View>
                <Text style={styles.desc}>{spot.description}</Text>
                <Button
                  label="Como chegar"
                  fullWidth
                  gradient={[colors.blue400, colors.cyan400]}
                  textStyle={{ color: colors.white }}
                  onPress={() => openNavigation(spot.location)}
                />
              </View>
            </Card>
          );
        })}
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.black },
  content: {
    paddingHorizontal: spacing.screen,
    paddingTop: 16,
    gap: 16,
  },
  imageWrap: { position: 'relative' },
  image: { width: '100%', height: 200 },
  imageTop: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heartBtn: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 24,
  },
  spotName: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    fontSize: 20,
    fontWeight: '800',
    color: colors.white,
  },
  details: { padding: 16, gap: 12 },
  locationRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  location: { flex: 1, color: colors.gray300, fontSize: 14 },
  desc: { color: colors.gray400, fontSize: 14, lineHeight: 20 },
});
