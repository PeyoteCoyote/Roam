import React, { Component } from 'react';

var Separator = require('./Helpers/Separator');

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  submit: {
    height: 50,
    padding: 4,
    marginRight: 5,
    marginBottom: 15,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 35,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

class Interests extends Component {
  render() {
    var interestsList = [
      'Coffee',
      'Nature',
      'Brunch',
      'Wine Bars',
      'Sports Bars',
      'Desserts',
    ];
    return (
      <View>
        <Text>Select your interests:</Text>
      </View>
    );
  }
}

module.exports = Interests;