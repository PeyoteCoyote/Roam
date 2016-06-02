import React, { Component } from 'react';

var Interests = require('./Interests');
var styles = require('./Helpers/styles');

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      passwordAgain: '',
      email: '',
      isLoading: false,
      error: false,
      errorMessage: ''
    };
  }

  handleSubmit() {
    console.log(this.state);
    this.setState({
      isLoading: true
    });
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //check if the passwords entered matches
    if (this.state.password !== this.state.passwordAgain) {
      this.setState({isLoading: false, error: true, errorMessage: 'Passwords do not match!'});
    }
    //check if the email supplied is valid
    if (!re.test(this.state.email)) {
      this.setState({isLoading: false, error: true, errorMessage: 'Invalid Email!'});
    }

    //ensure all fields in our state is not empty
    if (this.state.firstName !== '' && this.state.lastName !== '' && this.state.password !== '' && this.state.passwordAgain !== '' && (this.state.password === this.state.passwordAgain) && re.test(this.state.email)) {

      fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          password: this.state.password,
          email: this.state.email,
        })
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log('RESPONSE FROM SERVER ON SIGNUP PAGE', res);
        if (res.message === 'User created') {
          this.props.navigator.push({
            title: 'Select Interests',
            component: Interests
          });
          //Set isloading to false after conditions
          this.setState({
            isLoading: false
          });
        } else {
          this.setState({
            errorMessage: res.message,
            isLoading: false
          });
          
        }
        
      })
      .catch((error) => {
        console.log('Error handling submit:', error);
      });
      //Need logic to check if username is taken in the database
      //Check if the passwords are matching
      //Check if the email is valid
      //Route to the hobbies screen
    }

  }

  render() {
    var showErr = (
      this.state.error ? <Text> {this.state.errorMessage} </Text> : <View></View>
    );
    return(
      <View style={styles.mainContainer}>
        <Text style={styles.title}> Create an acount and you will be roaming in no time! </Text>
        {/* Fields that we want to bind the username and password input */}
        <TextInput
          style={this.state.firstName === '' ? styles.submitError : styles.submit}
          placeholder="Your first name"
          onChangeText={(text) => this.setState({firstName: text})} 
          value={this.state.firstName}
          />
        <TextInput
          style={this.state.lastName === '' ? styles.submitError : styles.submit}
          placeholder="Your last name"
          onChangeText={(text) => this.setState({lastName: text})} 
          value={this.state.lastName}
          />
        <TextInput
          style={this.state.password === '' ? styles.submitError : styles.submit}
          placeholder="Enter a password"
          onChangeText={(text) => this.setState({password: text})} 
          value={this.state.password}
          secureTextEntry={true}
          />
        <TextInput
          style={this.state.passwordAgain === '' ? styles.submitError : styles.submit}
          placeholder="Enter password again"
          onChangeText={(text) => this.setState({passwordAgain: text})} 
          value={this.state.passwordAgain}
          secureTextEntry={true}
          />
        <TextInput
          style={this.state.email === '' ? styles.submitError : styles.submit}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={(text) => this.setState({email: text})} 
          value={this.state.email}
          />          
        <TouchableHighlight 
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white" >
            <Text style={styles.buttonText}> Sign-Up! </Text>
        </TouchableHighlight>
        {/* This is the loading animation when isLoading is set to true */}
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color="#111"
          size="large"></ActivityIndicatorIOS>
        {showErr}
      </View>
    )
  }
}

module.exports = SignUp;