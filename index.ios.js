'use strict';


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

var SearchPage = require('./SearchPage');
const Realm = require('realm');


// Realm data models are defined by the schema information passed into a Realm during initialization. The schema for an object consists of the object’s name and a set of properties each of which has a name and type as well as the objectType for object and list properties. You can also designate each property to be optional or to have a default value.

const CarSchema = {
  name: 'Car',
  properties: {
    make:  'string',
    model: 'string',
    miles: {type: 'int', default: 0},
  }
};

const PersonSchema = {
  name: 'Person',
  properties: {
    name:     'string',
    birthday: 'date',
    cars:     {type: 'list', objectType: 'Car'},
    picture:  {type: 'data', optional: true}, // optional property
  }
};

// Initialize a Realm with Car and Person models
let carRealm = new Realm({schema: [CarSchema, PersonSchema]});

carRealm.write(() => {
  let car = carRealm.create('Car', {
    make: 'Honda',
    model: 'Civic',
    miles: 750,
  });

  // you can access and set all properties defined in your model
  console.log('>>>>> Car type is ' + car.make + ' ' + car.model);
  console.log('>>>>> Car miles is: ' + car.miles);
  car.miles = 1500;
  console.log('>>>>> Car miles is: ' + car.miles);
});

class PropertyFinderApp extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: SearchPage,
        }}/>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },

  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('NewDataTry', () => PropertyFinderApp);
