import { Image, StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { Screen } from '../components/Screen';

import { Badge } from '../components/Badge';

import { Button } from '../components/Button';

import { ModuloHeader } from '../components/modulo/ModuloHeader';

import { ModuloSectionTitle } from '../components/modulo/ModuloSectionTitle';

import { ModuloCard } from '../components/modulo/ModuloCard';

import { StarryBackground } from '../components/modulo/StarryBackground';

import { moduloButtonGradient, moduloScreenStyles } from '../components/modulo/moduloScreenStyles';

import { polos } from '../data/events';

import { openNavigation } from '../utils/helpers';

import { colors, modulo } from '../theme/colors';



export function PolosScreen() {

  return (

    <View style={moduloScreenStyles.root}>

      <StarryBackground />

      <ModuloHeader

        title="Polos do Evento"

        subtitle="Descubra os polos espalhados pela cidade"
      />



      <Screen withTabBar contentStyle={moduloScreenStyles.content} style={moduloScreenStyles.screen}>

        <ModuloSectionTitle>{`${polos.length} polos pela cidade`}</ModuloSectionTitle>



        <View style={styles.listWrap}>

          <View style={moduloScreenStyles.list}>

            {polos.map((polo) => (

              <ModuloCard key={polo.id}>

                <Image source={{ uri: polo.image }} style={styles.image} />

                {polo.showCount > 0 ? (

                  <View style={styles.badgeWrap}>

                    <Badge label={`${polo.showCount} shows`} color={modulo.accentSolid} />

                  </View>

                ) : null}

                <View style={styles.details}>

                  <Text style={styles.name}>{polo.name}</Text>

                  <View style={styles.addressRow}>

                    <Feather name="map-pin" size={18} color={modulo.accent} />

                    <Text style={styles.address}>{polo.address}</Text>

                  </View>

                  {polo.description ? (

                    <Text style={styles.desc}>{polo.description}</Text>

                  ) : null}

                  {polo.schedule?.length ? (

                    <View style={styles.extraBlock}>

                      <Text style={styles.extraTitle}>Programação</Text>

                      {polo.schedule.map((item) => (

                        <View key={item} style={styles.listRow}>

                          <Feather name="calendar" size={14} color={modulo.accent} />

                          <Text style={styles.listText}>{item}</Text>

                        </View>

                      ))}

                    </View>

                  ) : null}

                  {polo.subPolos?.length ? (

                    <View style={styles.extraBlock}>

                      <Text style={styles.extraTitle}>Polos do espaço</Text>

                      {polo.subPolos.map((subPolo) => (

                        <View key={subPolo.name} style={styles.listRow}>

                          <Feather name="star" size={14} color={modulo.accent} />

                          <Text style={styles.listText}>

                            {subPolo.name}

                            {subPolo.curator ? ` — ${subPolo.curator}` : ''}

                          </Text>

                        </View>

                      ))}

                    </View>

                  ) : null}

                  <Button

                    label="Como Chegar"

                    fullWidth

                    gradient={moduloButtonGradient}

                    icon={<Feather name="navigation" size={18} color={colors.white} />}

                    textStyle={{ color: colors.white }}

                    onPress={() => openNavigation(polo.name)}

                  />

                </View>

              </ModuloCard>

            ))}

          </View>

        </View>

      </Screen>

    </View>

  );

}



const styles = StyleSheet.create({

  listWrap: { position: 'relative', marginTop: 4 },

  image: { width: '100%', height: 180 },

  badgeWrap: { position: 'absolute', top: 12, right: 12 },

  details: { padding: 16, gap: 12 },

  name: { fontSize: 22, fontWeight: '800', color: colors.white },

  addressRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },

  address: { flex: 1, color: colors.gray300, fontSize: 14, lineHeight: 20 },

  desc: { color: colors.gray400, fontSize: 14, lineHeight: 20 },

  extraBlock: { gap: 8, marginTop: 4 },

  extraTitle: { color: colors.white, fontSize: 15, fontWeight: '700' },

  listRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },

  listText: { flex: 1, color: colors.gray300, fontSize: 14, lineHeight: 20 },

});


