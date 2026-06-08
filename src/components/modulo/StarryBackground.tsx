import { StyleSheet, View } from 'react-native';
import { modulo } from '../../theme/colors';

const STARS = [
  { top: '4%', left: '8%', size: 2 },
  { top: '12%', left: '72%', size: 2 },
  { top: '18%', left: '35%', size: 1.5 },
  { top: '28%', left: '88%', size: 2 },
  { top: '42%', left: '12%', size: 1.5 },
  { top: '55%', left: '62%', size: 2 },
  { top: '68%', left: '22%', size: 1.5 },
  { top: '74%', left: '78%', size: 2 },
  { top: '82%', left: '45%', size: 1.5 },
  { top: '90%', left: '6%', size: 2 },
];

export function StarryBackground() {
  return (
    <View style={styles.wrap} pointerEvents="none">
      {STARS.map((star, index) => (
        <View
          key={index}
          style={[
            styles.star,
            {
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              borderRadius: star.size / 2,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  star: {
    position: 'absolute',
    backgroundColor: modulo.star,
  },
});
