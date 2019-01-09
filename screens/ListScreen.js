import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    Keyboard,
    StatusBar,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import moment from 'moment-timezone'

import { SearchBar } from '../components/index.js'

export default class ListScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{flex: 1}}>
        <SearchBar
          icon='chevron-left'
          onPress={() => this.props.navigation.navigate('Map')}
        />
        <FlatList
          data={[]}
          renderItem={({item}) => <Text>{item.key}</Text>}
          keyboardShouldPersistTaps='always'
        />
      </View>
      </TouchableWithoutFeedback>
    )
  }
}
