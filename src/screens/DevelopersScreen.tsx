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
import { appInfo, developers } from '../data/content';
import { colors, spacing } from '../theme/colors';
import type { RootStackParamList } from '../navigation/types';

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
  avatar?: string;
  links: SocialLink[];
}) {
  return (
    <Card style={styles.devCard}>
      <View style={styles.devHeader}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Feather name="user" size={28} color={colors.gray400} />
          </View>
        )}
        <View style={styles.devInfo}>
          <Text style={styles.devName}>{name}</Text>
          <Text style={styles.devRole}>{role}</Text>
        </View>
      </View>
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

        <Text style={styles.sectionLabel}>Equipe</Text>

        {developers.length === 0 ? (
          <Card style={styles.placeholder}>
            <Feather name="code" size={40} color={colors.gray500} />
            <Text style={styles.placeholderTitle}>Equipe em breve</Text>
            <Text style={styles.placeholderBody}>
              A equipe responsável pelo aplicativo será divulgada em breve.
            </Text>
          </Card>
        ) : (
          developers.map((dev) => {
            const links: SocialLink[] = [];
            if (dev.github)
              links.push({ icon: 'github', label: 'GitHub', url: dev.github });
            if (dev.linkedin)
              links.push({
                icon: 'link',
                label: 'LinkedIn',
                url: dev.linkedin,
              });
            if (dev.instagram)
              links.push({
                icon: 'instagram',
                label: 'Instagram',
                url: dev.instagram,
              });
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
          })
        )}
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
  placeholder: {
    alignItems: 'center',
    padding: 28,
    gap: 12,
  },
  placeholderTitle: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  placeholderBody: {
    color: colors.gray400,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  devCard: {
    padding: 16,
    gap: 12,
  },
  devHeader: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  devInfo: { flex: 1, gap: 4 },
  devName: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  devRole: {
    color: colors.gray400,
    fontSize: 14,
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
});
