import { StyleSheet, View } from 'react-native';
import { junina } from '../theme/colors';

const BUNTING_COLORS = [
  junina.yellow,
  junina.red,
  junina.orange,
  junina.yellow,
  junina.red,
  junina.orange,
  junina.yellow,
  junina.red,
  junina.orange,
  junina.yellow,
  junina.red,
  junina.orange,
];

const BALLOON_COLORS = [junina.yellow, junina.red, junina.orange];

export function FestiveHeaderDecor() {
  return (
    <View style={styles.wrap}>
      <View style={styles.balloonRow}>
        {BALLOON_COLORS.map((color, index) => (
          <View key={color + index} style={styles.balloonCol}>
            <View style={[styles.balloon, { backgroundColor: color }]} />
            <View style={styles.balloonString} />
          </View>
        ))}
      </View>

      <View style={styles.stringLine} />

      <View style={styles.buntingRow}>
        {BUNTING_COLORS.map((color, index) => (
          <View key={index} style={styles.pennantCol}>
            <View
              style={[
                styles.pennant,
                {
                  borderBottomColor: color,
                },
              ]}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 14,
    gap: 4,
  },
  balloonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: 10,
    paddingRight: 4,
    minHeight: 28,
  },
  balloonCol: {
    alignItems: 'center',
    gap: 2,
  },
  balloon: {
    width: 10,
    height: 12,
    borderRadius: 5,
    opacity: 0.92,
  },
  balloonString: {
    width: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  stringLine: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.35)',
    marginHorizontal: 2,
  },
  buntingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
    marginTop: 1,
  },
  pennantCol: {
    flex: 1,
    alignItems: 'center',
  },
  pennant: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 9,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    opacity: 0.95,
  },
});
