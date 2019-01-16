import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DeckHeader from "./DeckHeader";

class Deck extends React.Component {
  render() {
    return (
      <TouchableOpacity>
        <DeckHeader name="React" />
      </TouchableOpacity>
    );
  }
}

export default Deck;
