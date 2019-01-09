import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {Permissions} from 'expo';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import moment from 'moment-timezone'

import mapStyle from '../constants/MapStyle'
import { MapCarousel, SearchBar } from '../components/index.js'

export default class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    let move = [
      {
        title: 'Art of love',
        street: '500 upper chesapeake dr',
        starttime: '2018-11-07T13:00:00.000Z',
        endtime: '2018-11-07T21:00:00.000Z',
        description: 'maryland room, no charge, anyone is welcome.',
        image: 'https://baltimore.org/sites/default/files/styles/profile-page/public/zzdata-11640_580x577.jpg?itok=7hZleF3c',
        lat: 39.295915,
        lng: -76.614361,
        country: "usa",
        state: 'md',
        city: 'bel air'
      },
      {
        title: '12 Days of Science',
        street: '601 Light St',
        starttime: '2018-11-07T13:00:00.000Z',
        endtime: '2018-11-07T20:00:00.000Z',
        description: 'Every day has a different theme during the 12 days of science. Drop in workshops, live demonstrations, and hands-on building will be happening throughout the Science Center while at home activities are available online.',
        image: 'https://baltimore.org/sites/default/files/styles/profile-page/public/zzdata-16369_644x360.jpg?itok=pjgq50xv',
        lat: 39.281419,
        lng: -76.6141057,
        country: "usa",
        state: 'md',
        city: 'baltimore'
      },
      {
        title: 'A Course in Miracles',
        street: '500 upper chesapeake dr',
        starttime: '2018-11-07T00:00:00.000Z',
        endtime: '2018-11-07T02:00:00.000Z',
        description: 'maryland room, no charge, anyone is welcome.',
        image: 'https://baltimore.org/sites/default/files/styles/profile-page/public/zzdata-7275_580x385.jpg?itok=ab0MdnIV',
        lat: 39.5188422,
        lng: -76.3461222,
        country: "usa",
        state: 'md',
        city: 'bel air'
      },
      {
        _id: "5bda89ab5eba0c026ddb1040",
        title: "'Jazz' at Baltimore Center Stage",
        street: "700 N Calvert St",
        starttime: "2018-11-01T23:00:00.000Z",
        endtime: "2018-11-02T01:00:00.000Z",
        description: "Center Stage presents the world premiere of Nambi E. Kelley's stage adaptation of Toni Morrison's novel.",
        image: 'http://mediad.publicbroadcasting.net/p/wyprmain/files/styles/large/public/201706/shanesia_davis_as_violet_in_jazz-crop.jpg',
        zipcode: 21202,
        lat: 39.2983693,
        lng: -76.6132008,
        __v: 0,
        country: "USA",
        state: "MD",
        city: "Baltimore",
        count: [ ],
        host: "public"
      },
      {
        _id: "5bda89ab5eba0c026ddb104c",
        title: "Lunes Latino",
        street: "7002 Arundel Mills Cir",
        starttime: "2018-11-06T01:00:00.000Z",
        endtime: "2018-11-06T05:00:00.000Z",
        description: "SPICE UP YOUR MONDAY NIGHTS WITH SALSA & BACHATA DANCING! Want to learn? Come early for dance lessons and stay for the dance party! SalsaNow was formed out of love for Latin music & dance, and a passion for sharing the experience and joy of dancing with others. Niss & Alexandra are very active in the Baltimore Salsa community as instructors, promoters, organizers, and ambassadors of dance.",
        image: 'http://blog.arborsarundel.com/wp-content/uploads/2017/07/wpid-4700791119_6dc0af39f5_z_640.jpg',
        zipcode: 21076,
        lat: 39.1572779,
        lng: -76.7271662,
        __v: 0,
        country: "USA",
        state: "MD",
        city: "Hanover",
        count: [ ],
        host: "public"
      },
      {
        _id: "5bda89ab5eba0c026ddb1051",
        title: "The Pigtown Community Farmers Market",
        street: "1500 Washington Blvd",
        starttime: "2018-11-01T19:00:00.000Z",
        endtime: "2018-11-01T21:00:00.000Z",
        description: "The Pigtown Community Farmers Market is a thriving Market located in Carroll Park (at the corner of Washington Blvd and Bayard St), operating from June 1 - October 5, 2017, 3-7 pm. Guests can use cash, credit, SNAP/EBT, WIC, and FMNP vouchers to purchase from our usual array of vendors selling fresh produce, bread, eggs, nut butters, sweet treats, hot prepared foods, and while shopping, enjoy biweekly concerts, yoga classes, activities for kids, and vouchers for seniors.",
        image: 'http://www.pigtowncommunityfarmersmarket.com/ig1.jpg',
        zipcode: 21230,
        lat: 39.2789545,
        lng: -76.64298670000001,
        __v: 0,
        country: "USA",
        state: "MD",
        city: "Baltimore",
        count: [ ],
        host: "public"
      },
    ]
    this.state ={
      isLoading: false,
      dataSource: move,
    }
  }

  componentDidMount(){
    //this.getMoves();
    this._getLocationAsync()
  }

  _moveToEvent = (moveIdx) => {
    let {lat, lng} = this.state.dataSource[moveIdx];
    let region = {
      latitude: lat - 0.0025,
      longitude: lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }
    this.map.animateToRegion(region);

    return;
  }

  _moveToCard = (pressEvent) => {
    let {id} =  pressEvent;
    this._moveToEvent(id);
    this.carousel.snapToItem(id);

    return;
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permissions to access location was denied',
      });
    }
  }

  async getMoves() {
    this.setState({isLoading: true});
    try {
      let response = await fetch('http://cukejianya.com:3000/moves');
      let json = await response.json();
      this.setState({
        isLoading: false,
        //dataSource: responseJson['moves'],
      });
    } catch(error) {
      console.error(error);
    }
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
        ref={ref => {this.map = ref; }}
        initialRegion={{
            latitude: this.state.dataSource[0].lat - 0.05,
            longitude: this.state.dataSource[0].lng,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3,
        }}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        showUserLocation
      >
        {this.state.dataSource.map((marker, idx) => {
          return (
            <Marker
              key={idx}
              identifier={`${idx}`}
              coordinate={{latitude: marker.lat, longitude: marker.lng}}
              pinColor="#FFBF00"
              onPress={e => this._moveToCard(e.nativeEvent)}
            />
          )
        })}
              {/*onPress={this._clickOnMarker(idx)}*/}
        </MapView>
        <SearchBar
          onPress={() => this.props.navigation.navigate('List')}
          icon='menu'
          editable={false}
        />
        <MapCarousel
          style={styles.carousel}
          ref={ref => {this.carousel = ref; }}
          data={this.state.dataSource}
          onSnapToItem={this._moveToEvent}
        />
      </View>
    );
  }
}

//this.props.navigation.navigate('App');

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  searchBar: {
    backgroundColor: 'yellow',
    width: 150
  },
  carousel: {
    position: 'absolute',
    bottom: 20,
  }
});
