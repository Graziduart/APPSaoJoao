import { StyleSheet, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, modulo } from '../../theme/colors';

interface ModuloSearchBoxProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}

export function ModuloSearchBox({
  value,
  onChangeText,
  placeholder,
}: ModuloSearchBoxProps) {
  return (
    <View style={styles.searchBox}>
      <Feather name="search" size={18} color={modulo.accent} style={styles.searchIcon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={modulo.textMuted}
        style={styles.searchInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: modulo.searchBg,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: modulo.searchBorder,
    marginBottom: 12,
  },
  searchIcon: { marginLeft: 14 },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: colors.white,
    fontSize: 14,
  },
});
