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
          title='Home'
          selected={this.state.selectedTab === 'home'}
          iconName={'home'}
          iconSize={25}
          onPress={() => {
              this.setState({
                selectedTab: 'home'
              });
          }}>
          {this.renderUserPage()}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Camera"
          selected={this.state.selectedTab === 'camera'}
          iconName={'camera'}
          iconSize={20}
          onPress={() => {
              this.setState({
                selectedTab: 'camera'
              });
          }}>
          {this.renderRoamView()}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Map"
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
}

var styles = StyleSheet.create({
	container: {
		height: deviceHeight,
		width: deviceWidth
	}
});
module.exports = TabBar;