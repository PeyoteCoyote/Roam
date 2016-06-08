import React, { Component } from 'react';
import { SegmentedControls } from 'react-native-radio-buttons';
// var Geolocation = require('./Geolocation');
var Confirmation = require('./Confirmation');
var Separator = require('./Helpers/Separator');
var styles = require('./Helpers/styles');

var coordinates = {};

import {
  Animated,
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

var flag = false;
var flag2 = false;

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '1 hour',
    };
  }
  handleSelected(choice) {
    this.setState({
      selectedOption: choice
    });
  }

  handleSubmit() {
    console.log('Sending ROAM request!', coordinates);
    // this.props.navigator.push({
    //   title: 'Confirmation',
    //   email: this.props.navigator.navigationContext._currentRoute.email,
    //   component: Confirmation
    // });

    fetch('http://localhost:3000/roam', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        time: this.state.selectedOption,
        coordinates: coordinates,
        userEmail: this.props.navigator.navigationContext._currentRoute.email
      })
    })
    .then((res) => {
      console.log('Added to db. Waiting for ROAM request confirmation!');
    })
    .catch((error) => {
      console.log('Error handling submit:', error);
    });
  }

  render () {
    const options = [
      '1 hour',
      '2 hours',
      '4 hours',
      'Anytime'
    ];
    return (
      <Image style={styles.backgroundImage}
      source={require('../../imgs/uni.jpg')} >
        <Geolocation region={this.props.region}/>
        <Text style={styles.header}> pick time : </Text>
        <SegmentedControls
          tint={'#ff0066'}
          selectedTint={'white'}
          backTint={'white'}
          options={options}
          allowFontScaling={false}
          fontWeight={'bold'}
          onSelection={this.handleSelected.bind(this)}
          selectedOption={this.state.selectedOption} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)} >
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
      },
      fadeAnim: new Animated.Value(0),
      fadeAnim2: new Animated.Value(0),
      alternate: false
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

componentDidMount() {
  this.determineFadingAction();
  setInterval( () => {
    this.determineFadingAction();
  },5000);              
}

determineFadingAction() {
  if (!flag && !flag2){
    Animated.timing(          
      this.state.fadeAnim,    
      {
        toValue: 1,
        duration:6000
      }
    ).start();
    flag = !flag;   
  } 
  if (flag && !flag2) {
    Animated.timing(          
    this.state.fadeAnim,    
      {
        toValue: 0,
        duration:6000
      }
    ).start();
    this.state.fadeAnim = new Animated.Value(0);
    flag = !flag;
    flag2 = !flag2;
  }
  if (flag && flag2){
    Animated.timing(          
      this.state.fadeAnim2,    
      {
        toValue: 1,
        duration:6000
      }
    ).start();
    flag = !flag;   
  } else {
    Animated.timing(          
    this.state.fadeAnim2,    
      {
        toValue: 0,
        duration:6000
      }
    ).start();
    this.state.fadeAnim2 = new Animated.Value(0);
    flag = !flag;
    flag2 = !flag2;
  }
}


alternateImageSettings() {
    return (
      <View style={{flex:1}}>
        <Animated.Image source={require('./a.jpg')} style={{width:320,height:320,resizeMode:'cover',position:'absolute'}}  />
        <Animated.Image source={require('./b.jpg')} style={{width:320,height:320,resizeMode:'cover',opacity:this.state.fadeAnim}}  />
        <Animated.Image source={require('./c.jpg')} style={{width:320,height:320,resizeMode:'cover',opacity:this.state.fadeAnim2}}  />
      </View>
    );

 }
      // <View>
      //   <Text style={styles.location}>Your Current Location:</Text>
      //     <MapView
      //     showsUserLocation={true}
      //     style={map.map}
      //     region={this.state.region}
      //     followUserLocation={true} />
      // </View>
  render() {
    return this.alternateImageSettings();
  }
}


const map = StyleSheet.create({
  map: {
    height: 250,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'transparent'
  },
});



module.exports = Time;
