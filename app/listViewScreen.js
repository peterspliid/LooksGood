import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  ListView,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class ListViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    fetch('http://lookscool.herokuapp.com/api/restaurants')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        restList: ds.cloneWithRows(responseJson),
        isLoading: false,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  renderRest(rest, sectionID, rowID) {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Restaurant', {rest: rest})}>
        <View style={styles.listItem}>
          <Text>{rest.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <ListView
        dataSource={this.state.restList}
        renderRow={(rest, sectionID, rowID) => this.renderRest(rest, sectionID, rowID)}
        contentContainerStyle={styles.list}/>
    );
  }
}

const styles = StyleSheet.create({
  rest: {
    flex: 1,
    padding: 5,
  },
  listItem: {
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  }
});