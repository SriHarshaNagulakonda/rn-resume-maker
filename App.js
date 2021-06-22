import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import MainNavigator from './navigator/MainNavigator';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createPromise } from 'redux-promise-middleware'

import authReducer from './store/reducers/auth'
import basicReducer from './store/reducers/Basic'
import skillReducer from './store/reducers/skills'
import achievementReducer from './store/reducers/achievements'

const rootReducer = combineReducers({
  auth: authReducer,
  basic: basicReducer,
  skill: skillReducer,
  achievement: achievementReducer
});

const store = createStore(rootReducer,applyMiddleware(createPromise(), thunk, createLogger()));


export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
