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
import { GradientButton } from '../../components/gradientButton';
import { scaleVertical } from '../../utils/scale';
import { validNameCheck } from '../../utils/stringCheck';

export default class Email extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      canActiveNextButton: false,
    }
  }

  getThemeImageSource = (theme) => (require('../../assets/images/moves-logo.png'));

  renderImage = () => (
    <Image style={styles.image} source={this.getThemeImageSource(RkTheme.current)} />
  );

  onNextButtonPressed = () => {
    const { navigation } = this.props;
    if (this.state.canActiveNextButton) {
      signUpData = this._createNewSignUpData({
        first: this.state.first,
        last: this.state.last
      });
      navigation.navigate('dob', {signUpData});
    }
  };

  _createNewSignUpData = (newData) => Object.assign(newData, this._getSignUpData());

  _getSignUpData = () => this.props.navigation.getParam('signUpData', {});

  onSignInButtonPressed = () => {
    this.props.navigation.navigate('Auth');
  };

  _setFirstname = (first) => {
    this.setState({first: first});
    this._validInput();
  };

  _setLastname = (last) => {
    this.setState({last: last});
    this._validInput();
  };

  _validInput = () => {
    let isValid = validNameCheck(this.state.first) && validNameCheck(this.state.last);
    this.setState({canActiveNextButton: isValid});
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
          <RkTextInput rkType='rounded' placeholder='Firstname' onChangeText={this._setFirstname}/>
          <RkTextInput rkType='rounded' placeholder='Lastname' onChangeText={this._setLastname}/>
          <GradientButton
            style={this.state.canActiveNextButton ? styles.activeButton : styles.deactiveButton}
            rkType='large'
            text='NEXT'
            onPress={this.onNextButtonPressed}
            disabled={!this.state.canActiveNextButton}
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
  activeButton: {
    marginVertical: 30,
  },
  deactiveButton: {
    marginVertical: 30,
    opacity: 0.5,
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
