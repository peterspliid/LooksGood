import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  ListView,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import ImageList from './imageList';


export default class RestaurantScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.rest.name,
  });
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
    this.params = this.props.navigation.state.params;
  }

  componentDidMount() {
    fetch('http://lookscool.herokuapp.com/api/restaurants/images/'+this.params.rest._id)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        imageList: responseJson,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      )
    }
    const rest = this.props.navigation.state.params.rest;
    return (
      <View style={{flex: 1}}>
        <ImageList
          imageList={this.state.imageList}
          navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
})