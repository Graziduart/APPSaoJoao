import { ScrollView, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, modulo } from '../../theme/colors';

interface Chip {
  value: string;
  label: string;
}

interface ModuloDateChipsProps {
  chips: Chip[];
  selected: string;
  onSelect: (value: string) => void;
}

export function ModuloDateChips({
  chips,
  selected,
  onSelect,
}: ModuloDateChipsProps) {
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
            {active ? (
              <Feather name="calendar" size={13} color={colors.black} />
            ) : null}
            <Text style={[styles.text, active && styles.textActive]}>
              {chip.label}
            </Text>
          </Pressable>
        );
      })}
      <View style={styles.calendarBtn}>
        <Feather name="calendar" size={18} color={modulo.accent} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 8, paddingVertical: 4, alignItems: 'center' },
  chip: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  chipActive: {
    backgroundColor: modulo.accent,
    borderColor: modulo.accent,
    borderStyle: 'dashed',
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
  calendarBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: modulo.chipInactiveBg,
    borderWidth: 1.5,
    borderColor: modulo.chipBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
