import React, { Component } from 'react';

//Require authentication component
var SignUp = require('./Signup');

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

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      error: false
    }
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
      <View style={styles.mainContainer}>
        <Text style={styles.title}> Welcome to Roam! </Text>
        {/* Fields that we want to bind the email and password input */}
        <TextInput
          style={styles.submit}
          value={this.state.email}
          onChange={this.handleEmail.bind(this)} 
          />
        <TextInput
          style={styles.submit}
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
          style={styles.button}
          onPress={this.handleSignUp.bind(this)}
          underlayColor="white" >
            <Text style={styles.buttonText}> Not a user? Sign-Up! </Text>
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

module.exports = Main;