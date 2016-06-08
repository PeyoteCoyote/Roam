import React, { Component } from 'react';

var SignUp = require('./Signup');
var styles = require('./Helpers/styles');
var TabBar = require('./TabBar.js');
import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';

class VerifyText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      code: '',
      isLoading: false,
      error: false,
      errorMessage: ''
    };
  }

  handleTextCode(event) {
  }  


  handleSubmitCode() {

  }

  handleResendCode() {

  }

  render() {
    var showErr = (
      this.state.error ? <Text style={styles.errorMessage}> {this.state.errorMessage} </Text> : <View></View>
    );
    return(
      <Image style={styles.backgroundImage}
      source={require('../../imgs/uni.jpg')}>
        <Text style={styles.title}> verify </Text>
        <TextInput
          style={styles.submit}
          placeholder="Enter Code"
          placeholderTextColor="white"
          value={this.state.code}
          onChange={this.handleTextCode.bind(this)}
          secureTextEntry={true}/>
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmitCode.bind(this)}
          underlayColor="white" >
            <Text style={styles.buttonText}> Submit Code </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleResendCode.bind(this)}
          underlayColor="white" >
            <Text style={styles.buttonText}> Resend Code </Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color="#111"
          size="large"></ActivityIndicatorIOS>
        {showErr}
      </Image>
    )
  }
}

module.exports = VerifyText;