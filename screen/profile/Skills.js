import React, {useEffect} from 'react';
import { View, Text, FlatList, Button, Platform, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as Progress from 'react-native-progress';

import HeaderButton from '../../components/HeaderButton';
import SkillItem from '../../components/profile/SkillItem';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as skillsActions from '../../store/actions/skills';

const UserSkillsScreen = props => {
  const userSkills = useSelector(state => state.skill.availableSkills);
  console.log(userSkills)
  const dispatch = useDispatch();

  const editSkillHandler = id => {
    props.navigation.navigate('EditSkill', { skillId: id });
  };

  useEffect(() => {
    dispatch(skillsActions.fetchSkills());
  },[dispatch])

  const deleteHandler = id => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(skillsActions.deleteSkill(id));
        }
      }
    ]);
  };

  if (userSkills.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No skills found, maybe start creating some?</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userSkills}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <SkillItem
          name={itemData.item.name}
          value={itemData.item.value}
          onSelect={() => {
            editSkillHandler(itemData.item.id);
          }}
        >
        <Progress.Bar progress={itemData.item.value*0.01} width={180} height={20} />
          <FontAwesome name="pencil-square"    
              onPress={() => {
              editSkillHandler(itemData.item.id);
            }}
             size={24} color="#28a745" style={styles.icon} />
        
          <FontAwesome5 name="trash" size={24} color="red"   style={styles.icon} 
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </SkillItem>
      )}
    />
  );
};

UserSkillsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Skills',
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
            navData.navigation.navigate('EditSkill');
          }}
        />
      </HeaderButtons>
    )
  };
};

export default UserSkillsScreen;


const styles = StyleSheet.create({
  icon: {
    margin:5,
  }  
});