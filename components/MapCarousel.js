import React from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {Icon} from 'expo';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment-timezone'

import {hp, wp} from '../utils/scale';
import { TimeTag } from './index';

const itemWidth = 85;

export class MapCarousel extends React.Component {
  _renderItem ({item, index}) {
    let openEvent = this.props.onItemPress;
    return (
      <TouchableOpacity style={styles.card} onPress={() => openEvent(index)}>
        <View style={styles.imageContainer}>
          <Image
            style={{width: wp(itemWidth), height: hp(40)}}
            source={{uri: item.image}}
          />
          <TimeTag style={styles.timeTag}>{moment(item.starttime)}</TimeTag>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.h1}>{ item.title }</Text>
        </View>
      </TouchableOpacity>
    );
  }

  snapToItem = (id) => this._carousel.snapToItem(id)

  render () {
    return (
      <Carousel
        layout={'default'}
        ref={(c) => { this._carousel = c; }}
        data={this.props.data}
        renderItem={this._renderItem.bind(this)}
        sliderWidth={wp(100)}
        itemWidth={wp(itemWidth)}
        containerCustomStyle={this.props.style}
        onSnapToItem={this.props.onSnapToItem}
        onItemPress={this.props.onItemPress}
      />
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    height: hp(35),
    width: wp(itemWidth),
    flex: 1,
    flexDirection: 'column',
    borderRadius:10,
  },
  timeTag: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  imageContainer: {
    width: wp(itemWidth),
    height: hp(35),
    borderRadius: 5,
    overflow: 'hidden',
  },
  textContainer: {
    position: "absolute",
    bottom: 10,
    backgroundColor: '#111111BF',
    borderWidth: 0.5,
    flex: 1,
    padding: 5,
  },
  h1: {
    fontSize: 20,
    color: '#fff',
    paddingBottom: 5,
  },
  content: {
    fontSize: 15,
    color: '#a7a7a7',
  }
});
