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
import { FontAwesome, Ionicons, Entypo, Foundation,FontAwesome5, Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker'

import HeaderButton from '../../../components/HeaderButton';
import * as projectsActions from '../../../store/actions/projects';

import { TextInput, Snackbar } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { set } from 'react-native-reanimated';


const EditProjectScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [live_url, setLiveUrl] = useState("");
  const [code_url, setCodeUrl] = useState("");
  const [start, setStart] = useState();
  const [end, setEnd] = useState("");
  
  const projectId = props.navigation.getParam('projectId');


  const editedProject = useSelector(state =>
    state.project.availableProjects.find(project => project.id === projectId)
  );

  useEffect(() => {
    if(projectId){
      setName(editedProject.name)
      setDescription(editedProject.description)
      setLiveUrl(editedProject.live_url)
      setCodeUrl(editedProject.code_url)
      setStart(editedProject.start)
      setEnd(editedProject.end)
    }
  },[projectId])
  

  const dispatch = useDispatch();

  const submitHandler = useCallback(async () => {
    if(name.trim().length === 0){
      setError('Name is required')
      return;
    }
    if(description.trim().length === 0){
      setError('Institutaion is required')
      return;
    }
    if(live_url.trim().length === 0){
      setLiveUrl('#')
    }
    if(code_url.trim().length === 0){
      setCodeUrl('#')
    }
    if(start.trim().length === 0){
      setError('Start Date is required')
      return;
    }
    if(end.trim().length === 0){
      setError('End Date  is required')
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
            description,
            live_url,
            code_url,
            start,
            end
          )
        );
      } else {
        await dispatch(
          projectsActions.createProject(
            name,
            description,
            live_url,
            code_url,
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
    
  }, [dispatch, projectId,name,description,live_url,code_url,start,end]);

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
            live_urlholder="Eg: Project Name"
            onChangeText={(name) => setName(name)} />
        <TextInput style={styles.nameInput}
            mode="flat"
            left={<TextInput.Icon style={styles.inputIcon} name={() => <MaterialIcons name="description" size={24} color="black" />}  />}
            label="Description"
             value={description}
            onChangeText={(description) => setDescription(description)} />
        <TextInput style={styles.nameInput}
            mode="flat"
            left={<TextInput.Icon style={styles.inputIcon} name={() =><Feather name="external-link" size={24} color="black" />}  />}
            label="Live Url"
             value={live_url}
            live_urlholder="Eg: https://github.com/"
            onChangeText={(live_url) => setLiveUrl(live_url)} />
        <TextInput style={styles.nameInput}
            mode="flat"
            left={<TextInput.Icon style={styles.inputIcon} name={() => <Entypo name="code" size={24} color="black" />}  />}
            label="Code Url"
             value={code_url}
            placeholder="Eg: https://github.com"
            onChangeText={(code_url) => setCodeUrl(code_url)} />
              <DatePicker
                style={styles.nameInput}
                date={start}
                mode="date"
                placeholder="Start Date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(start) => setStart(start)}
               />

            <DatePicker
                style={styles.nameInput}
                date={end}
                mode="date"
                placeholder="End Date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(end) => setEnd(end)}
               />

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
  daterangecontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }

});

export default EditProjectScreen;
