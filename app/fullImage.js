import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

export default class FullImage extends Component {
  constructor() {
    super();

    this.state = {
      width: 100,
      height: 100
    };
  }

  componentDidMount() {
    const containerWidth = Dimensions.get('window').width;
    Image.getSize(this.props.source, (width, height) => {
      this.setState({
        width: containerWidth,
        height: containerWidth * height / width
      });
    });
  }

  _onLayout(event) {
    
  }

  render() {
    return (
      <View onLayout={(event) => this._onLayout(event)}>
        <Image
          source={{uri: this.props.source}}
          style={{
            width: this.state.width,
            height: this.state.height
          }} />
      </View>
    );
  }
}