import React, { Component } from 'react';
import {Text, View, Image, TouchableHighlight, ListView} from 'react-native'
var styles = require('./Helpers/styles');

class PendingRoam extends Component {
    constructor(props) {
    super(props);
    this.state = {
      address: null,
      time: null,
    };
  }

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

          <Text>We will notify you once you are matched</Text>
          <Text>{this.state.address}</Text>
          <Text>Roam starts at {this.state.time}</Text>
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


module.exports = PendingRoam;
