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

//Contains Navigation Bar and manages Routes
class roam extends Component {
  renderScene(route, navigator) {
    // if(route.name == 'SignIn') {
    //   return <SignIn navigator={navigator} {...route.passProps}/>
    // }
    // if(route.name == 'SignUp') {
    //   return <SignUp navigator={navigator} {...route.passProps}/>
    // }
    // if(route.name == 'Main') {
    //   return <Main navigator={navigator} {...route.passProps}/>
    // }
    // if(route.name == 'OnBoard') {
    //   return <OnBoard navigator={navigator} {...route.passProps}/>
    // }
    return <route.component navigator={navigator} {...route.passProps} />
  }
  configureScene(route, routeStack){
    if(route.type == 'Modal') {
      return Navigator.SceneConfigs.FloatFromBottom
    }
    return Navigator.SceneConfigs.PushFromRight 
  }
  render() {
    return (
      <Navigator
        style={{ flex:1 }}
        configureScene={ this.configureScene }
        initialRoute={{ name: 'Sign In', component: SignIn }}
        renderScene={ this.renderScene }
        navigationBar={
          <Navigator.NavigationBar
            style={styles.nav}
            routeMapper={NavigationBarRouteMapper} />
        }
      />
    )
  }
  
}

//Creation of the Navigation Bar
const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState){
    if(index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => { if (index > 0) { navigator.pop() } }}>
          <Text style={ styles.leftNavButtonText }>Back</Text>
        </TouchableHighlight>
      )
    }
    else { return null};
  },
  RightButton(route, navigator, index, navState) {
    if(route.onPress){
      return (
        <TouchableHighlight
          onPress={ () => route.onPress() }>
          <Text style={ styles.rightNavButtonText }>
              { route.rightText || 'Right Button' }
          </Text>
        </TouchableHighlight>
      )
    }
  },
  Title(route, navigator, index, navState) {
    return <Text style={ styles.title }>MY APP TITLE</Text>
  }
};


class SignIn extends Component {
  toSignUp(name, type='Normal'){
    this.props.navigator.push({
      component: SignUp,
      passProps: {
        name: name
      },
      type: type
    })
  }
  toHome(name, type='Modal'){
    this.props.navigator.replace({
      component: Home,
      passProps: {
        name: name
      },
      type: type
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
        <TouchableHighlight style={styles.button} onPress={() => this.toHome('Main')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.toSignUp('SignUp')}>
          <Text style={styles.link}>Create Account</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class SignUp extends Component {
  toSettings(name, type='Modal'){
    this.props.navigator.resetTo({
      component: Settings,
      passProps: {
        name: name
      },
      type: type
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
        <TouchableHighlight style={ styles.button } onPress={ () => this.toSettings('Settings') }>
          <Text style={ styles.buttonText }>Sign Up</Text>
        </TouchableHighlight>
        <TouchableHighlight style={ styles.button } onPress={ () => this.props.navigator.pop() }>
          <Text style={ styles.buttonText }>Back</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

class Home extends Component {
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

class Settings extends Component {
  toHome(name, type='Modal'){
    this.props.navigator.resetTo({
      component: Home,
      passProps: {
        name: name
      },
      type: type
    })
  }
  render(){
    return(
      <View style={ styles.container }>
        <TouchableHighlight style={ styles.button } >
          <Text style={ styles.buttonText }>Coffee Shops</Text>
        </TouchableHighlight>
        <TouchableHighlight style={ styles.button } >
          <Text style={ styles.buttonText }>Nature</Text>
        </TouchableHighlight>
        <TouchableHighlight style={ styles.button } >
          <Text style={ styles.buttonText }>Wine Bars</Text>
        </TouchableHighlight>
        <TouchableHighlight style={ styles.button } >
          <Text style={ styles.buttonText }>Sports Bars</Text>
        </TouchableHighlight>
        <TouchableHighlight style={ styles.button } >
          <Text style={ styles.buttonText }>Foodie Adventures</Text>
        </TouchableHighlight>
        <TouchableHighlight style={ styles.button } onPress={ () => this.toHome('Home') }>
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
  },
  leftNavButtonText: {
    fontSize: 18,
    marginLeft:13,
    marginTop:2
  },
  rightNavButtonText: {
    fontSize: 18,
    marginRight:13,
    marginTop:2
  },
  nav: {
    height: 60,
    backgroundColor: '#efefef'
  },
  title: {
    marginTop:4,
    fontSize:16
  },
});

AppRegistry.registerComponent('roam', () => roam);
