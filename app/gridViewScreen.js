import React, { Component } from 'react';

import {
  StyleSheet,
  Image,
  View,
  ListView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import ImageThumbnail from './imageThumbnail';

const { width, height } = Dimensions.get('window');
const imgWidth = width/3-4;

export default class GridViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      imageList: [],
      loadingImages: true,
      loadingRests: true,
    });
  }

  componentDidMount() {
    fetch('http://lookscool.herokuapp.com/api/restaurants/allImages')
    .then((response) => response.json())
    .then((responseJson) => {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        imgDataList: ds.cloneWithRows(responseJson),
        imgList: responseJson,
        loadingImages: false,
      });
    })
    .catch((error) => {
      console.error(error);
    });

    fetch('http://lookscool.herokuapp.com/api/restaurants')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        restList: responseJson,
        loadingRests: false,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  renderImage(image, sectionID, rowID) {
    console.log(this.state.restList);
    return(
      <View style={styles.thumbnail}>
        <ImageThumbnail
          navigation={this.props.navigation}
          restList={this.state.restList}
          image={image}
          height={imgWidth}
          width={imgWidth}/>
      </View>
    );
  }

  render() {
    if (this.state.loadingImages || this.state.loadingRests) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <ListView
        dataSource={this.state.imgDataList}
        renderRow={(image, sectionID, rowID) => this.renderImage(image, sectionID, rowID)}
        contentContainerStyle={styles.list}/>
    )
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    marginRight: 2,
    marginLeft: 2,
    marginTop: 4,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})