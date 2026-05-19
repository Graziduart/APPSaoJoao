import { useCallback, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../components/Screen';
import { ScreenHeader } from '../components/ScreenHeader';
import { FilterChips } from '../components/FilterChips';
import { ShowRowCard } from '../components/ShowRowCard';
import { Card } from '../components/Card';
import { shows, EVENT_START_DATE } from '../data/events';
import { isShowFavorite, toggleShowFavorite } from '../services/storage';
import { colors, spacing } from '../theme/colors';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { formatDate, formatProgramacaoChip } from '../utils/helpers';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Programacao'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function ProgramacaoScreen({ navigation }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPolo, setSelectedPolo] = useState('all');
  const [selectedDate, setSelectedDate] = useState(EVENT_START_DATE);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const showsByDate = useMemo(() => {
    return shows.reduce<Record<string, typeof shows>>((acc, show) => {
      if (!acc[show.date]) acc[show.date] = [];
      acc[show.date].push(show);
      return acc;
    }, {});
  }, []);

  const dates = useMemo(() => Object.keys(showsByDate).sort(), [showsByDate]);

  const poloChips = useMemo(
    () => [
      { value: 'all', label: 'Todos os Polos' },
      ...Array.from(new Set(shows.map((s) => s.polo))).map((polo) => ({
        value: polo,
        label: polo,
      })),
    ],
    [],
  );

  const dateChips = useMemo(
    () =>
      dates.map((date) => ({
        value: date,
        label: formatProgramacaoChip(date),
      })),
    [dates],
  );

  const selectedDayTitle = useMemo(
    () => formatDate(selectedDate),
    [selectedDate],
  );

  const filteredShows = useMemo(() => {
    const list = showsByDate[selectedDate] ?? [];
    return list
      .filter((show) => {
        const matchesSearch =
          show.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
          show.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPolo = selectedPolo === 'all' || show.polo === selectedPolo;
        return matchesSearch && matchesPolo;
      })
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [showsByDate, selectedDate, searchTerm, selectedPolo]);

  const refreshFavorites = useCallback(async () => {
    const ids = new Set<string>();
    await Promise.all(
      shows.map(async (show) => {
        if (await isShowFavorite(show.id)) ids.add(show.id);
      }),
    );
    setFavoriteIds(ids);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshFavorites();
    }, [refreshFavorites]),
  );

  const handleToggleFavorite = async (showId: string) => {
    await toggleShowFavorite(showId);
    await refreshFavorites();
  };

  return (
    <View style={styles.root}>
      <ScreenHeader
        title="Programação"
        colors={['#9333ea', '#581c87']}
        icon={<Feather name="music" size={32} color={colors.yellow400} />}
      >
        <View style={styles.searchBox}>
          <Feather name="search" size={20} color={colors.gray500} style={styles.searchIcon} />
          <TextInput
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Buscar artista ou categoria..."
            placeholderTextColor={colors.gray500}
            style={styles.searchInput}
          />
        </View>
        <FilterChips
          chips={poloChips}
          selected={selectedPolo}
          onSelect={setSelectedPolo}
        />
      </ScreenHeader>

      <Screen withTabBar contentStyle={styles.content}>
        <FilterChips
          chips={dateChips}
          selected={selectedDate}
          onSelect={setSelectedDate}
        />

        <Text style={styles.dayTitle}>{selectedDayTitle}</Text>

        <View style={styles.list}>
          {filteredShows.length === 0 ? (
            <Card style={styles.empty}>
              <Feather name="music" size={48} color={colors.gray500} />
              <Text style={styles.emptyText}>Nenhum show encontrado</Text>
            </Card>
          ) : (
            filteredShows.map((show) => (
              <ShowRowCard
                key={show.id}
                show={show}
                isFavorite={favoriteIds.has(show.id)}
                onPress={() =>
                  navigation.navigate('ShowDetails', { id: show.id })
                }
                onToggleFavorite={() => handleToggleFavorite(show.id)}
              />
            ))
          )}
        </View>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  content: {
    paddingHorizontal: spacing.screen,
    paddingTop: 16,
    gap: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 12,
    marginTop: 8,
  },
  searchIcon: {
    marginLeft: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: colors.white,
    fontSize: 15,
  },
  dayTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
    marginTop: 4,
  },
  list: {
    gap: 12,
    marginTop: 8,
  },
  empty: {
    alignItems: 'center',
    padding: 32,
    gap: 12,
  },
  emptyText: {
    color: colors.gray400,
    fontSize: 16,
  },
});
