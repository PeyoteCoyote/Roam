import React, { Component } from 'react';
import { SegmentedControls } from 'react-native-radio-buttons';

var Separator = require('./Helpers/Separator');
var styles = require('./Helpers/styles');

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS
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
    console.log('Sending ROAM request!');
    fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstParam: 'Sweet',
        secondParam: 'It works',
      })
    })
    .then((res) => {
      console.log(res);
      console.log('Sent ROAM request!');
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
      <View style={styles.mainContainer}>
        <Text style={styles.title}> When are you free? </Text>
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
      </View>
    );
  }
}

module.exports = Time;