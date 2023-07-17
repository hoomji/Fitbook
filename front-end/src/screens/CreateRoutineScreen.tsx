import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
  } from 'react-native';
  import {
    Pressable,
    Text,
    Button,
    TextInput,
    Flex,
  } from '@react-native-material/core';
  import React, {useEffect, useState} from 'react';
  import {NativeStackScreenProps} from '@react-navigation/native-stack';
  import {RootStackParamList} from '../types/navigation';
  import {styles} from './WorkoutScreen';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import {Dictionary, Exercise, Set} from '../types/workout';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import { Alert } from 'react-native';
  import Toast from 'react-native-toast-message';
  
  type Props = NativeStackScreenProps<RootStackParamList, 'CreateRoutine'>;
  
  const ExerciseEntry = (props: any) => {
    const [input, setInput] = React.useState<string>(props.exercise.notes);
  
    const updateNoteInput = (text: string) => {
      props.navData[props.exercise.name].notes = text;
      setInput(text);
    };
  
    return (
      <View style={[styles.mg_v_16]}>
        <View style={[{height: 72}]}>
          <View
            style={[
              styles.mg_v_8,
              styles.flex,
              styles.flex_row,
              styles.flex_justify_between,
              styles.flex_align_center,
            ]}>
            <View
              style={[
                styles.flex,
                styles.flex_wrap,
                styles.flex_row,
                styles.flex_align_center,
              ]}>
              <View>
                <Image
                  source={require('../assets/images/FitBook_logo3.png')}
                  style={[styles.exercise_icon]}
                />
              </View>
              <View>
                <Text style={[styles.font_inter_sb_16]}>
                  {props.exercise.name}
                </Text>
                <Text style={[styles.font_inter_16]}>
                  {props.exercise.equipment == ''
                    ? 'No equipment'
                    : props.exercise.equipment}
                </Text>
              </View>
            </View>
            <Ionicons name={'ellipsis-vertical'} size={28} color={'#555'} />
          </View>
        </View>
        <TextInput
          label="Add notes here..."
          color="rgba(0, 0, 0, 0.3)"
          variant="standard"
          value={input}
          style={[styles.mg_v_8]}
          onChangeText={text => updateNoteInput(text)}></TextInput>
        <View style={[{height: 48}]}>
          <View
            style={[
              styles.mg_v_8,
              styles.flex,
              styles.flex_row,
              styles.flex_justify_between,
              styles.flex_align_center,
            ]}>
            <Text style={[styles.font_inter_16, {flex: 1}]}>Set</Text>
            {props.exercise.hasWeights ? (
              <Text style={[styles.font_inter_16, {flex: 1}]}>Lbs</Text>
            ) : undefined}
            <Text style={[styles.font_inter_16, {flex: 1}]}>Reps</Text>
          </View>
        </View>
        {props.exercise.sets.map((set: Set) => {
          return (
            <ExerciseSets
              key={`${props.exercise._id}_${set.set}`}
              name={props.exercise.name}
              set={set}
              hasWeights={props.exercise.hasWeights}
              updateWeightReps={props.updateWeightReps}
              ></ExerciseSets>
          );
        })}
        <View
          style={[
            styles.flex,
            styles.flex_wrap,
            styles.flex_row,
            styles.flex_justify_between,
            styles.flex_align_center,
          ]}>
          <View style={[styles.mg_v_8, styles.btn_container, {width: 140}]}>
            <Pressable
              pressEffectColor="#fff"
              style={[styles.btn, {backgroundColor: 'rgba(55, 97, 248, 0.8)'}]}
              onPress={() => {
                props.pushFunc(props.exercise.name, props.exercise.sets.length);
              }}>
              <Text
                style={[
                  styles.font_inter_sb_16,
                  styles.text_center,
                  {color: '#fff'},
                ]}>
                Add set
              </Text>
            </Pressable>
          </View>
          <View style={[styles.mg_v_8, styles.btn_container, {width: 140}]}>
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor:
                    props.exercise.sets.length - 1 ? '#FB8E40' : '#d9d9d9',
                },
              ]}
              onPress={() => {
                props.popFunc(props.exercise.name, props.exercise.sets.length);
              }}>
              <Text
                style={[
                  styles.font_inter_sb_16,
                  styles.text_center,
                  {color: '#fff'},
                ]}>
                Remove set
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  const ExerciseSets = (props: any) => {
  
    const [weight, setWeight] = useState(0);
    const [reps, setReps] = useState(0);
  
    return (
      <View>
        <View style={[{height: 52}]}>
          <View
            style={[
              styles.mg_v_8,
              styles.flex,
              styles.flex_row,
              styles.flex_justify_between,
              styles.flex_align_center,
            ]}>
            <Text style={[styles.font_inter_16, {flex: 1}]}>
              {props.set.set + 1}
            </Text>
            {props.hasWeights ? (
              <TextInput
                color="rgba(0, 0, 0, 0.3)"
                variant="standard"
                style={[styles.mg_v_8, {flex: 1}]}
                keyboardType="numeric"
                placeholder='0'
                onChangeText={text => {
                  props.updateWeightReps(props.name, props.set.set, parseInt(text), reps),
                  setWeight(parseInt(text))}
                }></TextInput>
            ) : undefined}
            <TextInput
              color="rgba(0, 0, 0, 0.3)"
              variant="standard"
              style={[styles.mg_v_8, {flex: 1}]}
              keyboardType="numeric"
              placeholder='0'
              onChangeText={
                text => {props.updateWeightReps(props.name, props.set.set, weight, parseInt(text)),
                setReps(parseInt(text))}
                }></TextInput>
          </View>
        </View>
      </View>
    );
  };
  
  const CreateRoutineScreen = ({route, navigation}: Props) => {
    // Related to passing data between AddExercise and CreateRoutineScreen
    const navData: Dictionary<Exercise> =
      route.params?.navData != undefined ? route.params?.navData : {};
    const [exercise, setExercise] = useState<Dictionary<Exercise>>(navData);
    const [existingExercises, setExistingExercises] = useState<Dictionary<Exercise>>({});
    const mergedExercises = { ...existingExercises, ...navData };
    const [routineName, setRoutineName] = useState<string>("");
  
    useEffect(() => {
      setExistingExercises(prevExercises => ({ ...prevExercises, ...navData }));
      return;
    }, [navData]);
  
    // Set functions
  
    const PushSet = (name: string, count: number) => {
      // Update the sets for the exercise in the mergedExercises object
      mergedExercises[name].sets.push({
        set: count,
        lbs: 0,
        reps: 0,
        isComplete: false
      });
  
      setExistingExercises({...mergedExercises});
    }
  
    const PopSet = (name: string) => {
      if (mergedExercises[name].sets.length > 1) {
        // Remove the last set for the exercise in the mergedExercises object
        mergedExercises[name].sets.pop();
  
        // Update the state with the mergedExercises object
        setExistingExercises({ ...mergedExercises });
      }
    };
  
    const updateWeightReps = (name: string, set: number, weight: number, reps: number) => {
      const exercisesCopy = existingExercises;
      exercisesCopy[name].sets[set] = {
        set: exercisesCopy[name].sets[set].set,
        lbs: weight,
        reps: reps,
        isComplete: false
      }
      setExistingExercises(exercisesCopy);
    }
  
    // API functions
  
    const postRoutine = async () => {
      const routine = {
        name: routineName,
        description: "",
        exercises: JSON.stringify(existingExercises),
      };
      try {
        const response = await fetch('http://localhost:3000/api/routines/create',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(routine),
        });
        const data = await response.json();
        if (response.ok) {
          // Handler for successful response
          console.log('Success');
          navigation.goBack();
        } else {
          const errorMessage = data.message; //|| 'SignUp Failed';
          let errorMessageInfo = 'Unknown Error';
          console.log('Endpoint rejected, ', errorMessage.code);
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Upload failed',
            text2: errorMessageInfo,
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Upload failed',
            text2: error.message,
          });
        } else {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Upload failed',
            text2: 'Unknown error',
          });
        }
        console.log("Error");
      }
    }
  
    const handleFinishWorkout = () => {
      if (Object.keys(existingExercises).length == 0) {
        Alert.alert("Please add an exercise first.")
        return;
      }
  
      Alert.alert(
        "Upload your routine?",  // Alert title
        "Are you sure you want to upload your routine?", // Alert message
        [
          {
            text: "Cancel",
            onPress: () => {}, // If the user cancels, do nothing
            style: "cancel"
          },
          { 
            text: "Yes!", 
            
            onPress: () => postRoutine(),
          }
        ]
      );
    }
    
    return (
      <SafeAreaView style={[styles.bg_white]}>
        <View
          style={[
            styles.mg_16,
            styles.pd_8,
            styles.flex_row,
            styles.flex_align_center,
          ]}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Discard your workout?",  // Alert title
                "Are you sure you want to discard your workout? This action cannot be undone.", // Alert message
                [
                  {
                    text: "Cancel",
                    onPress: () => {}, // If the user cancels, do nothing
                    style: "cancel"
                  },
                  { 
                    text: "Discard", 
                    onPress: () => navigation.goBack(),
                    style: "destructive"
                  }
                ]
              );
            
              return true; // By returning true, the default behavior of back button is overwritten
            }}>
            <MaterialIcons name={'arrow-back-ios'} size={20} color={'#000000'} />
          </TouchableOpacity>
          <Text style={[styles.font_inter_20]}>New Routine</Text>
            <Pressable
                pressEffectColor="#fff"
                style={[styles.btn, {backgroundColor: 'rgba(55, 97, 248, 0.8)', display: 'flex', marginLeft: 90, width:'30%', padding:0}]}
                onPress={handleFinishWorkout}>
                <Text
                style={[
                    styles.font_inter_sb_16,
                    styles.text_center,
                    {color: '#fff'},
                ]}>
                Finish
                </Text>
            </Pressable>
        </View>
        <View>
            <TextInput
            placeholder="Title of Workout"
            style={[styles.mg_v_8, styles.routine_text_input, {marginLeft: 20}]}
            color="rgba(55, 97, 248, 0.8)"
            variant="standard"
            onChangeText={text => setRoutineName(text)}
            autoCapitalize="none"
            />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={[styles.mg_h_16, styles.mg_v_8]}>
          <View>
            {Object.keys(existingExercises).length ? (
              Object.keys(existingExercises).map((key: string) => {
                return (
                  <ExerciseEntry
                    key={existingExercises[key]._id}
                    exercise={existingExercises[key]}
                    navData={navData}
                    pushFunc={PushSet}
                    popFunc={PopSet}
                    updateWeightReps={updateWeightReps}
                  />
                );
              })
            ) : (
              <Text
                style={[
                  styles.mg_t_16,
                  styles.pd_h_4,
                  styles.font_inter_20,
                  styles.text_center,
                ]}>
                Get started by adding an exercise
              </Text>
            )}
            <View style={[styles.mg_v_8, styles.btn_container]}>
              <Pressable
                pressEffectColor="#fff"
                style={[styles.btn, {backgroundColor: 'rgba(55, 97, 248, 0.8)'}]}
                onPress={() => navigation.navigate('RoutineAddExercise', {navData: exercise})}>
                <Text
                  style={[
                    styles.font_inter_sb_16,
                    styles.text_center,
                    {color: '#fff'},
                  ]}>
                  Add exercise
                </Text>
              </Pressable>
            </View>
            <View style={[styles.mg_v_8, styles.mg_b_64, styles.btn_container]}>
              <Pressable
                pressEffectColor="#fff"
                style={[styles.btn, {backgroundColor: '#d9d9d9'}]}>
                <Text style={[styles.font_inter_sb_16, styles.text_center]}>
                  Options
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default CreateRoutineScreen;
  