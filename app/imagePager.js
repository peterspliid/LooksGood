import React, { Component } from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  Dimensions,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import FullImage from './fullImage';

const dim = Dimensions.get('window');

export default class ImagePagerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
    }
    this.params = this.props.navigation.state.params;
  }

   _keyExtractor = (item, index) => item._id;

  renderImage(item) {
    const image = "http://lookscool.herokuapp.com"+item.item.link
    return (
      <View style={styles.imagebox}>
        <FullImage
          source={image}
        />
      </View>
    );
  }
  _onLayout(event) {
    console.log(this.params.index);
    this.list.scrollToIndex({index: this.params.index, animated: false})
  }
  render() {
    return (
      <View onLayout={(event) => this._onLayout(event)} style={{flex: 1}}>
      <FlatList
        ref={el => this.list = el}
        data={this.params.imgList}
        renderItem={(item) => this.renderImage(item)}
        keyExtractor={this._keyExtractor}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => (
          {length: dim.width, offset: dim.width * index, index}
        )}
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imagebox: {
    flex: 1,
    justifyContent: 'center',
  },
})