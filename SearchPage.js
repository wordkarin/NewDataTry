'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native';

const SearchResults = require('./SearchResults');


function urlForQueryAndPage(key, value, pageNumber) {
  const data = {
    country: 'uk',
    pretty: '1',
    encoding: 'json',
    listing_type: 'buy',
    action: 'search_listings',
    page: pageNumber
  };
  data[key] = value;

  const querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key])).join('&');

  return `http://api.nestoria.co.uk/api?${querystring}`;
}

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'london',
      isLoading: false,
      message: ''
    };
  }

  onSearchTextChange(event) {
    this.setState({ searchString: event.nativeEvent.text });
  }

  onSearchPressed() {
    const query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }

  onLocationPressed() {
    navigator.geolocation.getCurrentPosition(
      location => {
        const search = `${location.coords.latitude}, ${location.coords.longitude}`;
        this.setState({ searchString: search });
        const query = urlForQueryAndPage('centre_point', search, 1);
        this._executeQuery(query);
      },
      error => {
        this.setState({
          message: `there was a problem with obtaining your location: ${error}`
        });
      }
    );
  }

  _executeQuery(query) {
    console.log(`>>> ${query}`);
    this.setState({ isLoading: true });

    fetch(query)
      .then(response => response.json())
      .then(json => this._handleReponse(json.response))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: `Something bad happened ${error}` }));
  }

  _handleReponse(response) {
    this.setState({ isLoading: false, message: '' });
    if (response.application_response_code.substr(0, 1) === '1') {
      // console.log('Properties found: ' + response.listings.length);
      this.props.navigator.push({
        title: 'Results',
        component: SearchResults,
        passProps: { listings: response.listings }
      });
    } else {
      this.setState({ message: 'location not recognized; please try again. ' });
    }
  }


  render() {
    const spinner = this.state.isLoading ? (<ActivityIndicator size='large' />) :
        (<View />);

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
            placeholder='Search via name or postcode'
          />
            <TouchableHighlight
              style={styles.button}
              underlayColor='#99d9f4'
              onPress={this.onSearchPressed.bind(this)}
            >
              <Text style={styles.buttonText}>
                Go
              </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.flowRight}>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onLocationPressed.bind(this)}
          >
            <Text style={styles.buttonText}>
              Location
            </Text>
          </TouchableHighlight>
        </View>
        <Image
          source={require('./Resources/house.png')}
          style={styles.image}
        />
        {spinner}
        <Text style={styles.description}>
          {this.state.message}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
