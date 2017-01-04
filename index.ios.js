'use strict';


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} from 'react-native';

const SearchPage = require('./SearchPage');
const Realm = require('realm');


//Realm data models are defined by the schema information passed into a Realm during initialization. The schema for an object consists of the object’s name and a set of properties each of which has a name and type as well as the objectType for object and list properties. You can also designate each property to be optional or to have a default value.

const HangSchema = {
  name: 'Hang',
  properties: {
    date: 'string',
    duration: { type: 'int', default: 0 },
  }
};

const HoldSchema = {
  name: 'Hold',
  properties: {
    name: 'string',
    hangs: { type: 'list', objectType: 'Hang' },
    picture: { type: 'data', optional: true }, // optional property
  }
};

// Initialize a Realm with Car and Person models
const hangRealm = new Realm({ schema: [HangSchema, HoldSchema] });


hangRealm.write(() => {
  const smallCrimp = hangRealm.create('Hold', {
    name: 'Small Crimp'
  });

  const hangList = smallCrimp.hangs;

  hangList.push({ date: '1/2/2016', duration: 10 });
  hangList.push({ date: '1/3/2016', duration: 11 });
  hangList.push({ date: '1/4/2016', duration: 11 });
});

  // you can access and set all properties defined in your model
  const smallCrimp = hangRealm.objects('Hold');

  console.log(smallCrimp);


class PropertyFinderApp extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: SearchPage,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
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
