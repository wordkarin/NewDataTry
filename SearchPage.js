'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'london'
    };
  }

  onSearchTextChange(event){
    console.log('>>>onSearchTextChange Called');
    this.setState({ searchString: event.nativeEvent.text });
    console.log(this.state.searchString);
  }

  render() {
    console.log('>>>SearchPage.render')
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for houses (cars?) to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name, postcode or search near you.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchTextChange.bind(this)}
            placeholder='Search via name or postcode' />
            <TouchableHighlight style={styles.button}
                underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>
                Go
              </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.flowRight}>
          <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>
              Location
            </Text>
          </TouchableHighlight>
        </View>
        <Image source={require('./Resources/house.png')} style={styles.image} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    width: 217,
    height: 128
  }
});

module.exports = SearchPage;
