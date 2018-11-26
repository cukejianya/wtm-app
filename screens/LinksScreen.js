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

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://cukejianya.com:3000/moves')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson['moves'],
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
        {this.state.dataSource.filter(move => {
            let startTime = moment(move.starttime);
            let endTime = moment(move.endtime);
            let today = moment();

            return  endTime > today && startTime < today.add(1, 'days');
        }).map(marker => {
            return (
                <Marker
                    coordinate={{latitude: marker.lat, longitude: marker.lng}}
                    pinColor="#FFBF00"
                >
                    <Callout style={{ flex: 1, position: 'relative' }}>
                        <Text>{marker.title}</Text>

                        <Text>Start Time: {moment(marker.starttime).calendar()}</Text>
                        <Text>End Time: {moment(marker.endtime).calendar()}</Text>
                    </Callout>
                </Marker>
            )
        })}
      </MapView>
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
});
