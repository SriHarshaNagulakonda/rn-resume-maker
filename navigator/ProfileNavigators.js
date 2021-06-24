import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons,FontAwesome,FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';
import BasicScreen from '../screen/profile/Basic'
import EducationScreen from '../screen/profile/Education'
import SkillsScreen from '../screen/profile/Skills'
import ProjectsScreen from '../screen/profile/Projects'
import AchievementsScreen from '../screen/profile/Achievements'

import BasicDetailsScreen from '../screen/profile/add/BasicDetails';
import EditSkillScreen from '../screen/profile/add/EditSkill';
import EditAchievementScreen from '../screen/profile/add/EditAchievement';
import EditEducationScreen from '../screen/profile/add/EditEducation'
import EditProjectScreen from '../screen/profile/add/EditProject'

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: 'blue',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};


export const BasicNavigator = createStackNavigator({
        Basic: BasicScreen,
        BasicDetails: BasicDetailsScreen,
    },
    {
        navigationOptions: {
        drawerIcon: drawerConfig => (
            <FontAwesome name="user" size={24} color="blue" />
        )
        },
        defaultNavigationOptions: defaultNavOptions
    }
)

export const EducationNavigator = createStackNavigator({
    Education: EducationScreen,
    EditEducation: EditEducationScreen
},
{
    navigationOptions: {
    drawerIcon: drawerConfig => (
        <FontAwesome name="graduation-cap" size={24} color="blue" />
    )
    },
    defaultNavigationOptions: defaultNavOptions
}
)

export const SkillsNavigator = createStackNavigator({
    Skills: SkillsScreen,
    EditSkill: EditSkillScreen
},
{
    navigationOptions: {
    drawerIcon: drawerConfig => (
        <FontAwesome5 name="laptop-code" size={24} color="blue" />
    )
    },
    defaultNavigationOptions: defaultNavOptions
}
)

export const ProjectsNavigator = createStackNavigator({
    Projects: ProjectsScreen,
    EditProject: EditProjectScreen
},
{
    navigationOptions: {
    drawerIcon: drawerConfig => (
        <FontAwesome5 name="project-diagram" size={24} color="blue" />
    )
    },
    defaultNavigationOptions: defaultNavOptions
}
)

export const AchievementsNavigator = createStackNavigator({
        Achievements: AchievementsScreen,
        EditAchievement: EditAchievementScreen
    },
    {
        navigationOptions: {
        drawerIcon: drawerConfig => (
            <SimpleLineIcons name="trophy" size={24} color="blue" />
        )
        },
        defaultNavigationOptions: defaultNavOptions
    }
)