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
import * as achievementsActions from '../../../store/actions/achievements';

import { TextInput, Snackbar } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const EditAchievementScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
 
  const achievementId = props.navigation.getParam('achievementId');


  const editedAchievement = useSelector(state =>
    state.achievement.availableAchievements.find(achievement => achievement.id === achievementId)
  );

  useEffect(() => {
    if(achievementId){
      setTitle(editedAchievement.title)
      setDescription(editedAchievement.description);
    }
  },[achievementId])
  

  const dispatch = useDispatch();

  const submitHandler = useCallback(async () => {
    if(title.trim().length === 0){
      setError('Title is required')
      return;
    }
    if(title.trim().length === 0){
      setError("Description is required")
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedAchievement) {
        await dispatch(
          achievementsActions.updateAchievement(
            achievementId,
            title,
            description,
          )
        );
      } else {
        await dispatch(
          achievementsActions.createAchievement(
            title,
            description
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
    
  }, [dispatch, achievementId,title,description]);

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
                    left={<TextInput.Icon style={styles.inputIcon} name={() =><Entypo name="trophy" size={24} color="black" />}  />}
                    label="Title" value={title}
                    onChangeText={(title) => setTitle(title)} />
                <TextInput style={styles.textArea}
                    mode="flat"
                    left={<TextInput.Icon style={styles.inputIcon} name={() => <MaterialIcons name="description" size={24} color="black" />}  />}
                    label="Description"
                    numberOfLines={4}
                    multiline
                    value={description}
                    onChangeText={(description) => setDescription(description)} />
                 <Text style={styles.errorText}>{error}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditAchievementScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('achievementId')
      ? 'Edit Achievement'
      : 'Add Achievement',
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
  textArea: {
    height: 100,
    width: '85%',
    marginLeft: 40,
    borderBottomWidth: 1,
    marginTop:  30,
    borderColor:'blue',
    paddingBottom:10
  },

});

export default EditAchievementScreen;
