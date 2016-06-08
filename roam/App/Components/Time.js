import React, { Component } from 'react';
import { SegmentedControls } from 'react-native-radio-buttons';
var Confirmation = require('./Confirmation');
var Separator = require('./Helpers/Separator');

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
  MapView,
  Dimensions
} from 'react-native';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

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
    };
  }

  componentDidMount() {             
  }

  render() {
    return (
      <View>
        <Text style={styles.location}>Your Current Location:</Text>
          <MapView
          showsUserLocation={true}
          style={styles.map}
          region={this.state.region}
          followUserLocation={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    fontSize: 70,
    fontWeight: "100",
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
    letterSpacing: 5
  },
  header: {
    marginBottom: 20,
    fontSize: 50,
    fontWeight: "100",
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
    letterSpacing: 3
  },
  submit: {
    height: 50,
    padding: 10,
    marginRight: 5,
    marginBottom: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 50,
    width: 300,
    flexDirection: 'row',
    backgroundColor: '#ff0066',
    borderRadius:10,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  signUpButton: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 18
  },
  unselected: {
    fontSize: 20,
    backgroundColor: 'orange',
    marginTop: 20,
    marginBottom: 20,
    borderColor: 'black',
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center'
  },
  selected: {
    fontSize: 20,
    backgroundColor: 'green',
    marginTop: 20,
    marginBottom: 20,
    borderColor: 'black',
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center'
  },
  backgroundImage: {
    flex:1,
    width:null,
    height: null,
    padding: 30,
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  errorMessage: {
    backgroundColor: 'transparent',
    color: '#ff0066',
    textAlign: 'center',
    fontSize: 20,
    marginTop: -23
  },
  confirmation: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: 25,
    paddingBottom: 10
  },
  location: {
    backgroundColor: 'transparent',
    fontSize: 25,
    color: 'white',
    textAlign: 'center'
  },
  map: {
    height: deviceHeight/2,
    width: deviceWidth/2,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'transparent'
  },
});




module.exports = Time;