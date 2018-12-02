import React from 'react';
import {
  View,
  Image,
  Keyboard,
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkTheme,
  RkAvoidKeyboard,
} from 'react-native-ui-kitten';
import { GradientButton } from '../components/gradientButton';
import { scaleVertical } from '../utils/scale';

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };



  getThemeImageSource = (theme) => (require('../assets/images/moves-logo.png'));

  renderImage = () => (
    <Image style={styles.image} source={this.getThemeImageSource(RkTheme.current)} />
  );

  onNextButtonPressed = () => {
    this.props.navigation.goBack();
  };

  onSignInButtonPressed = () => {
    this.props.navigation.navigate('Auth');
  };

  render = () => (
    <RkAvoidKeyboard
      style={styles.screen}
      onStartShouldSetResponder={() => true}
      onResponderRelease={() => Keyboard.dismiss()}>
      <View style={styles.logo}>
        {this.renderImage()}
        <RkText rkType='h1'>Registration</RkText>
      </View>
      <View style={styles.content}>
        <View>
          <RkTextInput rkType='rounded' placeholder='Firstname' />
          <RkTextInput rkType='rounded' placeholder='Lastname' />
          <GradientButton
            style={styles.save}
            rkType='large'
            text='NEXT'
            onPress={this.nextButtonPressed}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.textRow}>
            <RkText rkType='primary3'>Already have an account?</RkText>
            <RkButton rkType='clear' onPress={this.onSignInButtonPressed}>
              <RkText rkType='header6'> Sign in now</RkText>
            </RkButton>
          </View>
        </View>
      </View>
    </RkAvoidKeyboard>
  )
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: theme.colors.screen.base,
  },
  image: {
    marginBottom: 10,
    height: scaleVertical(77),
    resizeMode: 'contain',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  content: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  save: {
    marginVertical: 20,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 24,
    marginHorizontal: 24,
    justifyContent: 'space-around',
  },
  footer: {
    justifyContent: 'flex-end',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));
