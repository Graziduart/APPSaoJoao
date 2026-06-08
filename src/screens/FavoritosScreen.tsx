import { useCallback, useMemo, useState } from 'react';

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import type { CompositeNavigationProp } from '@react-navigation/native';

import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Screen } from '../components/Screen';

import { Badge } from '../components/Badge';

import { ModuloHeader } from '../components/modulo/ModuloHeader';

import { ModuloFilterChips } from '../components/modulo/ModuloFilterChips';

import { ModuloSectionTitle } from '../components/modulo/ModuloSectionTitle';

import { ModuloCard } from '../components/modulo/ModuloCard';

import { ModuloShowCard } from '../components/modulo/ModuloShowCard';

import { StarryBackground } from '../components/modulo/StarryBackground';

import { moduloScreenStyles } from '../components/modulo/moduloScreenStyles';

import { shows, touristSpots } from '../data/events';

import {

  getFavorites,

  toggleShowFavorite,

  togglePlaceFavorite,

} from '../services/storage';

import { colors, modulo } from '../theme/colors';

import type { MainTabParamList, RootStackParamList } from '../navigation/types';

import { getCategoryColor, getImageSource } from '../utils/helpers';



type Nav = CompositeNavigationProp<

  BottomTabNavigationProp<MainTabParamList, 'Favoritos'>,

  NativeStackNavigationProp<RootStackParamList>

>;



type FavoritosTab = 'shows' | 'places';



export function FavoritosScreen() {

  const navigation = useNavigation<Nav>();

  const [tab, setTab] = useState<FavoritosTab>('shows');

  const [favoriteShowIds, setFavoriteShowIds] = useState<string[]>([]);

  const [favoritePlaceIds, setFavoritePlaceIds] = useState<string[]>([]);



  const loadFavorites = useCallback(async () => {

    const fav = await getFavorites();

    setFavoriteShowIds(fav.shows);

    setFavoritePlaceIds(fav.places);

  }, []);



  useFocusEffect(

    useCallback(() => {

      loadFavorites();

    }, [loadFavorites]),

  );



  const favoriteShows = shows.filter((s) => favoriteShowIds.includes(s.id));

  const favoritePlaces = touristSpots.filter((p) =>

    favoritePlaceIds.includes(p.id),

  );



  const tabChips = useMemo(

    () => [

      { value: 'shows', label: `Shows (${favoriteShows.length})` },

      { value: 'places', label: `Lugares (${favoritePlaces.length})` },

    ],

    [favoriteShows.length, favoritePlaces.length],

  );



  const sectionTitle =

    tab === 'shows'

      ? favoriteShows.length === 0

        ? 'Nenhum show favorito'

        : `${favoriteShows.length} ${favoriteShows.length === 1 ? 'show salvo' : 'shows salvos'}`

      : favoritePlaces.length === 0

        ? 'Nenhum lugar favorito'

        : `${favoritePlaces.length} ${favoritePlaces.length === 1 ? 'lugar salvo' : 'lugares salvos'}`;



  const hasFavorites = favoriteShows.length > 0 || favoritePlaces.length > 0;

  return (

    <View style={moduloScreenStyles.root}>

      <StarryBackground />

      <ModuloHeader

        title="Favoritos"

        subtitle="Seus shows e lugares salvos"
      >

        <ModuloFilterChips

          chips={tabChips}

          selected={tab}

          onSelect={(value) => setTab(value as FavoritosTab)}

        />

      </ModuloHeader>



      <Screen withTabBar contentStyle={moduloScreenStyles.content} style={moduloScreenStyles.screen}>

        <ModuloSectionTitle>{sectionTitle}</ModuloSectionTitle>



        <View style={styles.listWrap}>

          <View style={moduloScreenStyles.list}>

            {tab === 'shows' ? (

              favoriteShows.length === 0 ? (

                <EmptyState icon="music" message="Você ainda não favoritou nenhum show" />

              ) : (

                favoriteShows.map((show) => (

                  <ModuloShowCard

                    key={show.id}

                    show={show}

                    isFavorite

                    onPress={() =>

                      navigation.navigate('ShowDetails', { id: show.id })

                    }

                    onToggleFavorite={async () => {

                      await toggleShowFavorite(show.id);

                      await loadFavorites();

                    }}

                  />

                ))

              )

            ) : favoritePlaces.length === 0 ? (

              <EmptyState icon="compass" message="Você ainda não favoritou nenhum lugar" />

            ) : (

              favoritePlaces.map((place) => (

                <ModuloCard key={place.id}>

                  <View style={styles.imageWrap}>

                    <Image

                      source={getImageSource(place.image)}

                      style={styles.placeImage}

                    />

                    <View style={styles.imageTop}>

                      <Badge

                        label={place.category}

                        color={getCategoryColor(place.category)}

                      />

                      <Pressable

                        onPress={async () => {

                          await togglePlaceFavorite(place.id);

                          await loadFavorites();

                        }}

                        style={styles.heartBtn}

                      >

                        <Feather name="heart" size={20} color={modulo.accent} />

                      </Pressable>

                    </View>

                    <Text style={styles.placeName}>{place.name}</Text>

                  </View>

                  <View style={styles.placeBody}>

                    <View style={styles.locationRow}>

                      <Feather name="map-pin" size={16} color={modulo.accent} />

                      <Text style={styles.placeLocation}>{place.location}</Text>

                    </View>

                    <Text style={styles.placeDesc} numberOfLines={2}>

                      {place.description}

                    </Text>

                  </View>

                </ModuloCard>

              ))

            )}



            {hasFavorites ? (

              <ModuloCard style={styles.savedTip}>

                <Feather name="heart" size={20} color={modulo.accent} />

                <View style={styles.savedTipText}>

                  <Text style={styles.savedTitle}>Seus favoritos estão salvos</Text>

                  <Text style={styles.savedBody}>

                    Os favoritos ficam salvos no seu celular, mesmo offline!

                  </Text>

                </View>

              </ModuloCard>

            ) : null}

          </View>

        </View>

      </Screen>

    </View>

  );

}



function EmptyState({

  icon,

  message,

}: {

  icon: keyof typeof Feather.glyphMap;

  message: string;

}) {

  return (

    <View style={moduloScreenStyles.empty}>

      <Feather name={icon} size={56} color={colors.gray500} />

      <Text style={moduloScreenStyles.emptyText}>{message}</Text>

    </View>

  );

}



const styles = StyleSheet.create({

  listWrap: { position: 'relative', marginTop: 4 },

  imageWrap: { position: 'relative' },

  placeImage: { width: '100%', height: 160 },

  imageTop: {

    position: 'absolute',

    top: 12,

    left: 12,

    right: 12,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'flex-start',

  },

  heartBtn: {

    backgroundColor: 'rgba(0,0,0,0.5)',

    padding: 10,

    borderRadius: 24,

  },

  placeName: {

    position: 'absolute',

    bottom: 12,

    left: 12,

    right: 12,

    fontSize: 20,

    fontWeight: '800',

    color: colors.white,

  },

  placeBody: { padding: 16, gap: 8 },

  locationRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },

  placeLocation: { flex: 1, color: colors.gray300, fontSize: 14 },

  placeDesc: { color: colors.gray400, fontSize: 13, lineHeight: 18 },

  savedTip: {

    flexDirection: 'row',

    gap: 12,

    padding: 16,

    marginTop: 4,

  },

  savedTipText: { flex: 1 },

  savedTitle: {

    color: colors.white,

    fontWeight: '700',

    marginBottom: 4,

  },

  savedBody: {

    color: colors.gray300,

    fontSize: 13,

    lineHeight: 18,

  },

});


