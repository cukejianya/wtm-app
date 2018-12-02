import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import { LoginScreen, SignUpScreen } from '../screens/index';

const AuthStack = createStackNavigator({ Login: LoginScreen });
const SignUpStack = createStackNavigator({ SignUp: SignUpScreen });

export default createSwitchNavigator(
  {
    App: MainTabNavigator,
    Auth: AuthStack,
    SignUp: SignUpStack,
  },
  {
    initialRouteName: 'SignUp',
  }
);
