import React, { Component } from 'react';

var Separator = require('./Helpers/Separator');
var Time = require('./Time');
var styles = require('./Helpers/styles');

import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';

class Interests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "Coffee": false,
      "Nature": false,
      "Brunch": false,
      "Wine Bars": false,
      "Sports Bars": false,
      "Dessert": false
    };
  }
  handleSelected(choice) {
    //set the state of the selection to the opposite value
    let newState = {...this.state};
    newState[choice] = !newState[choice];
    this.setState(newState);
  }

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
        <TouchableHighlight
          key={index}
          underlayColor='transparent'
          onPress={() => {this.handleSelected(item)}}
          selected={this.state[item]} >
          <Text style={this.state[item] ? styles.selected : styles.unselected }> {item} </Text>
        </TouchableHighlight>
      )
    });

    return (
      <Image style = {styles.backgroundImage} source = {require('../../imgs/uni.jpg')}>
        <Text style={styles.title}>LIKES</Text>
          {list}
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white" >
            <Text style={styles.buttonText}> Next </Text>
        </TouchableHighlight>
      </Image>
    );
  }
}

module.exports = Interests;

