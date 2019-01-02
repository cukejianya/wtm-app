import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import { LinksScreen, LoginScreen, SignUpScreen} from '../screens/index';

const AppStack = createStackNavigator({Map: LinksScreen})
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
    App: AppStack,
    Auth: AuthStack,
    SignUp: SignUpStack,
  },
  {
    initialRouteName: 'App',
  }
);
