
import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {StackNavigator} from 'react-navigation';
import {
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapSingle extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = {
      region: {
        latitude: this.params.rest.coordinates.x,
        longitude: this.params.rest.coordinates.y,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.rest.name,
  });

  openExternalApp(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }

  openGps = () => {
    var url = "https://www.google.dk/maps/dir//"+this.state.region.latitude+","+this.state.region.longitude;
    this.openExternalApp(url)
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <MapView
        initialRegion={this.state.region}
        style={styles.map}>
        <MapView.Marker
          ref={el => this.marker = el}
          title={this.params.rest.name}
          image={require('../img/restaurant-icon.png')}
          coordinate={{
            latitude: this.params.rest.coordinates.x,
            longitude: this.params.rest.coordinates.y,
          }} />
      </MapView>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => this.openGps()}
          style={styles.bubble}>
          <Text>Get directions</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingVertical: 10,
    borderRadius: 20,
    width: 180,
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 30,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
})