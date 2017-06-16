import React, { Component } from 'react';

import {
  StyleSheet,
  Image,
  ListView,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

const { width, height } = Dimensions.get('window');
const imgWidth = width/3-4;

export default class ImageList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = ({
      imageList: ds.cloneWithRows(this.props.imageList)
    });
  }

  renderImage(image, sectionID, rowID) {
  return(
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('ImagePager', {imgList: this.props.imageList, index: rowID})}>
      <Image
        source={{uri: "http://lookscool.herokuapp.com"+image.link}}
        style={styles.img}/>
    </TouchableOpacity>
  );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.imageList}
        renderRow={(image, sectionID, rowID) => this.renderImage(image, sectionID, rowID)}
        contentContainerStyle={styles.list}/>
    )
  }
}

const styles = StyleSheet.create({
  img: {
    width: imgWidth,
    height: 100,
    marginRight: 2,
    marginLeft: 2,
    marginTop: 4,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})