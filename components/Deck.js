import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DeckHeader from "./DeckHeader";

class Deck extends React.Component {
  render() {
    const deck = this.props;
    return (
      <TouchableOpacity>
        <DeckHeader>{deck.title}</DeckHeader>
      </TouchableOpacity>
    );
  }
}

export default Deck;
