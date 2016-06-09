import React, {
  Component,
} from 'react';

import {
  AlertIOS,
  Dimensions,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  SegmentedControlIOS,
  Modal,
  TouchableHighlight,
  ScrollView,
  RefreshControl
} from 'react-native';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

// var user = {
//   name: 'Jessica Jones',
//   username: 'jjones',
//   password: 'jjones',
//   location: 'San Francisco',
//   age: 40,
//   profileImageLink: 'http://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png'
// };

// var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class UserPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      roamData: null,
      selectedIndex: 0,
      loaded: false,
      refreshing: false,
      navigator: props.navigator
    }
  }

  componentDidMount() {
    this.getRoamHistory();
  }
  
  // goToSettings() {
  //   this.state.navigator.popToTop();
  // }

  getRoamHistory() {
    const sendInfo = {
        username: this.state.user.username,
        pagename: 'UserPage'
    };

    fetch('http://localhost:3000/getHistory', //add this route to server later
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendInfo)
    }) 
    .then((err, res) => {
      if(err) { 
        throw err; 
        console.error('cant get roam history')
      } else {
        this.setState({
          roamData: JSON.parse(res._bodyInit);
          loaded: true
        });
      }

    })
  }

  onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  }

  renderLoadingView() {
    return (
      <View>
        <LoadingView />
      </View>
    );
  }

  _onRefresh() {
    this.setState({refreshing: true});

    const sendInfo = {
        username: this.state.user.username,
        pagename: 'UserPage'
    };

    fetch('http://localhost:3000/getHistory', //add this route to server later
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendInfo)
    }) 
    .then((err, res) => {
      if(err) { 
        throw err; 
        console.error('cant get roam history')
      } else {
        this.setState({
          roamData: JSON.parse(res._bodyInit);
          loaded: true
        });
      }

    })
    .then(() => this.setState({refreshing: false}));
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    } else { 
      return (
        <View>
            <View style={styles.navbarContainer}>
              <View style={styles.navLeft}>
                <TouchableHighlight onPress={this.goToSettings.bind(this)} underlayColor='transparent'>
                  <Icon name="sign-out" size={25} color="#fff" />
                </TouchableHighlight>
              </View>
              <View style={styles.navMiddle}>
                <Text style={styles.navTitle}>Slant</Text>
              </View>
              <View style={styles.navRight}>
                <View>
                  <NewUserInstructionModal style={styles.info} header={'User Profile Page'} content={'\nThe user profile page provides a hub for photo statistics and a photo album.\n\nTap on a photo to view what the community thought of your photo.\n\nIn the same photo pop-up, tapping the \'delete picture\' button will permanently remove the photo from our database and your album.\n\nProfile information can be editted by tapping on the \'edit profile\' button beneath your nameplate!\n\nTap the refresh icon in the top left or drag your album downward to reload your album!'}/>
                </View>
                <View style={styles.refresh}>
                <TouchableHighlight onPress={this._onRefresh.bind(this)} underlayColor='transparent'>
                  <Icon name="refresh" size={23} color="#fff" />
                </TouchableHighlight>
                </View>
              </View>
            </View>
            <UserInfo user={this.state.user} navigator={this.state.navigator} />
            <UserStats user={this.state.user} totals={ {photos: this.state.totalPhotos, rating: this.state.totalRating, likes: this.state.totalLikes}}/>
            <View style={styles.segmentedControl}>
              <View style={styles.progressContainer}>
                <ProgressBar
                  style={styles.progress}  
                  progress={this.state.totalRating/100}
                  color={"#4FB948"}
                  borderColor={"#007696"}
                />
              </View>
            </View>
            <View style={styles.mainContainer}>
              <ListView
                  refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                  />
                }
                contentContainerStyle={styles.gridList}
                dataSource={this.state.dataSource}
                enableEmptySections={true}
                automaticallyAdjustContentInsets={false}
                // renderRow={(rowData) => this.typeOfList.bind(this, rowData)}
                renderRow={(rowData) => <GridListItem reference={this} picture={rowData} />}
              />
          </View>
        </View>
      )
    }
  }
}

// class UserInfo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: props.user,
//       navigator: props.navigator
//     };
//   }

//   goEditProfile() {
//     this.props.navigator.push({
//       title: "edit.me",
//       component: EditProfileView,
//       passProps: {user: this.state.user},
//     })
//   }

//   render() {
//     return (
//       <View style={styles.userInfo}>
//         <View style={styles.userPictureContainer}>
//           <Image 
//             source={{uri: this.state.user.profileImageLink}}
//             style={styles.userPicture}
//           />
//         </View>
//         <View style={styles.userInfoRight}>
//           <Text style={styles.userName}>{this.state.user.name}</Text>
//           <Text style={styles.userLocationAge}>{this.state.user.location} | {this.state.user.age}</Text>
//           <View style={styles.userEditOuter}> 
//             <TouchableHighlight style={styles.userEditContainer} onPress={this.goEditProfile.bind(this)}>
//               <Text style={styles.userEdit}>Edit Profile</Text>
//             </TouchableHighlight>
//           </View>
//         </View>
//       </View>
//     )
//   }
// }


var styles = StyleSheet.create({

});

module.exports = UserPage;

