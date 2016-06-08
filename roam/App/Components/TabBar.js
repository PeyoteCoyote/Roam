import React, {
  Component,
} from 'react';

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NavigatorIOS,
  TabBarIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Time from './Time.js'

// var key_file = require('../../config.js');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

class TabBar extends Component {  
  constructor(props) {
  	super(props)
  	this.state = {
      user: props.user,
      navigator: props.navigator,
      selectedTab: 'home'
  	}
  }

  render() {
    return (
      <TabBarIOS>
        <Icon.TabBarItem
          title='User'
          selected={this.state.selectedTab === 'home'}
          iconName={'user'}
          iconSize={25}
          onPress={() => {
              this.setState({
                selectedTab: 'home'
              });
          }}>
          {this.renderUserPage()}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Chat"
          selected={this.state.selectedTab === 'camera'}
          iconName={'group'}
          iconSize={20}
          onPress={() => {
              this.setState({
                selectedTab: 'camera'
              });
          }}>
          {this.renderRoamView()}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Roam"
          selected={this.state.selectedTab === 'map'}
          iconName={'map'}
          iconSize={20}
          onPress={() => {
              this.setState({
                selectedTab: 'map'
              });
          }}>
          {this.renderDummyView()}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Uber"
          selected={this.state.selectedTab === 'uber'}
          iconName={'cab'}
          iconSize={20}
          onPress={() => {
              this.setState({
                selectedTab: 'uber'
              });
          }}>
          {this.renderUberView()}
        </Icon.TabBarItem>
      </TabBarIOS>
      )
  }

  renderUserPage() {
    return (
      <Time
        style={styles.container}
        ref='swipeRef'
        user={this.state.user}
        navigator={this.props.navigator}/>
        )
  }

  renderRoamView() {
    return (
      <Time
        style={styles.container}
        ref='cameraRef'         
        user={this.state.user}
        navigator={this.props.navigator}/>
        )
  }

  renderDummyView() {
    return (
      <Time
        style={styles.container}
        ref='mapRef'         
        user={this.state.user}
        navigator={this.props.navigator}/>
        )
  }
  renderUberView() {
    return (
      <Time
        style={styles.container}
        ref='uberRef'         
        user={this.state.user}
        navigator={this.props.navigator}/>
        )
  }
}

var styles = StyleSheet.create({
	container: {
		height: deviceHeight,
		width: deviceWidth
	}
});
module.exports = TabBar;