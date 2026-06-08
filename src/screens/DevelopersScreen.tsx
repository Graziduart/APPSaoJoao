import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../components/Screen';
import { Card } from '../components/Card';
import { appInfo, developers, facultyInfo, professorOrientador } from '../data/content';
import { colors, spacing } from '../theme/colors';
import type { RootStackParamList } from '../navigation/types';
import { getImageSource } from '../utils/helpers';

type Props = NativeStackScreenProps<RootStackParamList, 'Developers'>;

type SocialLink = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  url: string;
};

function DeveloperCard({
  name,
  role,
  avatar,
  links,
}: {
  name: string;
  role: string;
  avatar?: string | number;
  links: SocialLink[];
}) {
  return (
    <Card style={styles.devCard}>
      {avatar ? (
        <Image source={getImageSource(avatar)} style={styles.photo} resizeMode="cover" />
      ) : (
        <View style={styles.photoPlaceholder}>
          <Feather name="user" size={40} color={colors.gray400} />
        </View>
      )}
      <Text style={styles.devName}>{name}</Text>
      <Text style={styles.devRole}>{role}</Text>

      {links.length > 0 ? (
        <View style={styles.links}>
          {links.map((link) => (
            <Pressable
              key={link.label}
              onPress={() => Linking.openURL(link.url)}
              style={styles.linkBtn}
            >
              <Feather name={link.icon} size={18} color={colors.yellow400} />
              <Text style={styles.linkText}>{link.label}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </Card>
  );
}

export function DevelopersScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Feather name="arrow-left" size={22} color={colors.white} />
        </Pressable>
        <Text style={styles.topTitle}>Desenvolvedores</Text>
        <View style={styles.backBtn} />
      </View>

      <Screen withTabBar={false} contentStyle={styles.content}>
        <Card style={styles.appCard}>
          <Feather name="smartphone" size={32} color={colors.purple400} />
          <Text style={styles.appName}>{appInfo.name}</Text>
          <Text style={styles.appVersion}>Versão {appInfo.version}</Text>
          <Text style={styles.appDesc}>{appInfo.description}</Text>
        </Card>

        <Text style={styles.sectionLabel}>Desenvolvedoras</Text>

        {developers.map((dev) => {
          const links: SocialLink[] = [];
          if (dev.github)
            links.push({ icon: 'github', label: 'GitHub', url: dev.github });
          if (dev.linkedin)
            links.push({ icon: 'link', label: 'LinkedIn', url: dev.linkedin });
          if (dev.instagram)
            links.push({ icon: 'instagram', label: 'Instagram', url: dev.instagram });
          if (dev.email)
            links.push({
              icon: 'mail',
              label: 'E-mail',
              url: `mailto:${dev.email}`,
            });
          if (dev.website)
            links.push({ icon: 'globe', label: 'Site', url: dev.website });

          return (
            <DeveloperCard
              key={dev.id}
              name={dev.name}
              role={dev.role}
              avatar={dev.avatar}
              links={links}
            />
          );
        })}

        <Card style={styles.orientadorCard}>
          <Text style={styles.orientadorLabel}>{professorOrientador.label}</Text>
          <Text style={styles.orientadorName}>{professorOrientador.name}</Text>
        </Card>

        <Card style={styles.facultyCard}>
          <Text style={styles.facultyTitle}>Instituição de Ensino</Text>
          <Text style={styles.facultyText}>{facultyInfo.description}</Text>
          <Text style={styles.facultyInstitution}>{facultyInfo.institution}</Text>
          <Text style={styles.facultyCourse}>Curso: {facultyInfo.course}</Text>
          <Image
            source={getImageSource(facultyInfo.logo)}
            style={styles.facultyLogo}
            resizeMode="contain"
          />
        </Card>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.black },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screen,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  content: {
    paddingHorizontal: spacing.screen,
    paddingTop: 16,
    gap: 16,
  },
  appCard: {
    alignItems: 'center',
    padding: 24,
    gap: 8,
    backgroundColor: 'rgba(168, 85, 247, 0.12)',
    borderColor: 'rgba(168, 85, 247, 0.3)',
  },
  appName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.white,
    marginTop: 8,
  },
  appVersion: {
    color: colors.yellow400,
    fontWeight: '600',
    fontSize: 14,
  },
  appDesc: {
    color: colors.gray300,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  sectionLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  devCard: {
    padding: 16,
    gap: 10,
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: 280,
    borderRadius: 16,
  },
  photoPlaceholder: {
    width: '100%',
    height: 280,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  devName: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  devRole: {
    color: colors.gray400,
    fontSize: 14,
    textAlign: 'center',
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginTop: 4,
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  linkText: {
    color: colors.gray300,
    fontSize: 13,
    fontWeight: '500',
  },
  orientadorCard: {
    alignItems: 'center',
    padding: 20,
    gap: 6,
    marginTop: 4,
  },
  orientadorLabel: {
    color: colors.yellow400,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  orientadorName: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  facultyCard: {
    alignItems: 'center',
    padding: 20,
    gap: 10,
    marginTop: 4,
    marginBottom: 8,
  },
  facultyTitle: {
    color: colors.yellow400,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  facultyText: {
    color: colors.gray300,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  facultyInstitution: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  facultyCourse: {
    color: colors.gray400,
    fontSize: 13,
    textAlign: 'center',
  },
  facultyLogo: {
    width: '100%',
    height: 120,
    marginTop: 8,
  },
});
