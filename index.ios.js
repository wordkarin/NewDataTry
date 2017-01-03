/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

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

class NewDataTry extends Component {
  render() {
    // let realm = new Realm({
    //  schema: [{name: 'Dog', properties: {name: 'string'}}]
    // });
    //
    // realm.write(() => {
    //   realm.create('Dog', {name: 'Rex'});
    // });
    //
    // console.log(realm.objects('Dog'));

    return (
      <View style={{flex:1}}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Count of Dogs in Realm: {/*realm.objects('Dog').length*/}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('NewDataTry', () => NewDataTry);
