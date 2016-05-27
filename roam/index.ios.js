/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

class roam extends Component {
  renderScene(route, navigator) {
    if(route.name == 'SignIn') {
      return <SignIn navigator={navigator} {...route.passProps}/>
    }
    if(route.name == 'SignUp') {
      return <SignUp navigator={navigator} {...route.passProps}/>
    }
    if(route.name == 'Main') {
      return <Main navigator={navigator} {...route.passProps}/>
    }
    if(route.name == 'OnBoard') {
      return <OnBoard navigator={navigator} {...route.passProps}/>
    }
  }
  render() {
    return (
      <Navigator
        style={{ flex:1 }}
        initialRoute={{ name: 'SignIn' }}
        renderScene={ this.renderScene } />
    )
  }
  
}

class SignIn extends Component {
  _navigate(name){
    this.props.navigator.push({
      name: name,
      passProps: {
        name: name
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Ready to Roam?
        </Text>
        <Text style={styles.instructions}>
          Email:
        </Text>
        <TextInput style={styles.input}/>
        <Text style={styles.instructions}>
          Password:
        </Text>
        <TextInput style={styles.input}/>
        <TouchableHighlight style={styles.button} onPress={() => this._navigate('Main')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this._navigate('SignUp')}>
          <Text style={styles.link}>Create Account</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class SignUp extends Component {
  _navigate(name){
    this.props.navigator.push({
      name: name,
      passProps: {
        name: name
      }
    })
  }
  render(){
    return(
      <View style={ styles.container }>
        <Text style={ styles.welcome }>{ this.props.name } to Roam</Text>
        <Text style={styles.instructions}>
          First Name:
        </Text>
        <TextInput style={styles.input}/>
        <Text style={styles.instructions}>
          Last Name:
        </Text>
        <TextInput style={styles.input}/>
        <Text style={styles.instructions}>
          Email:
        </Text>
        <TextInput style={styles.input}/>
        <Text style={styles.instructions}>
          Password:
        </Text>
        <TextInput style={styles.input}/>
        <Text style={styles.instructions}>
          Confirm Password:
        </Text>
        <TextInput style={styles.input}/>
        <TouchableHighlight style={ styles.button } onPress={ () => this._navigate('OnBoard') }>
          <Text style={ styles.buttonText }>Sign Up</Text>
        </TouchableHighlight>
        <TouchableHighlight style={ styles.button } onPress={ () => this.props.navigator.pop() }>
          <Text style={ styles.buttonText }>Back</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

class Main extends Component {
  _navigate(name){
    this.props.navigator.push({
      name: name,
      passProps: {
        name: name
      }
    })
  }
  render(){
    return(
      <View style={ styles.container }>
        <TouchableHighlight style={ styles.button } onPress={ () => this.props.navigator.pop() }>
          <Text style={ styles.buttonText }>CCCOCOCOCOCO</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

class OnBoard extends Component {
  _navigate(name){
    this.props.navigator.push({
      name: name,
      passProps: {
        name: name
      }
    })
  }
  render(){
    return(
      <View style={ styles.container }>
        <TouchableHighlight style={ styles.button } onPress={console.log('Foodie') }>
          <Text style={ styles.buttonText }>Coffee Shops</Text>
        </TouchableHighlight>
        <TouchableHighlight style={ styles.button } onPress={ console.log('Foodie')}>
          <Text style={ styles.buttonText }>Nature</Text>
        </TouchableHighlight>
        <TouchableHighlight style={ styles.button } onPress={ console.log('Foodie') }>
          <Text style={ styles.buttonText }>Wine Bars</Text>
        </TouchableHighlight>
        <TouchableHighlight style={ styles.button } onPress={ console.log('Foodie')}>
          <Text style={ styles.buttonText }>Sports Bars</Text>
        </TouchableHighlight>
        <TouchableHighlight style={ styles.button } onPress={ console.log('Foodie') }>
          <Text style={ styles.buttonText }>Foodie Adventures</Text>
        </TouchableHighlight>
        <TouchableHighlight style={ styles.button } onPress={ this._navigate('Main') }>
          <Text style={ styles.buttonText }>Next</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    textAlign: 'center',
    fontSize: 20,
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    justifyContent: 'center'
  },
  buttonText:{
    color: '#333333'
  },
  link: {
    color: 'red',
    textDecorationStyle: 'solid'
  }
});

AppRegistry.registerComponent('roam', () => roam);
