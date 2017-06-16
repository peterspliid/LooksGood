import React, { Component } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class ImageThumbnail extends Component {
  constructor(props) {
    super(props);
    this.restName = '';
    this.props.restList.forEach((rest) => {
      if (this.props.image.name_ID == rest._id)
        this.restName = rest.name;
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={() => (this.props.navigation.navigate('SingleImage', {image: this.props.image, restName: this.restName}))} >
        <Image
          source={{uri: "http://lookscool.herokuapp.com"+this.props.image.link}}
          style={{width: this.props.width, height: this.props.height}}
        />
      </TouchableOpacity>
    );
  }
}