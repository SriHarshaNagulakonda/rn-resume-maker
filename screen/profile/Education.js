import React, {useEffect} from 'react';
import { View, Text, FlatList, Button, Platform, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as Progress from 'react-native-progress';

import HeaderButton from '../../components/HeaderButton';
import EducationItem from '../../components/profile/EducationItem';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as educationsActions from '../../store/actions/educations';

const UserEducationsScreen = props => {
  const userEducations = useSelector(state => state.education.availableEducations);
  console.log(userEducations)
  const dispatch = useDispatch();

  const editEducationHandler = id => {
    props.navigation.navigate('EditEducation', { educationId: id });
  };

  useEffect(() => {
    dispatch(educationsActions.fetchEducations());
  },[dispatch])

  const deleteHandler = id => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(educationsActions.deleteEducation(id));
        }
      }
    ]);
  };

  if (userEducations.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No educations found, maybe start creating some?</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userEducations}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <EducationItem
          name={itemData.item.name}
          institution={itemData.item.institution}
          place={itemData.item.place}
          score={itemData.item.score}
          start={itemData.item.start}
          end={itemData.item.end}
          onSelect={() => {
            editEducationHandler(itemData.item.id);
          }}
        >

          <FontAwesome name="pencil-square"    
              onPress={() => {
              editEducationHandler(itemData.item.id);
            }}
             size={24} color="#28a745" style={styles.icon} />
        
          <FontAwesome5 name="trash" size={24} color="red"   style={styles.icon} 
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </EducationItem>
      )}
    />
  );
};

UserEducationsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Educations',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('EditEducation');
          }}
        />
      </HeaderButtons>
    )
  };
};

export default UserEducationsScreen;


const styles = StyleSheet.create({
  icon: {
    margin:5,
  }  
});