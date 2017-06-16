import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import ImageCarousel from './imageCarousel';
import MapNavigationBar from './mapNavigationBar';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 55.661131;
const LONGITUDE = 12.592057;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const screen = Dimensions.get('window');

class MapScreen extends Component {

  constructor(props, {navigation}) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      isLoading: true,
      restaurantList: [],
    }
    this.markers = [];
    console.log(this.props);
  }


  componentDidMount() {
    fetch('http://lookscool.herokuapp.com/api/restaurants')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        restaurantList: responseJson,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  tester() {
    console.log(this.map.props.children[0][0]);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      )
    }
    // Hard-coded icecream place
    var icecream = {
      _id: '1',
      name: 'Ice Cream',
    };
    this.markers = [];
    return (
      <View style={{flex: 1}}>
        <View style={styles.layout}>
        <MapView
          ref={ref => { this.map = ref; }}
          initialRegion={this.state.region}
          onRegionChange={this.onRegionChange}
          style={styles.map}
        >
        {this.state.restaurantList.map(restaurant =>
          <MapView.Marker
            ref={el => this.markers[restaurant._id] = el}
            key={restaurant._id}
            title={restaurant.name}
            identifier={restaurant._id}
            coordinate={{
              latitude: restaurant.coordinates.x,
              longitude: restaurant.coordinates.y,
            }}
            onPress={() => this.props.navigation.navigate('Restaurant', {rest: restaurant})}
            image={require('../img/restaurant-icon.png')}
            style={styles.icon}
          />
        )}
        <MapView.Marker
          coordinate={{
            latitude: 55.660418,
            longitude: 12.591845,
          }}
          image={require('../img/icecream-icon.png')}
          onPress={() => this.props.navigation.navigate('Restaurant', {rest: icecream})} >
        </MapView.Marker>
        </MapView>
        <ImageCarousel
          style={styles.carousel}
          navigation={this.props.navigation}
          restList={this.state.restaurantList}
        />
      </View>
      <View style={styles.navBar}>
      <MapNavigationBar
        navigation={this.props.navigation}/>
      </View>
    </View>
    );
  }
}


const styles = StyleSheet.create({
  navBar: {
    top: 20,
    marginLeft: 20,
    marginRight: 20,
    width: width-40,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'absolute',
  },
  carousel: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  topbar: {
    height: 45,
    backgroundColor: 'red',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  layout: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default MapScreen;