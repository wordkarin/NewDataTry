'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';

class PropertyView extends Component {
  render() {
    const property = this.props.property;
    let stats = `${property.bedroom_number} bed ${property.property_type}`;
    const price = property.price_formatted.split(' ')[0];

    if (property.bathroom_number > 1) {
      stats += `, ${property.bathroom_number} bathrooms`;
    } else if (property.bathroom_number === 1) {
      stats += `, ${property.bathroom_number} bathroom `;
    }


    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: property.img_url }}
        />
        <View style={styles.heading}>
          <Text style={styles.price}>
            {price}
          </Text>
          <Text style={styles.title}>
            {property.title}
          </Text>
          <View style={styles.separator} />
        </View>
        <Text style={styles.description}>
          {stats}
        </Text>
        <Text style={styles.description}>
          {property.summary}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  heading: {
    backgroundColor: '#F8F8F8'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  image: {
    width: 400,
    height: 300
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});

module.exports = PropertyView;
