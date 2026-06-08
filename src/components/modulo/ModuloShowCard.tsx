import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Show } from '../../data/events';
import { Badge } from '../Badge';
import { colors, modulo } from '../../theme/colors';
import { formatShortDate, getCategoryColor } from '../../utils/helpers';

interface ModuloShowCardProps {
  show: Show;
  isFavorite?: boolean;
  onPress: () => void;
  onToggleFavorite?: () => void;
}

export function ModuloShowCard({
  show,
  isFavorite,
  onPress,
  onToggleFavorite,
}: ModuloShowCardProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <Image source={{ uri: show.image }} style={styles.image} />
        <View style={styles.info}>
          <View style={styles.header}>
            <Text style={styles.artist} numberOfLines={2}>
              {show.artist}
            </Text>
            {onToggleFavorite ? (
              <Pressable onPress={onToggleFavorite} hitSlop={12}>
                <Feather
                  name="heart"
                  size={20}
                  color={modulo.accent}
                  style={!isFavorite ? styles.heartOutline : undefined}
                />
              </Pressable>
            ) : null}
          </View>
          <Badge
            label={show.category}
            color={getCategoryColor(show.category)}
            style={styles.badge}
          />
          <View style={styles.meta}>
            <Feather name="clock" size={13} color={modulo.accent} />
            <Text style={styles.metaText}>{show.time}</Text>
          </View>
          <View style={styles.meta}>
            <Feather name="map-pin" size={13} color={modulo.accent} />
            <Text style={styles.metaText} numberOfLines={2}>
              {show.polo}
            </Text>
          </View>
          <View style={styles.meta}>
            <Feather name="calendar" size={13} color={modulo.accent} />
            <Text style={styles.metaText}>{formatShortDate(show.date)}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: modulo.cardBg,
    borderWidth: 1.5,
    borderColor: modulo.cardBorder,
  },
  image: { width: 96, height: 96, borderRadius: 12 },
  info: { flex: 1, gap: 5 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  artist: {
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
    color: colors.white,
    lineHeight: 20,
  },
  heartOutline: { opacity: 0.85 },
  badge: { marginBottom: 1 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { flex: 1, color: colors.gray300, fontSize: 12 },
});
