import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome, Ionicons, Entypo, Foundation,FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import HeaderButton from '../../../components/HeaderButton';
import * as educationsActions from '../../../store/actions/educations';

import { TextInput, Snackbar } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const EditEducationScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [place, setPlace] = useState("");
  const [score, setScore] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  
  const educationId = props.navigation.getParam('educationId');


  const editedEducation = useSelector(state =>
    state.education.availableEducations.find(education => education.id === educationId)
  );

  useEffect(() => {
    if(educationId){
      setName(editedEducation.name)
      setInstitution(editedEducation.institution)
      setPlace(editedEducation.place)
      setScore(editedEducation.score)
      setStart(editedEducation.start)
      setEnd(editedEducation.end)
    }
  },[educationId])
  

  const dispatch = useDispatch();

  const submitHandler = useCallback(async () => {
    if(name.trim().length === 0){
      setError('Name is required')
      return;
    }
    if(institution.trim().length === 0){
      setError('Institutaion is required')
      return;
    }
    if(place.trim().length === 0){
      setError('Institutaion is required')
      return;
    }
    if(score.trim().length === 0){
      setError('Score is required')
      return;
    }
    if(start.trim().length === 0){
      setError('Start year is required')
      return;
    }
    if(end.trim().length === 0){
      setError('End Year  is required')
      return;
    }
    if(start>end){
      setError('Start Year must be < End Year')
      return;
    }
    
    setError(null);
    setIsLoading(true);
    try {
      if (editedEducation) {
        await dispatch(
          educationsActions.updateEducation(
            educationId,
            name,
            institution,
            place,
            score,
            start,
            end
          )
        );
      } else {
        await dispatch(
          educationsActions.createEducation(
            name,
            institution,
            place,
            score,
            start,
            end
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
    
  }, [dispatch, educationId,name,institution,place,score,start,end]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
        <TextInput style={styles.nameInput}
            mode="flat"
            left={<TextInput.Icon style={styles.inputIcon} name={() =><FontAwesome5 name="laptop-code" size={24} color="black" />}  />}
            label="Name" value={name}
            placeholder="Eg: Graduation / School etc.."
            onChangeText={(name) => setName(name)} />
        <TextInput style={styles.nameInput}
            mode="flat"
            left={<TextInput.Icon style={styles.inputIcon} name={() => <FontAwesome name="institution" size={24} color="black" />}  />}
            label="Institution"
            max="2" value={institution}
            onChangeText={(institution) => setInstitution(institution)} />
        <TextInput style={styles.nameInput}
            mode="flat"
            left={<TextInput.Icon style={styles.inputIcon} name={() =><MaterialIcons name="place" size={24} color="black" />}  />}
            label="Place"
            max="2" value={place}
            placeholder="Eg: Hyderabad"
            onChangeText={(place) => setPlace(place)} />
        <TextInput style={styles.nameInput}
            mode="flat"
            left={<TextInput.Icon style={styles.inputIcon} name={() => <MaterialCommunityIcons name="percent" size={24} color="black" />}  />}
            label="Score"
            max="2" value={score}
            keyboardType="numeric"
            onChangeText={(score) => setScore(score)} />
        <TextInput style={styles.nameInput}
            mode="flat"
            left={<TextInput.Icon style={styles.inputIcon} name={() => <AntDesign name="calendar" size={24} color="black" />}  />}
            label="Start Year"
            max="2" value={start}
            keyboardType="numeric"
            placeholder="Eg: 2017"
            onChangeText={(start) => setStart(start)} />
        <TextInput style={styles.nameInput}
            mode="flat"
            left={<TextInput.Icon style={styles.inputIcon} name={() => <AntDesign name="calendar" size={24} color="black" />}  />}
            label="End Year"
            max="2" value={end}
            keyboardType="numeric"
            placeholder="Eg: 2021"
            onChangeText={(end) => setEnd(end)} />
        
                 <Text style={styles.errorText}>{error}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditEducationScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('educationId')
      ? 'Edit Education'
      : 'Add Education',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameInput: {
    height: 50,
    width: '85%',
    marginLeft: 40,
    borderBottomWidth: 1,
    marginTop:  30,
    borderColor:'blue',
    paddingBottom:10
  },
  inputIcon: {
    marginTop:15
  },
  errorText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center'
  },
});

export default EditEducationScreen;
