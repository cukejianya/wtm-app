import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import {LoginScreen} from '../screens/index';

const AuthStack = createStackNavigator({ Login: LoginScreen });

export default createSwitchNavigator(
  {
    App: MainTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
);
