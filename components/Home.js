import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Deck from "./Deck";

class Home extends React.Component {
  render() {
    return (
      <View>
        <Deck name="Deck 1"/>
      </View>
    );
  }
}

export default Home
