import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import moment from 'moment-timezone'

import mapStyle from '../constants/MapStyle'
import { MapCarousel } from '../components/index.js'

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    let move = {
      title: 'A Course in Miracles',
      street: '500 Upper Chesapeake Dr',
      starttime: '2018-11-07T00:00:00.000Z',
      endtime: '2018-11-07T02:00:00.000Z',
      description: 'Maryland Room, no charge, anyone is welcome.',
      lat: 39.5188422,
      lng: -76.3461222,
      country: "USA",
      state: 'MD',
      city: 'Bel Air'
    }
    this.state ={ isLoading: true,
      dataSource: [move, move, move],
    }
  }

  componentDidMount(){
    return fetch('http://cukejianya.com:3000/moves')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          // dataSource: responseJson['moves'],
        }, () => {})
      }).catch((error) =>{
        console.error(error);
      });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={{flex: 1}}>
      <MapView style={styles.map}
        initialRegion={{
            latitude: 39.2904,
            longitude: -76.6122,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3,
        }}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
      >
        {this.state.dataSource.map((marker, idx) => {
          return (
            <Marker
              key={idx}
              coordinate={{latitude: marker.lat, longitude: marker.lng}}
              pinColor="#FFBF00"
            />
          )
        })}
      </MapView>
        <MapCarousel
          style={styles.carousel}
          data={this.state.dataSource}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  carousel: {
    position: 'absolute',
    bottom: 50,
  }
});
