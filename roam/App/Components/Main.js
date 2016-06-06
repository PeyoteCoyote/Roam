import React, { Component } from 'react';

//Require authentication component
var SignUp = require('./Signup');
var Time = require('./Time');
var styles = require('./Helpers/styles');

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
      error: false,
      errorMessage: ''
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
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.state.email === '' || !re.test(this.state.email)) {
      this.setState({
        isLoading: false,
        error: true,
        errorMessage: 'Invalid Email!'
      });
    }
    if (this.state.password === '') {
      this.setState({
        isLoading: false,
        error: true,
        errorMessage: 'Invalid Password!'
      });
    }
    //If email and password exists on the database, log the user into the select time page
    if(this.state.email !== '' && re.test(this.state.email) && this.state.password !== ''){
      fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: this.state.password,
          email: this.state.email.toLowerCase(),
        })
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if(res.message === 'Incorrect email/password combination!'){
          this.setState({errorMessage: res.message, error: true, isLoading: false});
        } else{
          this.props.navigator.push({
            title: 'When are you free?',
            email: this.state.email.toLowerCase(),
            component: Time
          });
          this.setState({
            isLoading: false
          });
        }
      })
      .catch((error) => {
        console.log('Error handling submit:', error);
      });
    }
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
      this.state.error ? <Text style={styles.errorMessage}> {this.state.errorMessage} </Text> : <View></View>
    );
    return(
      <Image style={styles.backgroundImage}
      source={require('../../imgs/uni.jpg')}>
        <Text style={styles.title}> roam </Text>
        {/* Fields that we want to bind the email and password input */}
        <TextInput
          style={styles.submit}
          placeholder="Email"
          placeholderTextColor="white"
          value={this.state.email}
          onChange={this.handleEmail.bind(this)}
          />
        <TextInput
          style={styles.submit}
          placeholder="Password"
          placeholderTextColor="white"
          value={this.state.password}
          onChange={this.handlePassword.bind(this)}
          secureTextEntry={true}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSignIn.bind(this)}
          underlayColor="white" >
            <Text style={styles.buttonText}> Sign In </Text>
        </TouchableHighlight>
        <TouchableHighlight
          // style={styles.button}
          onPress={this.handleSignUp.bind(this)}
          underlayColor="transparent" >
            <Text style={styles.signUpButton}> Not a user? Sign Up </Text>
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
