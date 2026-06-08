import { useMemo, useState } from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { Screen } from '../components/Screen';

import { Badge } from '../components/Badge';

import { ModuloHeader } from '../components/modulo/ModuloHeader';

import { ModuloSearchBox } from '../components/modulo/ModuloSearchBox';

import { ModuloFilterChips } from '../components/modulo/ModuloFilterChips';

import { ModuloSectionTitle } from '../components/modulo/ModuloSectionTitle';

import { ModuloCard } from '../components/modulo/ModuloCard';

import { StarryBackground } from '../components/modulo/StarryBackground';

import { moduloScreenStyles } from '../components/modulo/moduloScreenStyles';

import {

  establishments,

  ESTABLISHMENT_CATEGORY_LABELS,

} from '../data/events';

import { colors, modulo } from '../theme/colors';



const CATEGORY_ICONS: Record<string, keyof typeof Feather.glyphMap> = {

  restaurant: 'grid',

  hotel: 'home',

  barraca: 'flag',

};



const CATEGORY_COLORS: Record<string, string> = {

  restaurant: modulo.accentSolid,

  hotel: modulo.accent,

  barraca: modulo.cream,

};



export function EstabelecimentosScreen() {

  const [searchTerm, setSearchTerm] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('all');



  const categories = useMemo(

    () => [

      { value: 'all', label: 'Todos' },

      { value: 'restaurant', label: 'Restaurantes' },

      { value: 'hotel', label: 'Hotéis' },

      { value: 'barraca', label: 'Barracas' },

    ],

    [],

  );



  const filtered = useMemo(() => {

    const term = searchTerm.toLowerCase();

    return establishments.filter((item) => {

      const matchesCategory =

        selectedCategory === 'all' || item.category === selectedCategory;

      const matchesSearch =

        !term ||

        item.name.toLowerCase().includes(term) ||

        item.address.toLowerCase().includes(term) ||

        item.description.toLowerCase().includes(term) ||

        ESTABLISHMENT_CATEGORY_LABELS[item.category].toLowerCase().includes(term);

      return matchesCategory && matchesSearch;

    });

  }, [selectedCategory, searchTerm]);



  return (

    <View style={moduloScreenStyles.root}>

      <StarryBackground />

      <ModuloHeader

        title="Locais"

        subtitle="Restaurantes, hotéis e barracas típicas"
      >

        <ModuloSearchBox

          value={searchTerm}

          onChangeText={setSearchTerm}

          placeholder="Buscar estabelecimento ou endereço..."

        />

        <ModuloFilterChips

          chips={categories}

          selected={selectedCategory}

          onSelect={setSelectedCategory}

        />

      </ModuloHeader>



      <Screen withTabBar contentStyle={moduloScreenStyles.content} style={moduloScreenStyles.screen}>

        <ModuloSectionTitle>

          {filtered.length} {filtered.length === 1 ? 'local encontrado' : 'locais encontrados'}

        </ModuloSectionTitle>



        <View style={styles.listWrap}>

          <View style={moduloScreenStyles.list}>

            {filtered.length === 0 ? (

              <View style={moduloScreenStyles.empty}>

                <Feather name="shopping-bag" size={48} color={colors.gray500} />

                <Text style={moduloScreenStyles.emptyText}>

                  Nenhum estabelecimento encontrado

                </Text>

              </View>

            ) : (

              filtered.map((item) => (

                <ModuloCard key={item.id}>

                  <View style={styles.row}>

                    <View>

                      <Image source={{ uri: item.image }} style={styles.thumb} />

                      <View

                        style={[

                          styles.categoryIcon,

                          { backgroundColor: CATEGORY_COLORS[item.category] },

                        ]}

                      >

                        <Feather

                          name={CATEGORY_ICONS[item.category]}

                          size={16}

                          color={colors.black}

                        />

                      </View>

                    </View>

                    <View style={styles.info}>

                      <Text style={styles.name}>{item.name}</Text>

                      <Badge

                        label={ESTABLISHMENT_CATEGORY_LABELS[item.category]}

                        color={CATEGORY_COLORS[item.category]}

                      />

                      <View style={styles.addressRow}>

                        <Feather name="map-pin" size={14} color={modulo.accent} />

                        <Text style={styles.address} numberOfLines={2}>

                          {item.address}

                        </Text>

                      </View>

                      <Text style={styles.desc} numberOfLines={3}>

                        {item.description}

                      </Text>

                    </View>

                  </View>

                </ModuloCard>

              ))

            )}



            {filtered.length > 0 ? (

              <ModuloCard style={styles.tip}>

                <Text style={styles.tipEmoji}>💡</Text>

                <View style={styles.tipText}>

                  <Text style={styles.tipTitle}>Dica</Text>

                  <Text style={styles.tipBody}>

                    Reserve com antecedência! O São João é o período de maior movimento na cidade.

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



const styles = StyleSheet.create({

  listWrap: { position: 'relative', marginTop: 4 },

  row: { flexDirection: 'row', gap: 14, padding: 14 },

  thumb: { width: 110, height: 110, borderRadius: 12 },

  categoryIcon: {

    position: 'absolute',

    top: 8,

    left: 8,

    width: 32,

    height: 32,

    borderRadius: 16,

    alignItems: 'center',

    justifyContent: 'center',

  },

  info: { flex: 1, gap: 8 },

  name: { fontSize: 17, fontWeight: '700', color: colors.white },

  addressRow: { flexDirection: 'row', gap: 6, alignItems: 'flex-start' },

  address: { flex: 1, color: colors.gray300, fontSize: 13 },

  desc: { color: colors.gray400, fontSize: 12, lineHeight: 18 },

  tip: {

    flexDirection: 'row',

    gap: 12,

    padding: 16,

  },

  tipEmoji: { fontSize: 24 },

  tipText: { flex: 1 },

  tipTitle: { color: colors.white, fontWeight: '700', marginBottom: 4 },

  tipBody: { color: colors.gray300, fontSize: 13, lineHeight: 18 },

});


