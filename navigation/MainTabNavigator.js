import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { TabBarIcon } from '../components/index';
import { HomeScreen, MapScreen, SettingsScreen } from '../screens/index';

const _mapNavigationOptions = (label, iconType) => {
  return {
    tabBarLabel: label,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
          ? `ios-${iconType}${focused ? '' : '-outline'}`
            : `md-${iconType}`
        }
      />
    ),
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

// HomeStack.navigationOptions = _mapNavigationOptions('Home', 'home');

const MapStack = createStackNavigator({
  Map: MapScreen,
});

MapStack.navigationOptions = _mapNavigationOptions('Map', 'map');

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = _mapNavigationOptions('Settings', 'options');

export default createBottomTabNavigator({
    // HomeStack,
  MapStack,
  SettingsStack,
});
