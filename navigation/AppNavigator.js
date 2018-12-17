import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import { LoginScreen, SignUpScreen} from '../screens/index';

const AuthStack = createStackNavigator({ Login: LoginScreen });
const SignUpStack = createStackNavigator(
  {
    email: SignUpScreen.email,
    name: SignUpScreen.name,
    dob: SignUpScreen.dob,
    password: SignUpScreen.password,
  },
  {
    initialRouteName: 'name',
  }
);

export default createSwitchNavigator(
  {
    App: MainTabNavigator,
    Auth: AuthStack,
    SignUp: SignUpStack,
  },
  {
    initialRouteName: 'App',
  }
);
