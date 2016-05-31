import React, { Component } from 'react';

var Separator = require('./Helpers/Separator');
var Time = require('./Time')

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ListView,
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
  choice: {
    fontSize: 20,
    backgroundColor: 'orange',
    marginTop: 20,
    marginBottom: 20,
    borderColor: 'black',
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center'
  }
});

class Interests extends Component {

  handleSubmit() {
    console.log('NEXT');
    this.props.navigator.push({
      title: 'Select Time',
      component: Time
    });
  }

  render() {
    var interestsList = [
      'Coffee',
      'Nature',
      'Brunch',
      'Wine Bars',
      'Sports Bars',
      'Dessert',
    ];
    var list = interestsList.map((item, index) => {
      return (
        <View key={index}>
          <Text style={styles.choice}> {item} </Text>
          <Separator />
        </View>
      )
    });

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Select your interests:</Text>
          {list}
        <TouchableHighlight 
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white" >
            <Text style={styles.buttonText}> Next </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = Interests;