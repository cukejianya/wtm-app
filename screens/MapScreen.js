import React from 'react';
import { Icon } from 'expo';
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

import data from '../config/data'
export default class MapScreen extends React.Component {
  static navigationOptions =  ({navigation}) => ({
    title: "Explore",
    headerStyle: {
      backgroundColor: '#1A0554',
      borderColor: "#000",
      borderBottomWidth: 0,
    },
    headerTintColor: '#fff',
    headerRight: (
      <Icon.Feather
        style={{paddingRight: 15}}
        name="settings"
        size={24}
        color="#fff"
        onPress={() => { navigation.navigate('Settings') }}
      />
    ),
  });

  constructor(props){
    super(props);
    let move = data();
    this.state = {
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

  _openEvent = (id) => {
    this.props.navigation.navigate('Event', this.state.dataSource[id]);
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

    let statusBar = () => (
      <StatusBar 
        barStyle="light-content" 
      /> 
    );

    let markers = () => this.state.dataSource.map((marker, idx) => {
      return (
        <Marker
          key={idx}
          identifier={`${idx}`}
          coordinate={{latitude: marker.lat, longitude: marker.lng}}
          pinColor="#FFBF00"
          onPress={e => this._moveToCard(e.nativeEvent)}
        />
      )
    });

    let map = () => (
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
        {markers()}
      </MapView>
    );

    let searchBar = () => (
      <SearchBar
        onPress={() => this.props.navigation.navigate('List')}
        icon='menu'
        editable={false}
      /> 
    );

    let carousel = () => (
      <MapCarousel
        style={styles.carousel}
        ref={ref => {this.carousel = ref; }}
        data={this.state.dataSource}
        onSnapToItem={this._moveToEvent}
        onItemPress={this._openEvent}
      />
    );

    return (
      <View style={{flex: 1}}>
        {statusBar()}
        {map()}
        {/*searchBar()*/}
        {carousel()}
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
