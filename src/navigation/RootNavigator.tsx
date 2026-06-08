import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { ProgramacaoScreen } from '../screens/ProgramacaoScreen';
import { PolosScreen } from '../screens/PolosScreen';
import { TuristicoScreen } from '../screens/TuristicoScreen';
import { EstabelecimentosScreen } from '../screens/EstabelecimentosScreen';
import { FavoritosScreen } from '../screens/FavoritosScreen';
import { ShowDetailsScreen } from '../screens/ShowDetailsScreen';
import { DevelopersScreen } from '../screens/DevelopersScreen';
import { colors } from '../theme/colors';
import type { MainTabParamList, RootStackParamList } from './types';

const NativeStack = createNativeStackNavigator<RootStackParamList>();
const WebStack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.black,
    card: colors.black,
    border: 'rgba(255,255,255,0.1)',
    primary: colors.yellow400,
    text: colors.white,
  },
};

const linking =
  Platform.OS === 'web'
    ? {
        prefixes: [
          typeof window !== 'undefined'
            ? window.location.origin
            : 'http://localhost:3000',
        ],
        config: {
          screens: {
            MainTabs: {
              path: '',
              screens: {
                Home: '',
                Programacao: 'programacao',
                Polos: 'polos',
                Turistico: 'turistico',
                Estabelecimentos: 'estabelecimentos',
                Favoritos: 'favoritos',
              },
            },
            ShowDetails: 'show/:id',
            Developers: 'desenvolvedores',
          },
        },
      }
    : undefined;

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(0,0,0,0.95)',
          borderTopColor: 'rgba(255,255,255,0.1)',
          height: Platform.OS === 'ios' ? 84 : Platform.OS === 'web' ? 64 : 64,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.yellow400,
        tabBarInactiveTintColor: colors.gray500,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => {
          const icons: Record<
            keyof MainTabParamList,
            keyof typeof Feather.glyphMap
          > = {
            Home: 'home',
            Programacao: 'calendar',
            Polos: 'map-pin',
            Turistico: 'compass',
            Estabelecimentos: 'shopping-bag',
            Favoritos: 'heart',
          };
          return (
            <Feather name={icons[route.name]} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen
        name="Programacao"
        component={ProgramacaoScreen}
        options={{ title: 'Programação' }}
      />
      <Tab.Screen name="Polos" component={PolosScreen} options={{ title: 'Polos' }} />
      <Tab.Screen
        name="Turistico"
        component={TuristicoScreen}
        options={{ title: 'Turismo' }}
      />
      <Tab.Screen
        name="Estabelecimentos"
        component={EstabelecimentosScreen}
        options={{ title: 'Locais' }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritosScreen}
        options={{ title: 'Favoritos' }}
      />
    </Tab.Navigator>
  );
}

function RootStackScreens() {
  if (Platform.OS === 'web') {
    return (
      <WebStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.black },
        }}
      >
        <WebStack.Screen name="MainTabs" component={MainTabs} />
        <WebStack.Screen name="ShowDetails" component={ShowDetailsScreen} />
        <WebStack.Screen name="Developers" component={DevelopersScreen} />
      </WebStack.Navigator>
    );
  }

  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen name="MainTabs" component={MainTabs} />
      <NativeStack.Screen
        name="ShowDetails"
        component={ShowDetailsScreen}
        options={{
          presentation: 'card',
          animation: 'slide_from_right',
        }}
      />
      <NativeStack.Screen
        name="Developers"
        component={DevelopersScreen}
        options={{
          presentation: 'card',
          animation: 'slide_from_right',
        }}
      />
    </NativeStack.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer
      theme={navTheme}
      linking={linking}
      documentTitle={{
        formatter: (options, route) =>
          `${options?.title ?? route?.name ?? 'São João em Arcoverde'}`,
      }}
    >
      <RootStackScreens />
    </NavigationContainer>
  );
}
