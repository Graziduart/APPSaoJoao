import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Show } from '../data/events';
import { Card } from './Card';
import { Badge } from './Badge';
import { colors } from '../theme/colors';
import { formatShortDate } from '../utils/helpers';

interface ShowRowCardProps {
  show: Show;
  isFavorite?: boolean;
  onPress: () => void;
  onToggleFavorite?: () => void;
}

export function ShowRowCard({
  show,
  isFavorite,
  onPress,
  onToggleFavorite,
}: ShowRowCardProps) {
  return (
    <Pressable onPress={onPress}>
      <Card>
        <View style={styles.row}>
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
                    size={22}
                    color={isFavorite ? colors.red500 : colors.gray500}
                  />
                </Pressable>
              ) : null}
            </View>
            <Badge label={show.category} style={styles.badge} />
            <View style={styles.meta}>
              <Feather name="clock" size={14} color={colors.yellow400} />
              <Text style={styles.metaText}>{show.time}</Text>
            </View>
            <View style={styles.meta}>
              <Feather name="map-pin" size={14} color={colors.orange400} />
              <Text style={styles.metaText}>{show.polo}</Text>
            </View>
            <View style={styles.meta}>
              <Feather name="calendar" size={14} color={colors.purple400} />
              <Text style={styles.metaText}>
                {formatShortDate(show.date)}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  artist: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
  },
  badge: {
    marginBottom: 2,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: colors.gray300,
    fontSize: 13,
  },
});
