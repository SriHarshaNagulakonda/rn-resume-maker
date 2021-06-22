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

import HeaderButton from '../../../components/HeaderButton';
import * as skillsActions from '../../../store/actions/skills';

import { TextInput, Snackbar } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EditSkillScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
 
  const skillId = props.navigation.getParam('skillId');


  const editedSkill = useSelector(state =>
    state.skill.availableSkills.find(skill => skill.id === skillId)
  );

  useEffect(() => {
    if(skillId){
      setName(editedSkill.name)
      setValue(editedSkill.value);
    }
  },[skillId])
  

  const dispatch = useDispatch();

  const submitHandler = useCallback(async () => {
    if(name.trim().length === 0){
      setError('Name is required')
      return;
    }
    if(value>100||value<0||value.length==0){
      setError("Percentage invalid")
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedSkill) {
        await dispatch(
          skillsActions.updateSkill(
            skillId,
            name,
            value,
          )
        );
      } else {
        await dispatch(
          skillsActions.createSkill(
            name,
            value
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
    
  }, [dispatch, skillId,name,value]);

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
                    left={<TextInput.Icon style={styles.inputIcon} name={() => <FontAwesome name="user-secret" size={28} color="black" />}  />}
                    label="Name" value={name}
                    onChangeText={(name) => setName(name)} />
                <TextInput style={styles.nameInput}
                    mode="flat"
                    left={<TextInput.Icon style={styles.inputIcon} name={() => <MaterialCommunityIcons name="percent-outline" size={24} color="black" />}  />}
                    label="Percentage"
                    keyboardType="number-pad"
                    max="2" value={value}
                    onChangeText={(value) => setValue(value)} />
                 <Text style={styles.errorText}>{error}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditSkillScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('skillId')
      ? 'Edit Skill'
      : 'Add Skill',
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

export default EditSkillScreen;
