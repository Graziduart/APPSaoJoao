import { useEffect, useState } from 'react';

import {

  Image,

  Pressable,

  StyleSheet,

  Text,

  View,

} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { Feather } from '@expo/vector-icons';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import type { CompositeScreenProps } from '@react-navigation/native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '../components/Screen';

import { Card } from '../components/Card';

import { Badge } from '../components/Badge';

import { FestiveBanner } from '../components/FestiveBanner';

import { shows, EVENT_START_DATE, EVENT_END_DATE, polos } from '../data/events';

import { colors, junina, spacing } from '../theme/colors';

import type { MainTabParamList, RootStackParamList } from '../navigation/types';

import { formatShortDate } from '../utils/helpers';



type Props = CompositeScreenProps<

  BottomTabScreenProps<MainTabParamList, 'Home'>,

  NativeStackScreenProps<RootStackParamList>

>;



const HERO_IMAGE = require('../../assets/capa-sao-joao.png');



export function HomeScreen({ navigation }: Props) {

  const [currentTime, setCurrentTime] = useState(new Date());

  const upcomingShows = shows.slice(0, 3);



  useEffect(() => {

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => clearInterval(timer);

  }, []);



  const eventDays =

    Math.round(

      (new Date(EVENT_END_DATE).getTime() - new Date(EVENT_START_DATE).getTime()) /

        (1000 * 60 * 60 * 24),

    ) + 1;



  const highlights = [

    {

      title: `${shows.length} Shows`,

      subtitle: 'Programação oficial',

      icon: 'music' as const,

    },

    {

      title: `${polos.length} Polos`,

      subtitle: 'Espalhados pela cidade',

      icon: 'map-pin' as const,

    },

    {

      title: `${eventDays} Dias`,

      subtitle: '13 a 28 de junho',

      icon: 'zap' as const,

    },

  ];



  const quickActions = [

    { title: 'Programação', tab: 'Programacao' as const, icon: 'calendar' as const },

    { title: 'Polos', tab: 'Polos' as const, icon: 'map-pin' as const },

    { title: 'Turismo', tab: 'Turistico' as const, icon: 'compass' as const },

    { title: 'Locais', tab: 'Estabelecimentos' as const, icon: 'shopping-bag' as const },

  ];



  return (

    <Screen withTabBar>

      <FestiveBanner />

      <View style={styles.hero}>

        <Image source={HERO_IMAGE} style={styles.heroImage} resizeMode="contain" />

      </View>



      <View style={styles.body}>

        <View style={styles.dateBar}>

          <Feather name="calendar" size={16} color={junina.icon} />

          <Text style={styles.heroDate}>

            {currentTime.toLocaleDateString('pt-BR', {

              weekday: 'long',

              day: '2-digit',

              month: 'long',

              year: 'numeric',

            })}

          </Text>

        </View>



        <View style={styles.highlights}>

          {highlights.map((item) => (

            <Card key={item.title} style={styles.highlightCard}>

              <Feather name={item.icon} size={28} color={junina.icon} />

              <Text style={styles.highlightTitle}>{item.title}</Text>

              <Text style={styles.highlightSub}>{item.subtitle}</Text>

            </Card>

          ))}

        </View>



        <View style={styles.sectionTitleRow}>

          <Feather name="star" size={18} color={junina.icon} />

          <Text style={styles.sectionTitle}>Acesso Rápido</Text>

        </View>

        <View style={styles.quickGrid}>

          {quickActions.map((action) => (

            <Pressable

              key={action.title}

              onPress={() => navigation.navigate(action.tab)}

              style={styles.quickItem}

            >

              <LinearGradient colors={junina.gradient} style={styles.quickGradient}>

                <Feather name={action.icon} size={28} color={colors.white} />

                <Text style={styles.quickLabel}>{action.title}</Text>

              </LinearGradient>

            </Pressable>

          ))}

        </View>



        <View style={styles.sectionHeader}>

          <View style={styles.sectionTitleRow}>

            <Feather name="zap" size={18} color={junina.icon} />

            <Text style={styles.sectionTitle}>Próximos Shows</Text>

          </View>

          <Pressable onPress={() => navigation.navigate('Programacao')}>

            <Text style={styles.link}>Ver todos →</Text>

          </Pressable>

        </View>



        <View style={styles.showList}>

          {upcomingShows.map((show) => (

            <Pressable

              key={show.id}

              onPress={() =>

                navigation.navigate('ShowDetails', { id: show.id })

              }

            >

              <Card>

                <View style={styles.showRow}>

                  <Image source={{ uri: show.image }} style={styles.showThumb} />

                  <View style={styles.showInfo}>

                    <Text style={styles.showArtist}>{show.artist}</Text>

                    <Badge label={show.category} />

                    <View style={styles.showMeta}>

                      <Feather name="calendar" size={14} color={colors.gray300} />

                      <Text style={styles.showMetaText}>

                        {formatShortDate(show.date)}

                      </Text>

                    </View>

                    <View style={styles.showMeta}>

                      <Feather name="map-pin" size={14} color={colors.gray300} />

                      <Text style={styles.showMetaText}>{show.polo}</Text>

                    </View>

                  </View>

                </View>

              </Card>

            </Pressable>

          ))}

        </View>



        <Pressable

          onPress={() => navigation.navigate('Developers')}

          style={styles.devLink}

        >

          <Card style={styles.devCard}>

            <Feather name="code" size={22} color={junina.icon} />

            <View style={styles.devLinkText}>

              <Text style={styles.devLinkTitle}>Desenvolvedores</Text>

              <Text style={styles.devLinkSub}>

                Conheça quem criou este aplicativo

              </Text>

            </View>

            <Feather name="chevron-right" size={22} color={colors.gray500} />

          </Card>

        </Pressable>

      </View>

    </Screen>

  );

}



const styles = StyleSheet.create({

  hero: {

    height: 340,

    position: 'relative',

    backgroundColor: colors.black,

  },

  heroImage: {

    width: '100%',

    height: '100%',

  },

  body: {

    paddingHorizontal: spacing.screen,

    paddingTop: 12,

    gap: 16,

  },

  dateBar: {

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    gap: 8,

    paddingVertical: 10,

    paddingHorizontal: 14,

    borderRadius: 12,

    backgroundColor: junina.cardBg,

    borderWidth: 1,

    borderColor: junina.cardBorder,

  },

  heroDate: {

    fontSize: 13,

    fontWeight: '600',

    color: colors.gray300,

    textAlign: 'center',

    textTransform: 'capitalize',

    flexShrink: 1,

  },

  highlights: {

    flexDirection: 'row',

    gap: 10,

  },

  highlightCard: {

    flex: 1,

    alignItems: 'center',

    padding: 12,

    gap: 6,

    backgroundColor: junina.cardBg,

    borderColor: junina.cardBorder,

  },

  highlightTitle: {

    color: colors.white,

    fontWeight: '700',

    fontSize: 15,

    textAlign: 'center',

  },

  highlightSub: {

    color: colors.gray400,

    fontSize: 11,

    textAlign: 'center',

  },

  devLink: {

    marginTop: 8,

    marginBottom: 8,

  },

  devCard: {

    flexDirection: 'row',

    alignItems: 'center',

    gap: 14,

    padding: 16,

    backgroundColor: junina.cardBg,

    borderColor: junina.cardBorder,

  },

  devLinkText: {

    flex: 1,

    gap: 4,

  },

  devLinkTitle: {

    color: colors.white,

    fontSize: 16,

    fontWeight: '700',

  },

  devLinkSub: {

    color: colors.gray400,

    fontSize: 13,

  },

  sectionTitleRow: {

    flexDirection: 'row',

    alignItems: 'center',

    gap: 8,

  },

  sectionTitle: {

    fontSize: 18,

    fontWeight: '700',

    color: colors.white,

  },

  sectionHeader: {

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

  },

  link: {

    color: junina.text,

    fontWeight: '600',

    fontSize: 14,

  },

  quickGrid: {

    flexDirection: 'row',

    flexWrap: 'wrap',

    gap: 10,

  },

  quickItem: {

    width: '48%',

    flexGrow: 1,

  },

  quickGradient: {

    flexDirection: 'row',

    alignItems: 'center',

    gap: 12,

    padding: 16,

    borderRadius: 16,

    minHeight: 72,

  },

  quickLabel: {

    color: colors.white,

    fontWeight: '700',

    fontSize: 16,

  },

  showList: {

    gap: 12,

    marginTop: 4,

  },

  showRow: {

    flexDirection: 'row',

    gap: 12,

    padding: 12,

  },

  showThumb: {

    width: 88,

    height: 88,

    borderRadius: 12,

  },

  showInfo: {

    flex: 1,

    gap: 6,

  },

  showArtist: {

    fontSize: 17,

    fontWeight: '700',

    color: colors.white,

  },

  showMeta: {

    flexDirection: 'row',

    alignItems: 'center',

    gap: 6,

  },

  showMetaText: {

    color: colors.gray300,

    fontSize: 13,

  },

});


