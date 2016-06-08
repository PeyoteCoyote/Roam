import React, { Component } from 'react';
import {Text, View, Image, TouchableHighlight, ListView} from 'react-native'
var styles = require('./Helpers/styles');

class Confirmation extends Component {

  handleCancel() {
    //we will cancel roam from here
    //remove the roam from db
    //take the user back to the 'Time' page
    console.log('email is:', this.props.navigator.navigationContext._currentRoute.email);

    this.props.navigator.pop();

    fetch('http://localhost:3000/cancel', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userEmail: this.props.navigator.navigationContext._currentRoute.email
      })
    })
    .then((res) => {
      console.log('Cancelled Roam:', res);
    })
    .catch((error) => {
      console.log('Error handling submit:', error);
    });

  }

  render() {
    return (
      <Image style={styles.backgroundImage}
        source={require('../../imgs/uni.jpg')}>
        <Text style={styles.title}> roam </Text>

          <Text style={styles.confirmation}>Great! We are working on finding your next Roam!</Text>
          <Text style={styles.confirmation}>We will notify you the details through email.</Text>
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
