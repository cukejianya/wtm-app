import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    Keyboard,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {
  RkStyleSheet,
  RkText,
  RkTextInput,
} from 'react-native-ui-kitten';
import moment from 'moment-timezone'

import { SearchBar } from '../components/index.js'
import data from '../config/data'

class ListItem extends React.Component {
  
}

export default class ListScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    data: {
      original: data() 
    }
  };

  onItemPressed = () => {}

  renderSeparator = () => (
    <View style={styles.separator}/>
  );

  renderItem = ({ item }) => {
    const last = item[item.length - 1];
    return (
      <TouchableOpacity onPress={() => this.onItemPressed(item)}>
        <View style={styles.container}>
          {/*<Avatar rkType='circle' style={styles.avatar} img={item.withUser.photo} />*/}
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <RkText rkType='header3'>{`${item.title}`}</RkText>
              <RkText rkType='secondary4 hintColor'>
              </RkText>
            </View>
            <RkText numberOfLines={2} rkType='primary3 mediumLine' style={{ paddingTop: 5 }}>
              {`${item.street}, ${item.city} ${item.state}`}
            </RkText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{flex: 1}}>
        <SearchBar
          icon='chevron-left'
          onPress={() => this.props.navigation.navigate('Map')}
        />
        <View>
          <FlatList
            data={data()}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={this.renderItem}
            keyboardShouldPersistTaps='always'
          />
        </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingBottom: 12,
    paddingTop: 7,
    flexDirection: 'row',
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border.base,
  },
}))
