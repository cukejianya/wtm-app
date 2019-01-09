import React from 'react';
import { Icon } from 'expo';
import {
  Keyboard,
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  RkAvoidKeyboard,
  RkComponent,
  RkText,
  RkTextInput
} from 'react-native-ui-kitten';
import {hp, wp, scale} from '../utils/scale';

export class SearchBar extends RkComponent {
  render() {
    let renderInputLabel = () => (
      <Icon.Feather
        name={this.props.icon}
        size={24}
        color='black'
        onPress={this.props.onPress}
      />
    )
    let activeSearchBar = () => (
      <RkTextInput
        ref={ref =>{this.searchBar = ref;} }
        rkType='iconLeft'
        label={renderInputLabel()}
        style={styles.bar}
        labelStyle={styles.label}
        inputStyle={styles.input}
        placeholder='Search here'
        pointerEvents='none'
        autoFocus={true}
      />
    )

    let deactiveSearchBar = () => (
      <View style={[styles.bar, styles.barDeactive]}>
        <View style={[styles.label, styles.labelDeactive]}>
          {renderInputLabel()}
        </View>
        <RkText style={[styles.input, styles.placeholderDeactive]}>Search</RkText>
      </View>
    )

    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View
          style={styles.main}
        >
          {
            (this.props.editable === false)
              ? deactiveSearchBar()
              : activeSearchBar()
          }
        </View>
     </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    height: 80,
    width: wp(100),
    top: 30,
  },
  bar: {
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
  barDeactive: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 9,
  },
  input: {
    color: '#000000',
    fontSize: 20,
  },
  placeholderDeactive: {
    flex: 1,
    color: '#aaa',
    marginLeft: scale(46),
    alignSelf: 'center',
  },
  label: {
    color: '#4e4e4e',
  },
  labelDeactive: {
    left: 15,
    position: 'absolute',
    alignSelf: 'center',
  },
})
