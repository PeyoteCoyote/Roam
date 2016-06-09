import React, { Component } from 'react';
import { SegmentedControls } from 'react-native-radio-buttons';
// var Geolocation = require('./Geolocation');
var Confirmation = require('./Confirmation');
var CameraView = require('./CameraView')
var Separator = require('./Helpers/Separator');
import Icon from 'react-native-vector-icons/FontAwesome';
var dummyData = require('./data');

var coordinates = {};
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


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
  MapView,
  Modal
} from 'react-native';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      selectedOption: '1 hour',
      pictures: dummyData,
      dataSource: ds.cloneWithRows(dummyData),
      navigator: props.navigator
    };
  }
  // handleSelected(choice) {
  //   this.setState({
  //     selectedOption: choice
  //   });
  // }

  goToCamera(){
    var getCamera = require('./CameraView');
    this.props.navigator.push({
      title: CameraView.title,
      component: CameraView,
      passProps: { user: this.state.user}

    });
  }

  render () {
    return (
      <View>
        <View style={styles.navbarContainer}>

          <View style={styles.navLeft}>
            <Image style={styles.circleImage} source={{uri: 'https://support.files.wordpress.com/2009/07/pigeony.jpg?w=688'}}/> 
          </View>

          <View style={styles.navMiddle}>
            <Text style={styles.navTitle}>Hi Jessica</Text>
            
          </View>

          <View style={styles.navRight}>
            <View style={styles.refresh}>
            <TouchableHighlight underlayColor='transparent'>
              <Icon name="camera" onPress={this.goToCamera.bind(this)} size={23} color="#fff" />
            </TouchableHighlight>
            </View>
          </View>

        </View>
        <View style={styles.mainContainer}>
          <Image style={styles.backgroundImage}
          source={require('../../imgs/uni.jpg')}>
          <ListView
            contentContainerStyle={styles.gridList}
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            automaticallyAdjustContentInsets={false}
            // renderRow={(rowData) => this.typeOfList.bind(this, rowData)}
            renderRow={(rowData) => <GridListItem picture={rowData} />}
          />
          </Image>
        </View>
      
      </View>
    );
  }
}

class GridListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: props.picture,
      animationType: 'slide',
      modalVisible: false,
      transparent: true,
      rating: Math.floor(props.picture.likes / (props.picture.likes + props.picture.dislikes) * 100) || 0
    };
  }

  setModalVisible(visible, deleteFlag, picID) {
    this.setState({modalVisible: visible});
  }

  render() {
    
    var modalBackgroundStyle = {backgroundColor: 'rgba(0, 0, 0, 0.5)'};
    var innerContainerTransparentStyle = {backgroundColor: '#fff', padding: 20};

    return (
      <View>
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setModalVisible(false)}}
          >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <View style={styles.modalTitleContainer}>
                <Text
                  style={styles.modalTitle}>
                  {this.state.picture.comment.charAt(0).toUpperCase() + this.state.picture.comment.slice(1)}
                </Text>
              </View>
              <Image 
                source={{uri: this.state.picture.imagelink}}
                style={styles.modalPicture}/>
              <View style={styles.modalInfoContainer}>
              <View style={styles.deletePicContainer}> 
                <TouchableHighlight style={styles.deletePicButton} onPress={this.setModalVisible.bind(this, false)} underlayColor='transparent'>
                  <Text style={styles.deletePicText}>Delete Picture</Text>
                </TouchableHighlight>
              </View>
              </View>
              <View style={styles.modalInfoContainer}>
                <View style={styles.modalInfoBox}>
                  <Text style={styles.statNumbers}>{this.state.rating}%</Text>
                  <Text style={styles.statText}>Approval Rating</Text>
                </View>
                <View style={styles.modalInfoBox}>
                  <Text style={styles.statNumbers}>{this.state.picture.likes}</Text>
                  <Text style={styles.statText}>Likes</Text>
                </View>
              </View>
              <View style={styles.closeContainer}> 
                <TouchableHighlight style={styles.closeButton} onPress={this.setModalVisible.bind(this, false, false)}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.gridListItem}>
          <TouchableHighlight
            onPress={this.setModalVisible.bind(this, true)}>
            <Image 
              source={{uri: this.state.picture.imagelink}}
              style={styles.gridListPicture}
            />
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // backgroundImage: {
  //   flex:1,
  //   width:null,
  //   height: null,
  //   // padding: 30,
  //   // marginTop: 20,
  //   flexDirection: 'column',
  //   justifyContent: 'center'
  // },
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
    // padding: 30,
    // marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  circleImage: {
    height: 80,
    borderRadius: 40,
    width: 80
  },
  mainContainer: {
    height: deviceHeight
  },
  gridList: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // borderBottomColor: '#47315a',
    // borderBottomWidth: 0.5,
    // borderTopColor: '#47315a',
    // borderTopWidth: 0.5,
    marginBottom: 5,
    // height: deviceHeight/2
  },
  gridListItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth/3,
    height: deviceWidth/3,
  },
  gridListPicture: {
    width: deviceWidth/5,
    height: deviceWidth/5,
    borderRadius: deviceWidth/10
    // paddingTop: deviceWidth/20,
    // paddingBottom:deviceWidth/20,
    // paddingLeft: deviceWidth/20,
    // paddingRight: deviceWidth/20
  },
  modalTitle: {
    width: deviceWidth/2,
    textAlign: 'center',
    borderWidth: 0.5,
    paddingTop: deviceHeight/110,
    paddingBottom: deviceHeight/110,
    margin: 5,
    fontSize: 18,
    fontFamily: 'Avenir'
  },
  modalInfoContainer: {
    flexDirection: 'row',
    // borderTopColor: '#47315a',
    // borderTopWidth: 0.5,
    // borderBottomColor: '#47315a',
    // borderBottomWidth: 0.5,
  },
  modalInfoBox: {
    width: deviceWidth/3.3,
    alignItems: 'center',
    borderWidth: 0.5,
    paddingTop: deviceHeight/110,
    paddingBottom: deviceHeight/110,
    margin: 5
  },
  modalPicture: {
    width: deviceWidth/2,
    height: deviceHeight/2
  },
  modalButton: {
    width: deviceWidth/3.3,
    textAlign: 'center',
    borderWidth: 0.5,
    paddingTop: deviceHeight/110,
    paddingBottom: deviceHeight/110,
    margin: 5
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // padding: 10
  },
  innerContainer: {
    borderRadius: 6,
    alignItems: 'center',
    marginLeft: deviceWidth/12,
    marginRight: deviceWidth/12
  },
})



module.exports = User;