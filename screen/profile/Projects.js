import React, {useEffect} from 'react';
import { View, Text, FlatList, Button, Platform, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import ProjectItem from '../../components/profile/ProjectItem';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as projectsActions from '../../store/actions/projects';

const UserProjectsScreen = props => {
  const userProjects = useSelector(state => state.project.availableProjects);
  console.log(userProjects)
  const dispatch = useDispatch();

  const editProjectHandler = id => {
    props.navigation.navigate('EditProject', { projectId: id });
  };

  useEffect(() => {
    dispatch(projectsActions.fetchProjects());
  },[dispatch])

  const deleteHandler = id => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(projectsActions.deleteProject(id));
        }
      }
    ]);
  };

  if (userProjects.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No projects found, maybe start creating some?</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProjects}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProjectItem
          name={itemData.item.name}
          description={itemData.item.description}
          live_url={itemData.item.live_url}
          code_url={itemData.item.code_url}
          start={itemData.item.start}
          end={itemData.item.end}
          onSelect={() => {
            editProjectHandler(itemData.item.id);
          }}
        >

          <FontAwesome name="pencil-square"    
              onPress={() => {
              editProjectHandler(itemData.item.id);
            }}
             size={30} color="#28a745" style={styles.icon} />
        
          <FontAwesome5 name="trash" size={30} color="red"   style={styles.icon} 
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProjectItem>
      )}
    />
  );
};

UserProjectsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Projects',
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
            navData.navigation.navigate('EditProject');
          }}
        />
      </HeaderButtons>
    )
  };
};

export default UserProjectsScreen;


const styles = StyleSheet.create({
  icon: {
    margin:5,
  }  
});