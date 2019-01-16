import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DeckHeader from "./DeckHeader";
import { deckStyles } from "../styles";

class Deck extends React.Component {
  render() {
    const { deck } = this.props;
    return (
      <TouchableOpacity style={deckStyles.deck}>
        <DeckHeader>{deck.title}</DeckHeader>
      </TouchableOpacity>
    );
  }
}

export default Deck;
