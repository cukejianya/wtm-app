import React from 'react';
import { Icon } from 'expo';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import moment from 'moment-timezone'
import { TimeTag } from '../components/index.js'

export default class EventScreen extends React.Component {
  static navigationOptions = ({ goBack }) => ({
    title: "Event Details",
    headerStyle: {
      backgroundColor: '#1A0554',
    },
    headerTintColor: '#fff',
/*    headerLeft: (
      <Icon.Feather
        name="chevron-left"
        size={22}
        color="#fff"
        onPress={() => {goBack()}}
      />
 ),*/
  });

  constructor(props) {
    super(props);
    let eventObj = this.props.navigation.state.params;
    let {street, city, state, zipcode} = eventObj;
    console.log(eventObj);
    this.state = {
      title: eventObj.title,
      img: eventObj.image,
      info: eventObj.description,
      start: moment(eventObj.starttime),
      end: moment(eventObj.endtime),
      addr: `${street}, ${city} ${state.toUpperCase()} ${zipcode || ''}`
    }
  }

  render(){
    
    let statusBar = () => (
      <StatusBar 
        barStyle="light-content" 
      /> 
    );
  
    let divider = () => (
      <View style={styles.divider}></View>
    )

    let eventTitle = () => (
      <View style={styles.eventTitleContainer}>
        <Text style={styles.eventTitleText}>{this.state.title}</Text>
      </View>
    )

    let timeButton = () => (
      <TimeTag style={styles.timeTag}>{this.state.start}</TimeTag>
    )

    let image = () => (
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{uri: this.state.img}}
        />
        {eventTitle()}
        {timeButton()}
      </View>
    );

    let info = (iconType, mainText, subText) => (
      <View style={styles.infoContainer}>
        <View style={styles.infoLogo}>
          <Icon.Feather
            name={iconType}
            size={25}
            color="#666"
          />
        </View>
        <View style={styles.infoBody}>
          <Text style={{fontSize: 18, color: "#666"}}>
            {mainText}
          </Text>
          <Text style={{fontSize: 12, color: "#666"}}>
            {subText}
          </Text>
        </View>
      </View>
    )

    let detail = () => (
      <View style={styles.detailContainer}>
        <Text style={{fontSize: 18, color: "#666", marginBottom: 10}}>
          EVENT DETAIL
        </Text>
        <Text>{this.state.info}</Text>
      </View>
    )

    let maybeEndTimeStr = this.state.end ? 
      this.state.end.format("h:mm A") : 
      "???"; 

    return (
      <View style={styles.container}>
        {statusBar()}
        {image()}
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
          {info(
            "calendar", 
            this.state.start.format("ddd, MMMM D, YYYY"), 
            `${this.state.start.format("h:mm A")} - ${maybeEndTimeStr}`
           )}
          {info("map-pin", "The Yoga House", this.state.addr)}
          {divider()}
          {detail()}
          {divider()}
        </ScrollView> 
     </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dde',
  },
  scrollContainer: {
    flex: 3,
  },
  contentContainer: {
  },
  divider: {
    height: 10,
  },
  imageContainer: {
    flex: 1,
    maxHeight: 150,
    alignItems: "stretch",
  },
  image: {
    flex: 1,
  },
  infoContainer: {
    backgroundColor: '#fff',
    height: 60,
    flexDirection: 'row',
  },
  infoLogo: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
  },
  infoBody: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    justifyContent: 'center',
  },
  eventTitleContainer: {
    position: 'absolute',
    top: 20,
    backgroundColor: '#111111BF',
    borderWidth: 0.5,
    flex: 1,
    padding: 5,
    paddingLeft: 10,
  },
  eventTitleText: {
    fontSize: 22,
    color: "#fff",
  },
  timeTag: {
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  detailContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    backgroundColor: '#fff'
  },
});
