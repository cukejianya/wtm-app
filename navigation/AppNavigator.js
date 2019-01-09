import React from 'react';
import { Animated, Easing } from 'react-native'
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import { MapScreen, ListScreen, LoginScreen, SignUpScreen} from '../screens/index';

const transitionConfig = () => {
  let transitionSpec = {
    duration: 100,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  }

  let screenInterpolator = sceneProps => {
    const { position, scene } = sceneProps;
    const thisSceneIndex = scene.index;

    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [0, 1],
    });
    return { opacity };
  }

  return {
    transitionSpec,
    screenInterpolator,
  }
}

const AppStack = createStackNavigator(
  {
    Map: MapScreen,
    List: ListScreen,
  },
  {
    initialRouteName: 'Map',
    transitionConfig,
  }
)

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
