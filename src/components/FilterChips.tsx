import { ScrollView, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';

interface Chip {
  value: string;
  label: string;
}

interface FilterChipsProps {
  chips: Chip[];
  selected: string;
  onSelect: (value: string) => void;
}

export function FilterChips({ chips, selected, onSelect }: FilterChipsProps) {
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
            style={[styles.chip, active && styles.chipActive]}
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
  row: {
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    flexShrink: 0,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  chipActive: {
    backgroundColor: colors.yellow400,
    borderColor: colors.yellow400,
  },
  text: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '500',
    flexShrink: 0,
  },
  textActive: {
    color: colors.black,
    fontWeight: '700',
  },
});
