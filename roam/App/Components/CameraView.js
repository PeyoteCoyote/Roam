"use strict";

import React, {
  Component,
} from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

// import Camera from 'react-native-camera';
// import ViewPage from './ImageView.ios.js';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

// var icons = {
//   list: 'http://www.iconsdb.com/icons/preview/gray/list-xxl.png',
//   grid: 'http://www.myiconfinder.com/uploads/iconsets/256-256-ed559f9ab4ee6cec08ffde71c58a68af-grid.png',
//   home: 'http://summer.newark.rutgers.edu/wp-content/uploads/2015/02/homeicon.png',
//   camera: 'http://aspenwillows.com/wp-content/uploads/2015/03/cameraicon.png',
//   swipe: 'https://www.one.org/wp-content/plugins/ebola-tracker/images/swipe_icon.png',
//   pressCamera: 'http://www.iconsplace.com/icons/preview/white/switch-camera-256.png',
//   switchCamera: 'http://www.iconsplace.com/icons/preview/white/switch-camera-256.png'
// }

class CameraView extends Component {
 
  constructor(props) {
      super(props);
      this.state = {
        user: props.user,
        username: props.username,
        password: props.password,
        id: props.id, 
        type: Camera.constants.Type.back,
        flag: true
      }
  }
  render() {
      return (
        <View style={styles.container}>

        </View>
      );
  }

  // goImageViewPage() {
  //   this.props.navigator.push({
  //     title: "verify.me",
  //     component: ViewPage,
  //     passProps: {user: this.state.user, username: this.state.username, password: this.state.password, image: this.state.image, id: this.state.id, lastPhoto: this.state.lastPhoto},
  //   })
  // }

  switchCamType() {
    if (this.state.flag) {
      this.setState({
        type: Camera.constants.Type.front,
        flag: false
      });

    } else {
     this.setState({
        type: Camera.constants.Type.back,
        flag: true
      });        
    }
  }

  takePicture() {
    this.camera.capture()
      .then((data) => this.setState({image: data}))
      .catch(err => console.error(err))
      // .then(() => this.goImageViewPage());
      .then(() => console.err('sent image data!'));
  }
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  switchCam: {
    left: deviceWidth/3, 
    top: -deviceHeight/1.4,
  },
  capture: {
    marginBottom: deviceHeight/10
  },
  buttons: {
    flexDirection: 'row'
  },
  home: {
    paddingLeft: deviceWidth/5,
    paddingTop: deviceHeight/15
  },
  info: {
    right: deviceWidth/2.2, 
    top: -deviceHeight/1.48,
  }
});
 
module.exports = CameraView;
