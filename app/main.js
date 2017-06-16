import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import MapScreen from './map';
import RestaurantScreen from './restaurant';
import SingleImageScreen from './singleImage';
import MapSingleScreen from './mapSingle'
import ImagePagerScreen from './imagePager'
import GridViewScreen from './gridViewScreen';
import ListViewScreen from './listViewScreen';

class MapViewScreen extends Component {

  static navigationOptions = ({
    header: null,
  });

  render() {
    console.log(this.props.navigation);
    return (
      <View style={styles.layout}>
        <MapScreen
        navigation={this.props.navigation}
        test={"test"}/>
      </View>
    );
  }
  openMenu() {
      this.props.navigation.navigate('DrawerOpen');
  }
}

const MapNavigation = DrawerNavigator({
  MapView: {
    screen: MapViewScreen,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../img/map-icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    }
  },
  ListView: {
    screen: ListViewScreen,
    navigationOptions: {
      drawerLabel: 'List',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../img/list-icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    }
  },
  GridView: {
    screen: GridViewScreen,
    navigationOptions: {
      drawerLabel: 'Images',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../img/tiles-icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    }
  },
});


const Main = StackNavigator({
  Home: {
    screen: MapNavigation,
    navigationOptions: {
      header: null,
    }
  },
  Restaurant: {
    screen: RestaurantScreen,
  },
  SingleImage: {
    screen: SingleImageScreen,
  },
  MapSingle: {
    screen: MapSingleScreen,
  },
  ImagePager: {
    screen: ImagePagerScreen,
  },
});

const styles = StyleSheet.create({
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

export default Main;
