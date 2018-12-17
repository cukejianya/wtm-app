import React from 'react';
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment-timezone'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

export class MapCarousel extends React.Component {
  
  _renderItem ({item, index}) {
    return (
      <View style={styles.card}>
        <Text>{ item.title }</Text>
        <Text>Start Time: {moment( item.starttime ).calendar()}</Text>
        <Text>End Time: {moment( item.endtime ).calendar()}</Text>
      </View>
    );
  }

  render () {
    return (
      <Carousel
        layout={'default'}
        ref={(c) => { this._carousel = c; }}
        data={this.props.data}
        renderItem={this._renderItem}
        sliderWidth={wp(100)}
        itemWidth={wp(80)}
        containerCustomStyle={this.props.style}
      />
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'yellow'
  }

});
