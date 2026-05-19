import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme/colors';

interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  withTabBar?: boolean;
}

export function Screen({
  children,
  scroll = true,
  style,
  contentStyle,
  withTabBar = true,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const bottomPad = withTabBar ? spacing.tabBar + insets.bottom : insets.bottom + 16;

  const content = (
    <View style={[styles.inner, { paddingBottom: bottomPad }, contentStyle]}>
      {children}
    </View>
  );

  if (!scroll) {
    return <View style={[styles.root, style]}>{content}</View>;
  }

  return (
    <ScrollView
      style={[styles.root, style]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      bounces
    >
      {content}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.black,
  },
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    flexGrow: 1,
  },
});
