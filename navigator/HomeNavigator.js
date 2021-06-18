import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from '../screen/user/Login'
import SignUpScreen from '../screen/user/SignUp'

const LoginNavigator = createStackNavigator(
    {
      Login: LoginScreen,
      SignUp: SignUpScreen,
    },
);


const MainNavigator = createSwitchNavigator({
    Login: LoginNavigator,
  });

export default createAppContainer(MainNavigator);