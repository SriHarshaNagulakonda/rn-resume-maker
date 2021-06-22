import React, {useEffect} from 'react';
import { View, Text, FlatList, Button, Platform, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as Progress from 'react-native-progress';

import HeaderButton from '../../components/HeaderButton';
import AchievementItem from '../../components/profile/AchievementItem';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as achievementsActions from '../../store/actions/achievements';

const UserAchievementsScreen = props => {
  const userAchievements = useSelector(state => state.achievement.availableAchievements);
  console.log(userAchievements)
  const dispatch = useDispatch();

  const editAchievementHandler = id => {
    props.navigation.navigate('EditAchievement', { achievementId: id });
  };

  useEffect(() => {
    dispatch(achievementsActions.fetchAchievements());
  },[dispatch])

  const deleteHandler = id => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(achievementsActions.deleteAchievement(id));
        }
      }
    ]);
  };

  if (userAchievements.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No achievements found, maybe start creating some?</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userAchievements}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <AchievementItem
          title={itemData.item.title}
          description={itemData.item.description}
          onSelect={() => {
            editAchievementHandler(itemData.item.id);
          }}
        >

          <FontAwesome name="pencil-square"    
              onPress={() => {
              editAchievementHandler(itemData.item.id);
            }}
             size={24} color="#28a745" style={styles.icon} />
        
          <FontAwesome5 name="trash" size={24} color="red"   style={styles.icon} 
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </AchievementItem>
      )}
    />
  );
};

UserAchievementsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Achievements',
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
            navData.navigation.navigate('EditAchievement');
          }}
        />
      </HeaderButtons>
    )
  };
};

export default UserAchievementsScreen;


const styles = StyleSheet.create({
  icon: {
    margin:5,
  }  
});