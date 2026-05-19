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
import { saoJoaoHistory } from '../data/content';
import { colors, spacing } from '../theme/colors';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { formatShortDate } from '../utils/helpers';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1735837131977-a1ddcc5bf86d?w=1200';

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
      color: colors.purple400,
    },
    {
      title: `${polos.length} Polos`,
      subtitle: 'Central e Sesc',
      icon: 'map-pin' as const,
      color: colors.orange400,
    },
    {
      title: `${eventDays} Dias`,
      subtitle: '13 a 28 de junho',
      icon: 'zap' as const,
      color: colors.red400,
    },
  ];

  const quickActions = [
    { title: 'Programação', tab: 'Programacao' as const, icon: 'calendar' as const, colors: ['#a855f7', '#7e22ce'] as [string, string] },
    { title: 'Polos', tab: 'Polos' as const, icon: 'map-pin' as const, colors: ['#f97316', '#dc2626'] as [string, string] },
    { title: 'Turismo', tab: 'Turistico' as const, icon: 'compass' as const, colors: ['#3b82f6', '#0891b2'] as [string, string] },
    { title: 'Locais', tab: 'Estabelecimentos' as const, icon: 'shopping-bag' as const, colors: ['#eab308', '#ea580c'] as [string, string] },
  ];

  return (
    <Screen withTabBar>
      <FestiveBanner />
      <View style={styles.hero}>
        <Image source={{ uri: HERO_IMAGE }} style={styles.heroImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.5)', colors.black]}
          style={styles.heroOverlay}
        />
        <View style={styles.heroContent}>
          <Feather name="star" size={40} color={colors.yellow400} />
          <Text style={styles.heroTitle}>São João</Text>
          <Text style={styles.heroSubtitle}>Arcoverde 2026</Text>
          <Text style={styles.heroDate}>
            {currentTime.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
            })}
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.highlights}>
          {highlights.map((item) => (
            <Card key={item.title} style={styles.highlightCard}>
              <Feather name={item.icon} size={28} color={item.color} />
              <Text style={styles.highlightTitle}>{item.title}</Text>
              <Text style={styles.highlightSub}>{item.subtitle}</Text>
            </Card>
          ))}
        </View>

        <Card style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <Feather name="book-open" size={22} color={colors.orange400} />
            <View style={styles.historyTitles}>
              <Text style={styles.historyTitle}>{saoJoaoHistory.title}</Text>
              <Text style={styles.historySubtitle}>
                {saoJoaoHistory.subtitle}
              </Text>
            </View>
          </View>
          {saoJoaoHistory.paragraphs.map((paragraph, index) => (
            <Text key={index} style={styles.historyText}>
              {paragraph}
            </Text>
          ))}
          <View style={styles.historyTags}>
            {saoJoaoHistory.highlights.map((tag) => (
              <View key={tag} style={styles.historyTag}>
                <Text style={styles.historyTagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </Card>

        <View style={styles.sectionTitleRow}>
          <Feather name="star" size={18} color={colors.yellow400} />
          <Text style={styles.sectionTitle}>Acesso Rápido</Text>
        </View>
        <View style={styles.quickGrid}>
          {quickActions.map((action) => (
            <Pressable
              key={action.title}
              onPress={() => navigation.navigate(action.tab)}
              style={styles.quickItem}
            >
              <LinearGradient colors={action.colors} style={styles.quickGradient}>
                <Feather name={action.icon} size={28} color={colors.white} />
                <Text style={styles.quickLabel}>{action.title}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Feather name="zap" size={18} color={colors.orange400} />
            <Text style={styles.sectionTitle}>Próximos Shows</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('Programacao')}>
            <Text style={styles.link}>Ver todos</Text>
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
            <Feather name="code" size={22} color={colors.purple400} />
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
    height: 280,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.screen,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.white,
    marginTop: 8,
  },
  heroSubtitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.yellow400,
  },
  heroDate: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 8,
  },
  body: {
    paddingHorizontal: spacing.screen,
    marginTop: -24,
    gap: 16,
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
  historyCard: {
    padding: 16,
    gap: 12,
    backgroundColor: 'rgba(234, 88, 12, 0.1)',
    borderColor: 'rgba(249, 115, 22, 0.35)',
  },
  historyHeader: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  historyTitles: {
    flex: 1,
    gap: 4,
  },
  historyTitle: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 22,
  },
  historySubtitle: {
    color: colors.orange400,
    fontSize: 13,
    fontWeight: '600',
  },
  historyText: {
    color: colors.gray300,
    fontSize: 14,
    lineHeight: 21,
  },
  historyTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  historyTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  historyTagText: {
    color: colors.gray300,
    fontSize: 12,
    fontWeight: '500',
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
    color: colors.yellow400,
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
