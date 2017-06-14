'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ToolbarAndroid,
} from 'react-native';

export default class MyToolbar extends Component {
  render() {
    var navigator = this.props.navigator;
    return (
      <ToolbarAndroid
        title={this.props.title}
        navIcon={require('../img/menu.png')}
        titleColor={'white'}
        onIconClicked={this.props.sidebarRef}
      />
    );
  }
}