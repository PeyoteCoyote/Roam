import React, { Component } from 'react';

//Require authentication component
var SignUp = require('./Signup');
var Time = require('./Time');
var styles = require('./Helpers/styles');
var LinearGradient = require('react-native-linear-gradient');

import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      error: false
    };
  }

  handleEmail(event) {
    this.setState({
      email: event.nativeEvent.text
    });
  }

  handlePassword(event) {
    this.setState({
      password: event.nativeEvent.text
    });
  }

  handleSignIn() {
    this.setState({
      isLoading: true
    });
    if (this.state.email === '') {
      this.setState({
        error: true
      });
    }
    this.props.navigator.push({
      title: 'When are you free?',
      component: Time
    });
    this.setState({
      isLoading: false
    });
  }

  handleSignUp() {
    this.setState({
      isLoading: true
    });
    this.props.navigator.push({
      title: 'Sign Up',
      component: SignUp
    });
    this.setState({
      isLoading: false
    });
  }

  render() {
    var showErr = (
      this.state.error ? <Text> {this.state.error} </Text> : <View></View>
    );
    return(
        <Image style = {styles.backgroundImage} source = {require('../../imgs/uni.jpg')}>
          <Text style={styles.title}> ROAM</Text>
          {/* Fields that we want to bind the email and password input */}
          <TextInput
            style={styles.submit}
            placeholder="Email"
            placeholderTextColor = "white"
            value={this.state.email}
            onChange={this.handleEmail.bind(this)}
            />
          <TextInput
            style={styles.submit}
            placeholder="Password"
            placeholderTextColor = "white"
            value={this.state.password}
            onChange={this.handlePassword.bind(this)}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={this.handleSignIn.bind(this)}
            underlayColor="white" >
              <Text style={styles.buttonText}> Sign-In </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.text}
            onPress={this.handleSignUp.bind(this)}
          >
              <Text style={styles.buttonText}> Not a user? Sign-Up! </Text>
          </TouchableHighlight>
          {/* This is the loading animation when isLoading is set to true */}
          <ActivityIndicatorIOS
            animating={this.state.isLoading}
            color="#111"
            size="large"></ActivityIndicatorIOS>
          {showErr}
        </Image>

    )
  }
}

module.exports = Main;
