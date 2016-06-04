import React, { Component } from 'react';
import {Text, View, Image, TouchableHighlight, ListView} from 'react-native'
var styles = require('./Helpers/styles');

class Confirmation extends Component {
  
  handleCancel() {
    //we will cancel roam from here
    //remove the roam from db
    //take the user back to the 'Time' page
    this.props.navigator.pop();
  }

  render() {
    return (
      <Image style={styles.backgroundImage}
        source={require('../../imgs/uni.jpg')}>
        <Text style={styles.title}> ROAM </Text>

          <Text>Great! We are working on finding your next Roam!</Text>
          <Text>We will notify you the details through email.</Text>
          <TouchableHighlight
            style={styles.button}
            onPress={this.handleCancel.bind(this)}
            underlayColor="white" >
              <Text style={styles.buttonText}>Cancel Roam</Text>
          </TouchableHighlight>

      </Image>
    );
  }
}


module.exports = Confirmation;
