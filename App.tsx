import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { colors } from './src/theme/colors';

export default function App() {
  const { width, height } = useWindowDimensions();

  const content = (
    <SafeAreaProvider style={styles.safeArea}>
      <StatusBar style="light" />
      <RootNavigator />
    </SafeAreaProvider>
  );

  if (Platform.OS === 'web') {
    const frameWidth = Math.min(width - 32, 390);
    const frameHeight = Math.min(height - 32, 844);

    return (
      <View style={styles.webRoot}>
        <View
          style={[
            styles.phoneFrame,
            { width: frameWidth, height: frameHeight },
          ]}
        >
          {content}
        </View>
      </View>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black,
  },
  webRoot: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        minHeight: '100%',
        width: '100%',
      },
    }),
  },
  phoneFrame: {
    overflow: 'hidden',
    backgroundColor: colors.black,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    ...Platform.select({
      web: {
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
      },
    }),
  },
});
