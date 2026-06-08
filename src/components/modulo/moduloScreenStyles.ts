import { StyleSheet } from 'react-native';
import { colors, modulo, spacing } from '../../theme/colors';

export const moduloScreenStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: modulo.bg,
  },
  screen: {
    backgroundColor: 'transparent',
  },
  content: {
    paddingHorizontal: spacing.screen,
    paddingTop: 12,
    gap: 14,
  },
  list: {
    gap: 12,
    position: 'relative',
  },
  empty: {
    alignItems: 'center',
    padding: 32,
    gap: 12,
    borderRadius: 16,
    backgroundColor: modulo.cardBg,
    borderWidth: 1.5,
    borderColor: modulo.cardBorder,
  },
  emptyText: {
    color: colors.gray400,
    fontSize: 16,
  },
});

export const moduloButtonGradient: [string, string] = [
  modulo.accentSolid,
  modulo.accent,
];
