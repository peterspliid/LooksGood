import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default class MapNavigationBar extends Component {
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.inside}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DrawerOpen')}>
            <Image
              source={require('../img/drawer.png')}
              style={styles.drawer}/>
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder={"Search for a restaurant"}
            underlineColorAndroid={'transparent'}
            returnKeyType={'search'}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inside: {
    height: 25,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    height: 25,
  },
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingLeft: 10,
    height: 40,
    justifyContent: 'center',
  },
  drawer: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});