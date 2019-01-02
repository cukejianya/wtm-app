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
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import FontAwesome from 'fontawesome';
import { GradientButton } from '../components/gradientButton';
import { scaleVertical } from '../utils/scale';


export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showErrorMessage: false,
    }
  };

  async onLoginButtonPressed() {
    this.setState({showErrorMessage: false })
    //let response = await this._postAuth('http://cukejianya.com:3000/login');
   let response = {}
   console.log(response);
    let testingLogin = this.state.email === 'movesApp@gmail.com' && this.state.password === 'password1'
    if (response.success || testingLogin) {
      this.props.navigation.navigate('App');
    }
    this.setState({showErrorMessage: true })
  };

  onSignUpButtonPressed = () => {
    this.props.navigation.navigate('SignUp');
  };

  async _postAuth(url) {
    let body = {
      email: this.state.email,
      password: this.state.password,
    }
    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
      });
    } catch (err) {
      return err;
    }

    return response.json();
  };

  _setEmail = (email) => {
    this.setState({email: email})
  };

  _setPassword = (password) => {
    this.setState({password: password})
  };

  getThemeImageSource = (theme) => (require('../assets/images/moves-logo.png'));

  renderImage = () => (
    <Image style={styles.image} source={this.getThemeImageSource(RkTheme.current)} />
  );

  render = () => {
    let errorMessage;
    if (this.state.showErrorMessage) {
      errorMessage = (
        <RkText rkType='secondary6'>
          Password can contain letters, numbers and punctuation.
        </RkText>
      )
    } else {
      errorMessage = '';
    }
    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => Keyboard.dismiss()}>
        <View style={styles.header}>
          {this.renderImage()}
          <RkText rkType='light h1'>Moves</RkText>
          <RkText rkType='logo h0'>What's The Move?</RkText>
        </View>
        <View style={styles.buttons}>
          <RkButton style={styles.button} rkType='social'>
            <RkText rkType='awesome hero'>{FontAwesome.twitter}</RkText>
          </RkButton>
          <RkButton style={styles.button} rkType='social'>
            <RkText rkType='awesome hero'>{FontAwesome.google}</RkText>
          </RkButton>
          <RkButton style={styles.button} rkType='social'>
            <RkText rkType='awesome hero'>{FontAwesome.facebook}</RkText>
          </RkButton>
        </View>
        <View style={styles.content}>
          <View>
            <RkTextInput
              rkType='rounded'
              autoCapitalize='none'
              placeholder='Email'
              onChangeText={text => {this._setEmail(text)}}/>
            <RkTextInput
              rkType='rounded'
              autoCapitalize='none'
              placeholder='Password'
              secureTextEntry
              onChangeText={text => {this._setPassword(text)}}/>
            {errorMessage}
            <GradientButton
              style={styles.save}
              rkType='large'
              text='LOGIN'
              onPress={() => { this.onLoginButtonPressed() }}
            />
          </View>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Don’t have an account?</RkText>
              <RkButton rkType='clear' onPress={this.onSignUpButtonPressed}>
                <RkText rkType='header6'> Sign up now</RkText>
              </RkButton>
            </View>
          </View>
        </View>
      </RkAvoidKeyboard>
    )
  };
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: scaleVertical(16),
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.screen.base,
  },
  image: {
    height: scaleVertical(77),
    resizeMode: 'contain',
  },
  header: {
    paddingBottom: scaleVertical(10),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  content: {
    justifyContent: 'space-between',
  },
  save: {
    marginVertical: 20,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
    marginHorizontal: 24,
    justifyContent: 'space-around',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    borderColor: theme.colors.border.solid,
  },
  footer: {},
}));
