import React, { Component } from 'react';
import { SegmentedControls } from 'react-native-radio-buttons';
// var Geolocation = require('./Geolocation');
var Confirmation = require('./Confirmation');
var Separator = require('./Helpers/Separator');
var styles = require('./Helpers/styles');

var coordinates = {};

import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  MapView
} from 'react-native';

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    };
  }
  handleSelected(choice) {
    this.setState({
      selectedOption: choice
    });
  }

  handleSubmit() {
    console.log('Sending ROAM request!', coordinates);
    this.props.navigator.push({
      title: 'Confirmation',
      component: Confirmation
    });

    console.log('EMAIL: >>>>>>>>>',
    this.props.navigator.navigationContext._currentRoute.email)

    fetch('http://localhost:3000/roam', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstParam: 'Sweet',
        secondParam: 'It works',
        time: this.state.selectedOption,
        coordinates: coordinates,
        userEmail: this.props.navigator.navigationContext._currentRoute.email
      })
    })
    .then((res) => {
      console.log(res);
      console.log('Added to db. Waiting for ROAM request confirmation!');
    })
    .catch((error) => {
      console.log('Error handling submit:', error);
    });
    console.log('ROAM!');
    //Link to Geolocations/Event confirmation page
    // this.props.navigator.push({
    //   name: 'Location',
    //   component: Location,
    //   passProps: {
    //     time: time
    //   }
    // });
  }

  render () {
    const options = [
      '1 hour',
      '2 hours',
      '4 hours',
      'Anytime today'
    ];
    return (
      <Image style = {styles.backgroundImage} source = {require('../../imgs/uni.jpg')}>
        <Geolocation region={this.props.region}/>
        <Text>{this.props.region}</Text>
        <Text style={styles.title}> Free for: </Text>
        <SegmentedControls
          tint={'#F80046'}
          selectedTint={'white'}
          backTint={'white'}
          options={options}
          allowFontScaling={false}
          onSelection={this.handleSelected.bind(this)}
          selectedOption={this.state.selectedOption} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white" >
            <Text style={styles.buttonText}> Roam! </Text>
        </TouchableHighlight>
      </Image>
    );
  }
}


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
        coordinates = lastPosition;
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

    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }

  render() {
    return (
      <View>
        <Text style={{backgroundColor: 'coral'}}>{`Your Current Location`}</Text>
          <MapView
          showsUserLocation={true}
          style={map.map}
          region={this.state.region}
          //annotations={this.state.annotations}
          followUserLocation={true}
          />

      </View>
    );
  }
}


const map = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    height: 250,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000'
  },
});



module.exports = Time;
