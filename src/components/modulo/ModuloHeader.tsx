import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, modulo, spacing } from '../../theme/colors';

const BUNTING = [
  '#ef4444', '#fbbf24', '#22c55e', '#3b82f6',
  '#ef4444', '#fbbf24', '#22c55e', '#3b82f6',
  '#ef4444', '#fbbf24', '#22c55e', '#3b82f6',
];

interface ModuloHeaderProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export function ModuloHeader({
  title,
  subtitle,
  children,
}: ModuloHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={modulo.bgGradient}
      style={[styles.header, { paddingTop: insets.top + 8 }]}
    >
      <View style={styles.buntingRow}>
        {BUNTING.map((color, index) => (
          <View key={index} style={styles.pennantCol}>
            <View style={[styles.pennant, { borderBottomColor: color }]} />
          </View>
        ))}
      </View>

      <View style={styles.skyRow}>
        <Text style={styles.lanternLeft}>🏮</Text>
        <View style={styles.skyCenter}>
          <Text style={styles.moon}>🌙</Text>
          <Text style={styles.stars}>✦ ✦ ✦</Text>
        </View>
        <Text style={styles.lanternRight}>🏮</Text>
      </View>

      <View style={styles.titleBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.screen,
    paddingBottom: 16,
    zIndex: 1,
  },
  buntingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  pennantCol: { flex: 1, alignItems: 'center' },
  pennant: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  skyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  skyCenter: { alignItems: 'center', gap: 2 },
  moon: { fontSize: 14 },
  stars: {
    color: modulo.cream,
    fontSize: 8,
    letterSpacing: 4,
    opacity: 0.7,
  },
  lanternLeft: { fontSize: 18, opacity: 0.9 },
  lanternRight: { fontSize: 20 },
  titleBlock: {
    alignItems: 'center',
    marginBottom: 14,
    gap: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: modulo.textMuted,
    textAlign: 'center',
  },
});
