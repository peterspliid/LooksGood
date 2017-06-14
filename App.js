import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  ToolbarAndroid,
} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import MapStack from './app/map';
import MenuDrawer from './app/drawer';
import MyToolbar from './app/toolbar';
import FitToCoordinates from './app/test';

class MapViewScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./img/map-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  render() {
    return (
      <View style={styles.layout}>
        <MapStack />
      </View>
    );
  }
  openMenu() {
      this.props.navigation.navigate('DrawerOpen');
  }
}

class ListViewScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'List',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./img/list-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  render() {
    return (
      <FitToCoordinates />
    );
  }
}

const MyApp = DrawerNavigator({
  MapView: {
    screen: MapViewScreen,
  },
  ListView: {
    screen: ListViewScreen,
  },
});

const styles = StyleSheet.create({
  topbar: {
    height: 45,
    backgroundColor: 'red',
  },
  layout: {
    flex: 1,
    height: 500,
  },
  menubutton: {
    height: 45,
    width: 45,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default MyApp;
