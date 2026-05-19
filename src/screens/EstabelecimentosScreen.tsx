import { useMemo, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { ScreenHeader } from '../components/ScreenHeader';
import { FilterChips } from '../components/FilterChips';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import {
  establishments,
  ESTABLISHMENT_CATEGORY_LABELS,
} from '../data/events';
import { colors, spacing } from '../theme/colors';

const CATEGORY_ICONS: Record<string, string> = {
  restaurant: '🍽️',
  hotel: '🏨',
  barraca: '🎪',
};

const CATEGORY_COLORS: Record<string, string> = {
  restaurant: colors.orange500,
  hotel: colors.blue400,
  barraca: colors.purple500,
};

export function EstabelecimentosScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(
    () => [
      { value: 'all', label: 'Todos' },
      { value: 'restaurant', label: 'Restaurantes' },
      { value: 'hotel', label: 'Hotéis' },
      { value: 'barraca', label: 'Barracas' },
    ],
    [],
  );

  const filtered = useMemo(
    () =>
      selectedCategory === 'all'
        ? establishments
        : establishments.filter((e) => e.category === selectedCategory),
    [selectedCategory],
  );

  return (
    <View style={styles.root}>
      <ScreenHeader
        title="Estabelecimentos"
        subtitle="Restaurantes, hotéis e barracas típicas"
        colors={['#ca8a04', '#ea580c']}
        icon={<Feather name="shopping-bag" size={32} color={colors.white} />}
      >
        <FilterChips
          chips={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </ScreenHeader>

      <Screen withTabBar contentStyle={styles.content}>
        {filtered.map((item) => (
          <Card key={item.id}>
            <View style={styles.row}>
              <View>
                <Image source={{ uri: item.image }} style={styles.thumb} />
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: CATEGORY_COLORS[item.category] },
                  ]}
                >
                  <Text style={styles.emoji}>
                    {CATEGORY_ICONS[item.category]}
                  </Text>
                </View>
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Badge
                  label={ESTABLISHMENT_CATEGORY_LABELS[item.category]}
                  color={CATEGORY_COLORS[item.category]}
                />
                <View style={styles.addressRow}>
                  <Feather name="map-pin" size={14} color={colors.yellow400} />
                  <Text style={styles.address} numberOfLines={2}>
                    {item.address}
                  </Text>
                </View>
                <Text style={styles.desc} numberOfLines={3}>
                  {item.description}
                </Text>
              </View>
            </View>
          </Card>
        ))}

        <Card style={styles.tip}>
          <Text style={styles.tipEmoji}>💡</Text>
          <View style={styles.tipText}>
            <Text style={styles.tipTitle}>Dica</Text>
            <Text style={styles.tipBody}>
              Reserve com antecedência! O São João é o período de maior movimento na cidade.
            </Text>
          </View>
        </Card>
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
  row: {
    flexDirection: 'row',
    gap: 14,
    padding: 14,
  },
  thumb: {
    width: 110,
    height: 110,
    borderRadius: 12,
  },
  categoryIcon: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 16 },
  info: { flex: 1, gap: 8 },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
  },
  addressRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'flex-start',
  },
  address: {
    flex: 1,
    color: colors.gray300,
    fontSize: 13,
  },
  desc: {
    color: colors.gray400,
    fontSize: 12,
    lineHeight: 18,
  },
  tip: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    backgroundColor: 'rgba(234, 179, 8, 0.15)',
    borderColor: 'rgba(234, 179, 8, 0.3)',
  },
  tipEmoji: { fontSize: 24 },
  tipText: { flex: 1 },
  tipTitle: {
    color: colors.white,
    fontWeight: '700',
    marginBottom: 4,
  },
  tipBody: {
    color: colors.gray300,
    fontSize: 13,
    lineHeight: 18,
  },
});
