import React from 'react';
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  RkStyleSheet,
  RkText,
  RkTheme,
} from 'react-native-ui-kitten';
import {
  RkSwitch,
} from '../components';
import FontAwesome from 'fontawesome';


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      backgroundColor: '#0a1142',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  state = {
    sendPush: true,
    shouldRefresh: false,
  };

  onPushNotificationsSettingChanged = (value) => {
    this.setState({ sendPush: value });
  };

  onRefreshAutomaticallySettingChanged = (value) => {
    this.setState({ shouldRefresh: value });
  };

  _signOut = () => {
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='primary header6'>PROFILE SETTINGS</RkText>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton}>
              <RkText rkType='header6'>Edit Profile</RkText>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton}>
              <RkText rkType='header6'>Change Password</RkText>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <RkText rkType='header6'>Send Push Notifications</RkText>
            <RkSwitch
              style={styles.switch}
              value={this.state.sendPush}
              name="Push"
              onValueChange={this.onPushNotificationsSettingChanged}
            />
          </View>
          <View style={styles.row}>
            <RkText rkType='header6'>Refresh Automatically</RkText>
            <RkSwitch
              style={styles.switch}
              value={this.state.shouldRefresh}
              name="Refresh"
              onValueChange={this.onRefreshAutomaticallySettingChanged}
            />
          </View>
        </View>
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='primary header6'>SUPPORT</RkText>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton}>
              <RkText rkType='header6'>Help</RkText>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton}>
              <RkText rkType='header6'>Privacy Policy</RkText>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton}>
              <RkText rkType='header6'>Terms & Conditions</RkText>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.rowButton}
              onPress={this._signOut}
            >
              <RkText rkType='header6'>Logout</RkText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.base,
  },
  header: {
    paddingVertical: 25,
  },
  section: {
    marginVertical: 25,
  },
  heading: {
    paddingBottom: 12.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center',
  },
  rowButton: {
    flex: 1,
    paddingVertical: 24,
  },
  switch: {
    marginVertical: 14,
  },
}));
