import { StyleSheet, View } from 'react-native';

export function FestiveBanner() {
  return (
    <View style={styles.banner}>
      <View style={[styles.flag, { backgroundColor: '#fbbf24' }]} />
      <View style={[styles.flag, { backgroundColor: '#ef4444' }]} />
      <View style={[styles.flag, { backgroundColor: '#a855f7' }]} />
      <View style={[styles.flag, { backgroundColor: '#3b82f6' }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    height: 8,
    width: '100%',
  },
  flag: {
    flex: 1,
  },
});
