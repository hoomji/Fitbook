import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {TextInput, Text, Pressable} from '@react-native-material/core';
import React from 'react';
import {useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchPrograms from '../components/searchBar/SearchPrograms';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Workout'>;
const {width, height} = Dimensions.get('window');

const ProgramButton = (props: any) => {
  return (
    <View style={[styles.btn_program_container]}>
      <Pressable
        pressEffectColor="#FB8E40"
        style={[styles.btn_program_body]}
        onPress={props.onPress}>
        <Octicons name={props.icon} size={40} color={'#000000B3'} />
        <Text style={[styles.mg_t_8, styles.font_inter_20, styles.text_center]}>
          {props.text}
        </Text>
      </Pressable>
    </View>
  );
};

const WorkoutScreen = ({navigation: {navigate}}: Props) => {
  const [search, setSearch] = useState('');

  const updateSearch = (search_: string) => {
    setSearch(search_);
  };

  return (
    <SafeAreaView style={styles.bg_white}>
      <View style={styles.header}>
        <Text style={styles.title}>Workout</Text>
      </View>
      <View style={[styles.mg_h_16]}>
        <View style={[styles.btn_new_workout]}>
          <TouchableOpacity
            onPress={() => navigate('StartWorkout', {navData: {}})}
            style={[styles.pd_h_4, styles.headerWorkout]}>
            <Text style={[styles.mg_v_16, styles.font_inter_20]}>
              <Fontisto name={'plus-a'} size={18} color={'#0561F880'} /> Start
              New Workout
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.mg_v_16, styles.font_inter_sb_20]}>Programs:</Text>

        <View
          style={[
            styles.mg_v_16,
            styles.flex_row,
            styles.flex_justify_between,
          ]}>
          <ProgramButton
            // style={styles.spacing}
            icon="sun"
            text="New 
            Routine"
            onPress={() => navigate('CreateRoutine', {navData: {}})}
          />
          <ProgramButton
            // style={styles.spacing}
            icon="file"
            text="Saved Routine"
            onPress={() => navigate('SavedRoutines')}
          />
        </View>

        <SearchPrograms value={search} onChange={updateSearch} />
        {/* <TextInput
          label="Search Programs"
          color="rgba(0, 0, 0, 0.3)"
          // eslint-disable-next-line react/no-unstable-nested-components
          leading={() => (
            <MaterialIcons name={'search'} size={28} color={'#00000080'} />
          )}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  // Margins
  mg_8: {
    margin: 8,
  },
  mg_16: {
    margin: 16,
  },
  mg_h_8: {
    marginHorizontal: 8,
  },
  mg_h_16: {
    marginHorizontal: 16,
  },
  mg_h_32: {
    marginHorizontal: 32,
  },
  mg_v_8: {
    marginVertical: 8,
  },
  mg_v_16: {
    marginVertical: 16,
  },
  mg_t_8: {
    marginTop: 8,
  },
  mg_t_16: {
    marginTop: 16,
  },
  mg_b_32: {
    marginBottom: 32,
  },
  mg_b_64: {
    marginBottom: 64,
  },
  mg_b_200: {
    marginBottom: 200,
  },
  mg_l_16: {
    marginLeft: 16,
  },
  mg_r_8: {
    marginRight: 8,
  },
  // Padding
  pd_4: {
    padding: 4,
  },
  pd_8: {
    padding: 8,
  },
  pd_h_4: {
    paddingHorizontal: 4,
  },
  pd_v_4: {
    paddingVertical: 4,
  },
  pd_b_100: {
    paddingBottom: 100,
  },
  // Background
  bg_white: {
    backgroundColor: 'white',
    flex: 1,
  },
  // Text
  text_input: {
    color: 'rgba(0, 0, 0, 0.3)',
  },
  text_center: {
    textAlign: 'center',
  },
  font_inter_16: {
    fontFamily: 'Inter-Regular',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 22,
  },
  font_inter_sb_16: {
    fontFamily: 'Inter-SemiBold',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 22,
  },
  font_inter_20: {
    fontFamily: 'Inter-Regular',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 18,
    lineHeight: 22,
  },
  font_inter_sb_20: {
    fontFamily: 'Inter-SemiBold',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
  },
  // flex
  flex: {
    display: 'flex',
    flex: 1,
    gap: 8,
  },
  flex_row: {
    flexDirection: 'row',
  },
  flex_wrap: {
    flexWrap: 'wrap',
  },
  flex_nowrap: {
    flexWrap: 'nowrap',
  },
  flex_justify_between: {
    justifyContent: 'space-around',
  },
  flex_justify_center: {
    justifyContent: 'center',
  },
  flex_align_center: {
    alignItems: 'center',
  },
  // WorkoutScreen Related
  btn_program_container: {
    width: 151,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  btn_program_body: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn_new_workout: {
    borderWidth: 2,
    borderColor: 'transparent',
    width: '90%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  // StartWorkoutScreen Related
  btn_container: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 15,
    overflow: 'hidden',
  },
  btn: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // AddExerciseScreen Related
  exercise_category_highlighted: {
    backgroundColor: '#3761F850',
  },
  exercise_category_collapsed: {
    height: 0,
    overflow: 'hidden',
  },
  exercise_item_container: {
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  exercise_icon: {
    marginLeft: 8,
    height: 56,
    width: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#000',
    resizeMode: 'contain',
  },
  // CreateRoutineScreen related
  routine_text_input: {
    color: 'rgba(0, 0, 0, 0.3)',
    width: width * 0.9,
    paddingHorizontal: 16,
    display: 'flex',
    alignItems: 'center',
  },
  // Refactor
  title: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter-Regular',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  headerWorkout: {
    paddingLeft: 10,
  },
  startWorkoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  spacing: {
    padding: 5,
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 35,
    opacity: 0.7,
  },
  placeholder: {
    opacity: 0.0,
  },
  body: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter-Regular',
  },
});

export {styles};
