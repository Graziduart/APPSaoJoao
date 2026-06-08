import { useCallback, useEffect, useMemo, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { useFocusEffect } from '@react-navigation/native';

import type { CompositeScreenProps } from '@react-navigation/native';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '../components/Screen';

import { ModuloHeader } from '../components/modulo/ModuloHeader';

import { ModuloSearchBox } from '../components/modulo/ModuloSearchBox';

import { ModuloFilterChips } from '../components/modulo/ModuloFilterChips';

import { ModuloDateChips } from '../components/modulo/ModuloDateChips';

import { ModuloSectionTitle } from '../components/modulo/ModuloSectionTitle';

import { ModuloShowCard } from '../components/modulo/ModuloShowCard';

import { StarryBackground } from '../components/modulo/StarryBackground';

import { moduloScreenStyles } from '../components/modulo/moduloScreenStyles';

import { shows, EVENT_START_DATE } from '../data/events';

import { isShowFavorite, toggleShowFavorite } from '../services/storage';

import { colors } from '../theme/colors';

import type { MainTabParamList, RootStackParamList } from '../navigation/types';

import { formatDate, formatProgramacaoChip } from '../utils/helpers';



type Props = CompositeScreenProps<

  BottomTabScreenProps<MainTabParamList, 'Programacao'>,

  NativeStackScreenProps<RootStackParamList>

>;



const POLO_CHIP_LABELS: Record<string, string> = {

  'Polo Raízes do Coco': 'Raízes do Coco',

  'Polos Culturais e de Arte': 'Culturais e Arte',

  'Polos Temáticos e Gastronômicos': 'Temáticos e Gastro',

};



function getPoloChipLabel(polo: string): string {

  return POLO_CHIP_LABELS[polo] ?? polo;

}



export function ProgramacaoScreen({ navigation }: Props) {

  const [searchTerm, setSearchTerm] = useState('');

  const [selectedPolo, setSelectedPolo] = useState('all');

  const [selectedDate, setSelectedDate] = useState(EVENT_START_DATE);

  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());



  const showsByDate = useMemo(() => {

    return shows.reduce<Record<string, typeof shows>>((acc, show) => {

      if (!acc[show.date]) acc[show.date] = [];

      acc[show.date].push(show);

      return acc;

    }, {});

  }, []);



  const dates = useMemo(() => Object.keys(showsByDate).sort(), [showsByDate]);



  const poloChips = useMemo(() => {

    const poloOrder = [

      'Polo Central',

      'Polo Raízes do Coco',

      'Polos Culturais e de Arte',

      'Polos Temáticos e Gastronômicos',

    ];

    const uniquePolos = Array.from(new Set(shows.map((s) => s.polo)));

    const sortedPolos = [

      ...poloOrder.filter((polo) => uniquePolos.includes(polo)),

      ...uniquePolos.filter((polo) => !poloOrder.includes(polo)),

    ];



    return [

      { value: 'all', label: 'Todos os Polos' },

      ...sortedPolos.map((polo) => ({

        value: polo,

        label: getPoloChipLabel(polo),

      })),

    ];

  }, []);



  const dateChips = useMemo(() => {
    const visibleDates =
      selectedPolo === 'all'
        ? dates
        : dates.filter((date) =>
            (showsByDate[date] ?? []).some((show) => show.polo === selectedPolo),
          );

    return visibleDates.map((date) => ({
      value: date,
      label: formatProgramacaoChip(date),
    }));
  }, [dates, showsByDate, selectedPolo]);



  const selectedDayTitle = useMemo(

    () => formatDate(selectedDate),

    [selectedDate],

  );



  const handleSelectPolo = useCallback(
    (polo: string) => {
      setSelectedPolo(polo);
      if (polo === 'all') return;

      const poloDates = dates.filter((date) =>
        (showsByDate[date] ?? []).some((show) => show.polo === polo),
      );

      const currentDayHasPolo = (showsByDate[selectedDate] ?? []).some(
        (show) => show.polo === polo,
      );

      if (!currentDayHasPolo && poloDates.length > 0) {
        setSelectedDate(poloDates[0]);
      }
    },
    [dates, showsByDate, selectedDate],
  );

  useEffect(() => {
    if (selectedPolo === 'all') return;

    const poloDates = dates.filter((date) =>
      (showsByDate[date] ?? []).some((show) => show.polo === selectedPolo),
    );

    if (poloDates.length > 0 && !poloDates.includes(selectedDate)) {
      setSelectedDate(poloDates[0]);
    }
  }, [selectedPolo, selectedDate, dates, showsByDate]);



  const filteredShows = useMemo(() => {

    const list = showsByDate[selectedDate] ?? [];

    const term = searchTerm.toLowerCase();

    return list

      .filter((show) => {

        const matchesSearch =

          show.artist.toLowerCase().includes(term) ||

          show.category.toLowerCase().includes(term) ||

          show.polo.toLowerCase().includes(term);

        const matchesPolo = selectedPolo === 'all' || show.polo === selectedPolo;

        return matchesSearch && matchesPolo;

      })

      .sort((a, b) => a.time.localeCompare(b.time));

  }, [showsByDate, selectedDate, searchTerm, selectedPolo]);



  const refreshFavorites = useCallback(async () => {

    const ids = new Set<string>();

    await Promise.all(

      shows.map(async (show) => {

        if (await isShowFavorite(show.id)) ids.add(show.id);

      }),

    );

    setFavoriteIds(ids);

  }, []);



  useFocusEffect(

    useCallback(() => {

      refreshFavorites();

    }, [refreshFavorites]),

  );



  const handleToggleFavorite = async (showId: string) => {

    await toggleShowFavorite(showId);

    await refreshFavorites();

  };



  return (

    <View style={moduloScreenStyles.root}>

      <StarryBackground />

      <ModuloHeader

        title="Programação"

        subtitle="Confira os eventos e atividades."

      >

        <ModuloSearchBox

          value={searchTerm}

          onChangeText={setSearchTerm}

          placeholder="Buscar artista, evento ou categoria..."

        />

        <ModuloFilterChips

          chips={poloChips}

          selected={selectedPolo}

          onSelect={handleSelectPolo}

        />

      </ModuloHeader>



      <Screen withTabBar contentStyle={moduloScreenStyles.content} style={moduloScreenStyles.screen}>

        <ModuloDateChips

          chips={dateChips}

          selected={selectedDate}

          onSelect={setSelectedDate}

        />

        <ModuloSectionTitle>{selectedDayTitle}</ModuloSectionTitle>



        <View style={styles.listWrap}>

          <View style={moduloScreenStyles.list}>

            {filteredShows.length === 0 ? (

              <View style={moduloScreenStyles.empty}>

                <Feather name="music" size={48} color={colors.gray500} />

                <Text style={moduloScreenStyles.emptyText}>
                  {selectedPolo !== 'all'
                    ? `Nenhum show em ${getPoloChipLabel(selectedPolo)} nesta data`
                    : 'Nenhum show encontrado'}
                </Text>

              </View>

            ) : (

              filteredShows.map((show) => (

                <ModuloShowCard

                  key={show.id}

                  show={show}

                  isFavorite={favoriteIds.has(show.id)}

                  onPress={() => navigation.navigate('ShowDetails', { id: show.id })}

                  onToggleFavorite={() => handleToggleFavorite(show.id)}

                />

              ))

            )}

          </View>

        </View>

      </Screen>

    </View>

  );

}



const styles = StyleSheet.create({

  listWrap: { position: 'relative', marginTop: 4 },

});


