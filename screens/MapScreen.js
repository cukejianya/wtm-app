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
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import moment from 'moment-timezone'

import {hp, wp} from '../utils/scale';
import mapStyle from '../constants/MapStyle'
import { MapCarousel, SearchBar } from '../components/index.js'

import data from '../config/data'
export default class MapScreen extends React.Component {
  static navigationOptions =  ({navigation}) => ({
    headerTitle: (
      <View>
        <Text 
          style={styles.headerTitle} 
          onPress={navigation.getParam('toggleZoom')}
        >
          Explore
        </Text>
      </View>
    ),
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
      zoomIn: false,
      dataSource: move,
    }
  }

  componentDidMount(){
    //this.getMoves();
    this.props.navigation.setParams({toggleZoom: this._toggleZoom})
    this._getLocationAsync()
  }

  _toggleZoom = () => {
    return // For now. this.map.getCamera doesnt work when using expo client. Remove during production.
    console.log(this.map.animateToRegion);
    let camera = this.map.getCamera();
    let {latitude, longitude} = camera.center;
    if (this.state.zoomIn) {
      this._moveToRegion(latitude, longitude, 0.01);
    } else {
      this._moveToRegion(latitude, longitude, 0.03);
    }

    this.setState({zoomIn: !this.state.zoomIn});
  }

  _moveToRegion = (lat, lng, delta) => {
    let region = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: delta,
      longitudeDelta: delta,
    }

    this.map.animateToRegion(region);
    
    return;
  }

  _moveToEvent = (moveIdx) => {
    let {lat, lng} = this.state.dataSource[moveIdx];
    this._moveToRegion(lat, lng, 0.01);
    this.setState({zoomIn: true});
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

    let map = () => {
      let padding = {
        top: 0,
        right: 0,
        left: 10,
        bottom: hp(40),
      }
      return (
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
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          mapPadding={padding}
        >
          {markers()}
        </MapView>
      );
    }
    
    let searchBar = () => (
      <SearchBar
        onPress={() => this.props.navigation.navigate('List')}
        icon='menu'
        editable={false}
      /> 
    );

    let carousel = () => {
      return (
        <MapCarousel
          style={styles.carousel}
          ref={ref => {this.carousel = ref; }}
          data={this.state.dataSource}
          onSnapToItem={this._moveToEvent}
          onItemPress={this._openEvent}
        />
      )
    }
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
  headerTitle: {
    color: "#fff",
    fontSize: 20,
  },
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


