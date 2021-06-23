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
import * as projectsActions from '../../../store/actions/projects';

import { TextInput, Snackbar } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EditProjectScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
 
  const projectId = props.navigation.getParam('projectId');


  const editedProject = useSelector(state =>
    state.project.availableProjects.find(project => project.id === projectId)
  );

  useEffect(() => {
    if(projectId){
      setName(editedProject.name)
      setValue(editedProject.value);
    }
  },[projectId])
  

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
      if (editedProject) {
        await dispatch(
          projectsActions.updateProject(
            projectId,
            name,
            value,
          )
        );
      } else {
        await dispatch(
          projectsActions.createProject(
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
    
  }, [dispatch, projectId,name,value]);

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
                    onChangeText={(name) => setName(name)} />
                <TextInput style={styles.nameInput}
                    mode="flat"
                    left={<TextInput.Icon style={styles.inputIcon} name={() => <MaterialCommunityIcons name="percent-outline" size={24} color="black" />}  />}
                    label="Percentage"
                    keyboardType="numeric"
                    max="2" value={value}
                    onChangeText={(value) => setValue(value)} />
                 <Text style={styles.errorText}>{error}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProjectScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('projectId')
      ? 'Edit Project'
      : 'Add Project',
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

export default EditProjectScreen;
