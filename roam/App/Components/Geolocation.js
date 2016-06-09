/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict'

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, MapView, ListView} from 'react-native'
// import MapView from 'react-native-maps'

class Geolocation extends Component {
    constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  componentDidMount () {
      console.log('Hello From Geolocation')
      if (!navigator.geolocation) {console.log('geoloaction not available')};
      if (navigator.geolocation) {console.log('geoloaction available')};
      navigator.geolocation.getCurrentPosition(
        (initialPosition) => {
         console.log(initialPosition);
          this.setState({initialPosition});
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );

      this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
        console.log(lastPosition);
        this.setState({latitude: lastPosition.coords.latitude});
        this.setState({latitude: lastPosition.coords.latitude});

        var newRegion = {
            latitude: lastPosition.coords.latitude,
            longitude: lastPosition.coords.longitude,
            latitudeDelta: 10,
            longitudeDelta: 10
        }

        this.setState({ region: newRegion });

        this.setState({ annotations: [{
          latitude: lastPosition.coords.latitude,
          longitude: lastPosition.coords.longitude,
          title: 'Current Location',
          subtitle: 'This is your current location'
        }]});
      });
    }


    componenetWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }

  render() {
    return (
      <View>
          <MapView
          showsUserLocation={true}
          style={styles.map}
          region={this.state.region}
          //annotations={this.state.annotations}
          followUserLocation={true}
          />

      </View>
    );
  }
}


const styles = StyleSheet.create({
  map: {
    height: 250,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000'
  },
  location: {
    backgroundColor: 'transparent',
    fontSize: 20,
    color: 'white'
  }
});

module.exports = Geolocation;
