import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  ActivityIndicator,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import ImageThumbnail from './imageThumbnail';

export default class ImageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      offset: 0,
    }
    this.scrollX = 0;
    this.offset = new Animated.Value(0);
    this.scrollTo = this.scrollTo.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.pressin = this.pressin.bind(this);
    this.pressout = this.pressout.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);
    this.offset.addListener(this.scrollTo);
  }

  _scroller() {
    toValue = this.scrollX + 1000;
    this.animation = Animated.timing(
      this.offset,
      {
        toValue: toValue,
        duration: 100000,
        easing: Easing.linear,
      }
    );
    this.animation.start();
  }
  _keyExtractor = (item, index) => item._id + index;

  _renderImage({item}) {
    return (
      <View style={styles.thumbnail}>
        <ImageThumbnail
          navigation={this.props.navigation}
          restList={this.props.restList}
          image={item}
          height={100}
          width={100}/>
      </View>
    );
  }

  _loadMore = () => this.setState({imgList: this.state.imgList.concat(this.state.imgList)});

  componentDidMount() {
    fetch('http://lookscool.herokuapp.com/api/restaurants/allImages')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        imgList: responseJson,
        offset: 0,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View>
        <FlatList
          ref={el => this.carousel = el}
          data={this.state.imgList}
          renderItem={(item) => this._renderImage(item)}
          initialScrollIndex={10}
          horizontal={true}
          keyExtractor={this._keyExtractor}
          showsHorizontalScrollIndicator={false}
          onEndReachedThreshold={0.4}
          onEndReached={this._loadMore}
          onScroll={this.handleScroll}
        />
      </View>
    );
  }
  pressin() {
    console.log("in");
  }
  pressout() {
    console.log("out");
  }
  stopAnimation() {
    this.animation.stop();
  }
  scrollTo(e) {
    console.log(e.value);
    this.carousel.scrollToOffset({offset: e.value});
  }

  handleScroll(event) {
    this.scrollX = event.nativeEvent.contentOffset.x;
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    marginBottom: 10,
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
  }
});