import { useCallback, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { Screen } from '../components/Screen';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { shows } from '../data/events';
import { isShowFavorite, toggleShowFavorite } from '../services/storage';
import {
  formatDate,
  formatShortDate,
  openNavigation,
  shareContent,
} from '../utils/helpers';
import { colors, spacing } from '../theme/colors';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ShowDetails'>;

export function ShowDetailsScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const show = shows.find((s) => s.id === id);
  const [isFavorite, setIsFavorite] = useState(false);
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      if (show) {
        isShowFavorite(show.id).then(setIsFavorite);
      }
    }, [show]),
  );

  if (!show) {
    return (
      <View style={[styles.notFound, { paddingTop: insets.top }]}>
        <Feather name="music" size={64} color={colors.gray500} />
        <Text style={styles.notFoundText}>Show não encontrado</Text>
        <Button
          label="Voltar à Programação"
          onPress={() => navigation.goBack()}
          gradient={[colors.purple500, colors.purple900]}
        />
      </View>
    );
  }

  const relatedShows = shows
    .filter((s) => s.polo === show.polo && s.id !== show.id)
    .slice(0, 3);

  return (
    <Screen withTabBar={false} scroll>
      <View style={styles.hero}>
        <Image source={{ uri: show.image }} style={styles.heroImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.5)', colors.black]}
          style={styles.heroOverlay}
        />

        <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Feather name="arrow-left" size={22} color={colors.white} />
          </Pressable>
          <View style={styles.topActions}>
            <Pressable
              onPress={() =>
                shareContent(
                  `${show.artist} - São João Arcoverde`,
                  `${show.artist} no ${show.polo} às ${show.time}`,
                )
              }
              style={styles.iconBtn}
            >
              <Feather name="share-2" size={22} color={colors.white} />
            </Pressable>
            <Pressable
              onPress={async () => {
                await toggleShowFavorite(show.id);
                setIsFavorite((v) => !v);
              }}
              style={styles.iconBtn}
            >
              <Feather
                name="heart"
                size={22}
                color={isFavorite ? colors.red500 : colors.white}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.heroInfo}>
          <Badge label={show.category} />
          <Text style={styles.artist}>{show.artist}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Card style={styles.infoCard}>
          <InfoRow icon="calendar" color={colors.purple500} label="Data" value={formatDate(show.date)} />
          <View style={styles.divider} />
          <InfoRow icon="clock" color={colors.orange500} label="Horário" value={show.time} />
          <View style={styles.divider} />
          <InfoRow icon="map-pin" color={colors.blue400} label="Local" value={show.polo} />
        </Card>

        {show.description ? (
          <Card style={styles.descCard}>
            <Text style={styles.descTitle}>Sobre o Show</Text>
            <Text style={styles.descText}>{show.description}</Text>
          </Card>
        ) : null}

        <Button
          label="Como Chegar"
          fullWidth
          icon={<Feather name="navigation" size={20} color={colors.black} />}
          onPress={() => openNavigation(show.polo)}
        />

        {relatedShows.length > 0 ? (
          <View style={styles.related}>
            <Text style={styles.relatedTitle}>Outros shows no {show.polo}</Text>
            {relatedShows.map((related) => (
              <Pressable
                key={related.id}
                onPress={() =>
                  navigation.replace('ShowDetails', { id: related.id })
                }
              >
                <Card style={styles.relatedCard}>
                  <Image source={{ uri: related.image }} style={styles.relatedThumb} />
                  <View>
                    <Text style={styles.relatedArtist}>{related.artist}</Text>
                    <Text style={styles.relatedMeta}>
                      {formatShortDate(related.date)} • {related.time}
                    </Text>
                  </View>
                </Card>
              </Pressable>
            ))}
          </View>
        ) : null}
      </View>
    </Screen>
  );
}

function InfoRow({
  icon,
  color,
  label,
  value,
}: {
  icon: keyof typeof Feather.glyphMap;
  color: string;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={[styles.infoIcon, { backgroundColor: color }]}>
        <Feather name={icon} size={22} color={colors.white} />
      </View>
      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.black },
  hero: { height: 360, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screen,
    zIndex: 10,
  },
  topActions: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  heroInfo: {
    position: 'absolute',
    bottom: 20,
    left: spacing.screen,
    right: spacing.screen,
    gap: 8,
  },
  artist: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.white,
  },
  body: {
    paddingHorizontal: spacing.screen,
    paddingTop: 16,
    gap: 16,
  },
  infoCard: { padding: 20, gap: 16 },
  infoRow: { flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: { flex: 1 },
  infoLabel: { color: colors.gray400, fontSize: 13, marginBottom: 4 },
  infoValue: { color: colors.white, fontSize: 17, fontWeight: '600' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
  descCard: { padding: 20 },
  descTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 10,
  },
  descText: { color: colors.gray300, lineHeight: 22, fontSize: 15 },
  related: { gap: 12, marginTop: 8 },
  relatedTitle: { fontSize: 18, fontWeight: '700', color: colors.white },
  relatedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
  },
  relatedThumb: { width: 64, height: 64, borderRadius: 10 },
  relatedArtist: { color: colors.white, fontWeight: '600', fontSize: 16 },
  relatedMeta: { color: colors.gray400, fontSize: 13, marginTop: 4 },
  notFound: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: spacing.screen,
  },
  notFoundText: { color: colors.gray400, fontSize: 17 },
});
