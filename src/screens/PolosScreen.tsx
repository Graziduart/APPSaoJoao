import { Image, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Screen } from '../components/Screen';
import { ScreenHeader } from '../components/ScreenHeader';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { polos } from '../data/events';
import { openNavigation } from '../utils/helpers';
import { colors, spacing } from '../theme/colors';

export function PolosScreen() {
  return (
    <View style={styles.root}>
      <ScreenHeader
        title="Polos do Evento"
        subtitle="Descubra os polos espalhados pela cidade"
        colors={['#ea580c', '#b91c1c']}
        icon={<Feather name="map-pin" size={32} color={colors.yellow400} />}
      />
      <Screen withTabBar contentStyle={styles.content}>
        {polos.map((polo) => (
          <Card key={polo.id}>
            <Image source={{ uri: polo.image }} style={styles.image} />
            <View style={styles.badgeWrap}>
              <Badge
                label={`${polo.showCount} shows`}
                color={colors.orange500}
              />
            </View>
            <View style={styles.details}>
              <Text style={styles.name}>{polo.name}</Text>
              <View style={styles.addressRow}>
                <Feather name="map-pin" size={18} color={colors.orange400} />
                <Text style={styles.address}>{polo.address}</Text>
              </View>
              {polo.description ? (
                <Text style={styles.desc}>{polo.description}</Text>
              ) : null}
              <Button
                label="Como Chegar"
                fullWidth
                gradient={[colors.orange500, colors.red500]}
                icon={<Feather name="navigation" size={18} color={colors.white} />}
                textStyle={{ color: colors.white }}
                onPress={() => openNavigation(polo.address)}
              />
            </View>
          </Card>
        ))}
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
  image: {
    width: '100%',
    height: 180,
  },
  badgeWrap: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  details: {
    padding: 16,
    gap: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.white,
  },
  addressRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  address: {
    flex: 1,
    color: colors.gray300,
    fontSize: 14,
    lineHeight: 20,
  },
  desc: {
    color: colors.gray400,
    fontSize: 14,
    lineHeight: 20,
  },
});
