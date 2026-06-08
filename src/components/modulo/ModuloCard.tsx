import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { modulo } from '../../theme/colors';

interface ModuloCardProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function ModuloCard({ children, style }: ModuloCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: modulo.cardBg,
    borderWidth: 1.5,
    borderColor: modulo.cardBorder,
    overflow: 'hidden',
  },
});
