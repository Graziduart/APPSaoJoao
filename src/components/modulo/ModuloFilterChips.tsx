import { ScrollView, Pressable, StyleSheet, Text } from 'react-native';
import { colors, modulo } from '../../theme/colors';

interface Chip {
  value: string;
  label: string;
}

interface ModuloFilterChipsProps {
  chips: Chip[];
  selected: string;
  onSelect: (value: string) => void;
}

export function ModuloFilterChips({
  chips,
  selected,
  onSelect,
}: ModuloFilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {chips.map((chip) => {
        const active = selected === chip.value;
        return (
          <Pressable
            key={chip.value}
            onPress={() => onSelect(chip.value)}
            style={[styles.chip, active ? styles.chipActive : styles.chipInactive]}
          >
            <Text style={[styles.text, active && styles.textActive]}>
              {chip.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 8, paddingVertical: 2 },
  chip: {
    flexShrink: 0,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  chipActive: {
    backgroundColor: modulo.accent,
    borderColor: modulo.accent,
  },
  chipInactive: {
    backgroundColor: modulo.chipInactiveBg,
    borderColor: modulo.chipBorder,
  },
  text: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
    flexShrink: 0,
  },
  textActive: {
    color: colors.black,
    fontWeight: '800',
  },
});
