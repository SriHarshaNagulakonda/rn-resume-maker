import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from '../screen/auth/Login'
import SignUpScreen from '../screen/auth/SignUp'
import PDFScreen from '../components/PdfViewer'
import { BasicNavigator, EducationNavigator, SkillsNavigator, ProjectsNavigator, AchievementsNavigator } from './ProfileNavigators'
import { DrawerItems } from 'react-navigation-drawer';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import TemplatesScreen from '../screen/Templates'
import ProfileScreen from '../screen/profile/Profile';
import { Entypo,FontAwesome5  } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth'

const LoginNavigator = createStackNavigator(
    {
      Login: LoginScreen,
      SignUp: SignUpScreen,
    },
);

const ResumeNavigator = createStackNavigator({
    Templates: TemplatesScreen,
    PDFViewer: PDFScreen,  
})



const ProfileNavigator = createDrawerNavigator({
    Basic: BasicNavigator,
    Education: EducationNavigator,
    Skills: SkillsNavigator,
    Projects: ProjectsNavigator,
    Achievements: AchievementsNavigator
},
{
  contentOptions: {
    activeTintColor: 'blue'
  },
  contentComponent: props => {
    const dispatch = useDispatch();
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...props} />
          <Button
            title="Logout"
            color='blue'
            onPress={() => {
              dispatch(authActions.logout());
              props.navigation.navigate('Login')
            }}
          />
        </SafeAreaView>
      </View>
    );
  }
}
)

const HomeTabNavigator =  createMaterialBottomTabNavigator({
  Resume: {
    screen: ResumeNavigator,
    navigationOptions:{
      tabBarIcon: (tabInfo) => {
        return <Entypo name="newsletter" size={24} color={tabInfo.tintColor} />
      },
      tabBarColor: "blue"
    }
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions:{
      tabBarLabel:"Profile",
      tabBarIcon: (tabInfo) => {
        return <FontAwesome5 name="user-tie" size={24} color={tabInfo.tintColor} />
      }
    },
    tabBarColor: "#0275d8"
  },
},{
    activeColor: "white",
    shifting:true
})

const MainNavigator = createSwitchNavigator({
    Login:  LoginNavigator,
    Home: HomeTabNavigator
  }
);

export default createAppContainer(MainNavigator);