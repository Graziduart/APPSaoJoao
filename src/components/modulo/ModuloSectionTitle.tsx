import { StyleSheet, Text } from 'react-native';
import { modulo } from '../../theme/colors';

interface ModuloSectionTitleProps {
  children: string;
}

export function ModuloSectionTitle({ children }: ModuloSectionTitleProps) {
  return <Text style={styles.title}>✨ {children} ✨</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: modulo.cream,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 2,
  },
});
