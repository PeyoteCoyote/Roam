import React, { Component } from 'react';
import { SegmentedControls } from 'react-native-radio-buttons';
// var Geolocation = require('./Geolocation');
var Confirmation = require('./Confirmation');
var CameraView = require('./CameraView')
var Separator = require('./Helpers/Separator');
import Icon from 'react-native-vector-icons/FontAwesome';
import GridView from 'react-native-grid-view';
var dummyData = require('./data');

var coordinates = {};

import {
  Animated,
  Image,
  Dimensions,
  View,
  Text,
  StyleSheet,
  TextInput,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  MapView
} from 'react-native';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '1 hour',
    };
  }
  handleSelected(choice) {
    this.setState({
      selectedOption: choice
    });
  }

  // handleSettings(){
  //   this.props.navigator.push({
  //     title: 'CameraView',
  //     component: 'CameraView'
  //   });
  // }

  render () {
    return (
      <View>
        <View style={styles.navbarContainer}>

          <View style={styles.navLeft}>
            <TouchableHighlight underlayColor='transparent'>
              <Icon name="sign-out" size={25} color="#fff" />
            </TouchableHighlight>
          </View>

          <View style={styles.navMiddle}>
            <Image style={styles.circleImage} source={{uri: 'https://support.files.wordpress.com/2009/07/pigeony.jpg?w=688'}}/> 
            
          </View>

          <View style={styles.navRight}>
            <View style={styles.refresh}>
            <TouchableHighlight underlayColor='transparent'>
              <Icon name="bars" size={23} color="#fff" />
            </TouchableHighlight>
            </View>
          </View>

        </View>
        <View style={styles.mainContainer}>
          <Image style={styles.backgroundImage}
        source={require('../../imgs/uni.jpg')}>
        <GridView>
          {dummyData.map( user =>
        <Image style={styles.circleImage} source={{uri:user.image}}/>
      )}
        </GridView>
        </Image>

        </View>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex:1,
    width:null,
    height: null,
    padding: 30,
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  header: {
    // marginBottom: 20,
    fontSize: 50,
    fontWeight: "100",
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
    letterSpacing: 3
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 50,
    width: 300,
    flexDirection: 'row',
    backgroundColor: '#ff0066',
    borderRadius:10,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  navbarContainer:{
    backgroundColor:'#8C4DCB',
    paddingTop: deviceHeight/25,
    height: deviceHeight/5,
    flexDirection: 'row',
    // paddingBottom: deviceHeight/80
  },
  navLeft: {
    width: deviceWidth/3,
    // borderWidth: 0.5,
    // borderColor: '#555555',
    justifyContent: 'center',
    paddingLeft: deviceWidth/20,
  },
  navMiddle: {
    width: deviceWidth/3,
    // borderWidth: 0.5,
    // borderColor: '#555555',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  navRight: {
    width: deviceWidth/3,
    // borderWidth: 0.5,
    // borderColor: '#555555',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: deviceWidth/20
    // flexDirection: 'row'
  },
  navTitle: {
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 20,
    fontFamily: 'Avenir',
  },
  backgroundImage: {
    flex:1,
    width:null,
    height: null,
    padding: 30,
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  mainContainer: {
    height: deviceHeight,
    marginTop: -20
  },
  circleImage: {
    height: 100,
    borderRadius: 50,
    width: 100
  }
})



module.exports = User;