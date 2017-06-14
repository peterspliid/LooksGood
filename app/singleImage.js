import React, { Component } from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';
import ImageZoom from 'react-native-image-pan-zoom';

import {Text,
        View,
        StyleSheet,
        Dimensions,
        TouchableHighlight,
        Image,
        ActivityIndicator,
        } from 'react-native';

const dim = Dimensions.get('window');

export default class SingleImageScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
      isLoading: true,
    }
    this.params = this.props.navigation.state.params;
    this.rest = {};
    this.baseURL = "http://lookscool.herokuapp.com";
    this.image = this.baseURL + this.props.navigation.state.params.image.link;
  }

  getRestaurantData(restaurantList) {
    _id = this.params.image.name_ID;
    restaurantList.forEach((rest) => {
      if (rest._id == _id) {
        this.rest = rest;
      }
    });
  }

  componentDidMount() {
    Image.getSize(this.image, (srcWidth, srcHeight) => {
      const maxHeight = dim.height;
      const maxWidth = dim.width;

      const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
      this.setState({ width: srcWidth * ratio, height: srcHeight * ratio });
    }, error => {
      console.log('error:', error);
    });

    fetch('http://lookscool.herokuapp.com/api/restaurants')
    .then((response) => response.json())
    .then((responseJson) => this.getRestaurantData(responseJson))
    .then(() => this.setState({isLoading: false}))
    .catch((error) => {
      console.error(error);
    });
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.image.link,
  });
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
        <View>
          <View style={styles.imageBox}>
            <ImageZoom
              cropWidth={dim.width}
              cropHeight={dim.height}
              imageWidth={this.state.width}
              imageHeight={this.state.height}>
            <Image
              ref={el => this.img = el}
              source={{uri: this.image}}
              style={styles.img}/>
            </ImageZoom>
          </View>
          <View style={styles.buttons}>
            <View style={styles.button}>
              <TouchableHighlight
                onPress={() => this.props.navigation.navigate('MapSingle', {rest: this.rest})}
                style={styles.touchableButton}>
                  <Text style={styles.buttonText}>Find on map</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.button}>
              <TouchableHighlight
                onPress={() => this.props.navigation.navigate('Restaurant', {rest: this.rest})}
                style={styles.touchableButton}>
                  <Text style={styles.buttonText}>Open restaurant</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    flex: 1
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 30,
  },
  button: {
    flex: 1,
    borderBottomColor: 'darkgray',
    borderBottomWidth: 1,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  touchableButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  buttonText: {
    alignItems: 'center',
  },
  imageBox: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
})