import { useCallback, useMemo, useState } from 'react';

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { useFocusEffect } from '@react-navigation/native';

import { Screen } from '../components/Screen';

import { Badge } from '../components/Badge';

import { Button } from '../components/Button';

import { ModuloHeader } from '../components/modulo/ModuloHeader';

import { ModuloFilterChips } from '../components/modulo/ModuloFilterChips';

import { ModuloSectionTitle } from '../components/modulo/ModuloSectionTitle';

import { ModuloCard } from '../components/modulo/ModuloCard';

import { StarryBackground } from '../components/modulo/StarryBackground';

import { moduloButtonGradient, moduloScreenStyles } from '../components/modulo/moduloScreenStyles';

import { touristSpots } from '../data/events';

import { arcoverdeHistory } from '../data/content';

import { isPlaceFavorite, togglePlaceFavorite } from '../services/storage';

import { getCategoryColor, getImageSource, openNavigation } from '../utils/helpers';

import { colors, modulo } from '../theme/colors';



type TurismoSection = 'history' | 'spots';



export function TuristicoScreen() {

  const [activeSection, setActiveSection] = useState<TurismoSection>('spots');

  const [selectedCategory, setSelectedCategory] = useState('all');

  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());



  const sectionChips = useMemo(

    () => [

      { value: 'history', label: 'História de Arcoverde' },

      { value: 'spots', label: 'Pontos Turísticos' },

    ],

    [],

  );



  const categories = useMemo(

    () => [

      { value: 'all', label: 'Todos' },

      ...Array.from(new Set(touristSpots.map((s) => s.category))).map((c) => ({

        value: c,

        label: c,

      })),

    ],

    [],

  );



  const filteredSpots = useMemo(

    () =>

      selectedCategory === 'all'

        ? touristSpots

        : touristSpots.filter((s) => s.category === selectedCategory),

    [selectedCategory],

  );



  const refreshFavorites = useCallback(async () => {

    const ids = new Set<string>();

    await Promise.all(

      touristSpots.map(async (spot) => {

        if (await isPlaceFavorite(spot.id)) ids.add(spot.id);

      }),

    );

    setFavoriteIds(ids);

  }, []);



  useFocusEffect(

    useCallback(() => {

      refreshFavorites();

    }, [refreshFavorites]),

  );



  return (

    <View style={moduloScreenStyles.root}>

      <StarryBackground />

      <ModuloHeader

        title="Turismo"

        subtitle="História e pontos turísticos de Arcoverde"

      >

        <ModuloFilterChips

          chips={sectionChips}

          selected={activeSection}

          onSelect={(value) => setActiveSection(value as TurismoSection)}

        />

      </ModuloHeader>



      <Screen withTabBar contentStyle={moduloScreenStyles.content} style={moduloScreenStyles.screen}>

        {activeSection === 'history' ? (

          <>

            <ModuloSectionTitle>História de Arcoverde</ModuloSectionTitle>

            <ModuloCard style={styles.historyCard}>

              <View style={styles.historyHeader}>

                <Feather name="book-open" size={22} color={modulo.accent} />

                <View style={styles.historyTitles}>

                  <Text style={styles.historyTitle}>{arcoverdeHistory.title}</Text>

                  <Text style={styles.historySubtitle}>

                    {arcoverdeHistory.subtitle}

                  </Text>

                </View>

              </View>

              <Text style={styles.historyText}>{arcoverdeHistory.intro}</Text>

              {arcoverdeHistory.sections.map((section) => (

                <View key={section.title} style={styles.historySection}>

                  <Text style={styles.historySectionTitle}>{section.title}</Text>

                  {section.paragraphs.map((paragraph, index) => (

                    <Text key={index} style={styles.historyText}>

                      {paragraph}

                    </Text>

                  ))}

                  {section.items?.map((item) => (

                    <View key={item.title} style={styles.historyItem}>

                      <Text style={styles.historyItemTitle}>{item.title}</Text>

                      <Text style={styles.historyText}>{item.text}</Text>

                    </View>

                  ))}

                </View>

              ))}

              <View style={styles.historyTags}>

                {arcoverdeHistory.highlights.map((tag) => (

                  <View key={tag} style={styles.historyTag}>

                    <Text style={styles.historyTagText}>{tag}</Text>

                  </View>

                ))}

              </View>

            </ModuloCard>

          </>

        ) : (

          <>

            <ModuloFilterChips

              chips={categories}

              selected={selectedCategory}

              onSelect={setSelectedCategory}

            />

            <ModuloSectionTitle>Pontos Turísticos</ModuloSectionTitle>



            <View style={styles.listWrap}>

              <View style={moduloScreenStyles.list}>

                {filteredSpots.map((spot) => {

                  const isFav = favoriteIds.has(spot.id);

                  return (

                    <ModuloCard key={spot.id}>

                      <View style={styles.imageWrap}>

                        <Image source={getImageSource(spot.image)} style={styles.image} />

                        <View style={styles.imageTop}>

                          <Badge

                            label={spot.category}

                            color={getCategoryColor(spot.category)}

                          />

                          <Pressable

                            onPress={async () => {

                              await togglePlaceFavorite(spot.id);

                              await refreshFavorites();

                            }}

                            style={styles.heartBtn}

                          >

                            <Feather

                              name="heart"

                              size={20}

                              color={modulo.accent}

                              style={!isFav ? styles.heartOutline : undefined}

                            />

                          </Pressable>

                        </View>

                        <Text style={styles.spotName}>{spot.name}</Text>

                      </View>

                      <View style={styles.details}>

                        <View style={styles.locationRow}>

                          <Feather name="map-pin" size={16} color={modulo.accent} />

                          <Text style={styles.location}>{spot.location}</Text>

                        </View>

                        <Text style={styles.desc}>{spot.description}</Text>

                        <Button

                          label="Como chegar"

                          fullWidth

                          gradient={moduloButtonGradient}

                          textStyle={{ color: colors.white }}

                          onPress={() => openNavigation(spot.location)}

                        />

                      </View>

                    </ModuloCard>

                  );

                })}

              </View>

            </View>

          </>

        )}

      </Screen>

    </View>

  );

}



const styles = StyleSheet.create({

  historyCard: { padding: 16, gap: 12 },

  historyHeader: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },

  historyTitles: { flex: 1, gap: 4 },

  historyTitle: {

    color: colors.white,

    fontSize: 17,

    fontWeight: '800',

    lineHeight: 22,

  },

  historySubtitle: {

    color: modulo.cream,

    fontSize: 13,

    fontWeight: '600',

  },

  historyText: { color: colors.gray300, fontSize: 14, lineHeight: 21 },

  historySection: { gap: 10, marginTop: 4 },

  historySectionTitle: {

    color: colors.white,

    fontSize: 15,

    fontWeight: '800',

    lineHeight: 21,

    marginTop: 4,

  },

  historyItem: { gap: 4, marginTop: 2 },

  historyItemTitle: {

    color: modulo.cream,

    fontSize: 14,

    fontWeight: '700',

    lineHeight: 20,

  },

  historyTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },

  historyTag: {

    paddingHorizontal: 10,

    paddingVertical: 6,

    borderRadius: 8,

    backgroundColor: 'rgba(255,255,255,0.08)',

    borderWidth: 1,

    borderColor: modulo.cardBorder,

  },

  historyTagText: { color: colors.gray300, fontSize: 12, fontWeight: '500' },

  listWrap: { position: 'relative', marginTop: 4 },

  imageWrap: { position: 'relative' },

  image: { width: '100%', height: 200 },

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

  heartOutline: { opacity: 0.85 },

  spotName: {

    position: 'absolute',

    bottom: 12,

    left: 12,

    right: 12,

    fontSize: 20,

    fontWeight: '800',

    color: colors.white,

  },

  details: { padding: 16, gap: 12 },

  locationRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },

  location: { flex: 1, color: colors.gray300, fontSize: 14 },

  desc: { color: colors.gray400, fontSize: 14, lineHeight: 20 },

});


