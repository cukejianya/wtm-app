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
import { DatePicker } from '../../components/index'
import { scaleVertical } from '../../utils/scale';

export default class DOB extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDatePickerOpened: false,
      dobValue: 'Select date',
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
      signUpData = this._createNewSignUpData({ dob: new Date(this.state.dobValue) });
      navigation.navigate('email', {signUpData});
    }
  };

  _createNewSignUpData = (newData) => Object.assign(newData, this._getSignUpData());  

  _getSignUpData = () => this.props.navigation.getParam('signUpData', {});
  
  openDatePicker = () => {
    this.textInput.inputRef.blur();
    this.setState({isDatePickerOpened: true});
  }

  onSignInButtonPressed = () => {
    this.props.navigation.navigate('Auth');
  };

  _setEmail = (email) => {
    this._validInput(email);
    this.setState({email: email});
  };

  _onConfirm = (data) => {
    this.setState({
        dobValue: `${data.month.value} ${data.day}, ${data.year}`,
    })
    this.setState({canActiveNextButton: true});
    this.setState({isDatePickerOpened: false});
  }

  _onCancel = () => {
    this.setState({isDatePickerOpened: false});
  }

  render = () => {
    let datepicker;
  
    if (this.state.isDatePickerOpened) {
        datepicker = (<DatePicker
          onConfirm={this._onConfirm}
          onCancel={this._onCancel}
        />);
    } else {
      datepicker = '';
    }
  
    return (
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
            <RkText style={styles.header} rkType='h3'>What day were you born?</RkText>
            <RkTextInput
              rkType='underline'
              inputStyle={styles.header}
              onFocus={this.openDatePicker}
              autoCapitalize='none'
              value={this.state.dobValue}
              onChangeText={this._setEmail}
              ref={elm => this.textInput = elm } 
            />
              { datepicker }
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
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: theme.colors.screen.base,
  },
  header: {
    alignSelf: 'center',
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
