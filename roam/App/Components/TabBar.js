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

// var key_file = require('../../config.js');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

class MainView extends Component {  
  constructor(props) {
  	super(props)
  	this.state = {
      user: props.user,
      navigator: props.navigator
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
          {this.renderSwipeView()}
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
          {this.renderCameraView()}
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
          {this.renderMapPage()}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Profile"
          selected={this.state.selectedTab === 'user'}
          iconName={'user'}
          iconSize={20}
          onPress={() => {
              this.setState({
                selectedTab: 'user'
              });
          }}>
          {this.renderUserPage()}
        </Icon.TabBarItem>
      </TabBarIOS>
      )
  }

  renderSwipeView() {
    return (
      <SwipeView
        style={styles.container}
        ref='swipeRef'
        user={this.state.user}
        username={this.state.username}
        password={this.state.password}
        id={this.state.id} 
        lastPhoto={this.state.lastPhoto}
        navigator={this.props.navigator}/>
        )
  }

  renderCameraView() {
    return (
      <CameraView
        style={styles.container}
        ref='cameraRef'         
        user={this.state.user}
        username={this.state.username}
        password={this.state.password}
        id={this.state.id} 
        lastPhoto={this.state.lastPhoto}
        navigator={this.props.navigator}/>
        )
  }

  renderMapPage() {
    return (
      <MapViewPage
        style={styles.container}
        ref='mapRef'         
        user={this.state.user}
        username={this.state.username}
        password={this.state.password}
        id={this.state.id} 
        lastPhoto={this.state.lastPhoto}
        userLocation={this.state.userLocation}
        locationDataArray={this.state.locationDataArray}
        navigator={this.props.navigator}/>
        )
  }

  renderUserPage() {
    return (
      <UserPage
        style={styles.container}
        ref='userRef'         
        user={this.state.user}
        username={this.state.username}
        password={this.state.password}
        id={this.state.id} 
        lastPhoto={this.state.lastPhoto}
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
module.exports = MainView;