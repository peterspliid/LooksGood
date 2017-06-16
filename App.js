import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { Constants } from 'exponent';
import Main from './app/main';

export default class LooksGood extends Component {

  render() {
    return (
      <View style={{flex: 1, marginTop: Constants.statusBarHeight}}>
        <Main />
      </View>
    );
  }
}