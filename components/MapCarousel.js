import React from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {Icon} from 'expo';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment-timezone'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

function hp (percentage) {
    const value = (percentage * viewportHeight) / 100;
    return Math.round(value);
}

export class MapCarousel extends React.Component {
  _renderItem ({item, index}) {
    return (
      <View style={styles.card}>
        <View styles={styles.imageContainer}>
          <Image
            style={{width: wp(60), height: hp(25)}}
            source={{uri: item.image}}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.h1}>{ item.title }</Text>
          <Text style={styles.content}>
            <Icon.Feather
              name='clock'
              size={15}
              color='#a7a7a7'
            />  {moment( item.starttime ).format('LT')} - {moment( item.endtime ).format('LT')}
          </Text>
          {/* <Text style={styles.content}>
            <Icon.Feather
              name='map-pin'
              size={15}
              style={{ marginTop: 40 }}
              color='#a7a7a7'
            />  0.95mi 
          </Text> */}
        </View>
      </View>
    );
  }

  snapToItem = (id) => this._carousel.snapToItem(id)

  render () {
    return (
      <Carousel
        layout={'default'}
        ref={(c) => { this._carousel = c; }}
        data={this.props.data}
        renderItem={this._renderItem}
        sliderWidth={wp(100)}
        itemWidth={wp(60)}
        containerCustomStyle={this.props.style}
        onSnapToItem={this.props.onSnapToItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    height: hp(40),
    width: wp(60),
    flex: 1, 
    flexDirection: 'column',
    borderRadius:10,
  },
  imageContainer: {
    width: wp(60),
    height: hp(20),
    borderRadius: 10,
    overflow: 'hidden',
    position: 'absolute',
  },
  textContainer: {
    backgroundColor: '#f9f9f9',
    borderWidth: 0.5,
    flex: 1,
    padding: 5,
  },
  h1: {
    fontSize: 20,
    color: '#3b444b',
    paddingBottom: 5,
  },
  content: {
    fontSize: 15,
    color: '#a7a7a7',
  }
});
