import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import DeckHeader from "./DeckHeader";
import { deckStyles as styles } from "../styles";

class Deck extends React.Component {
  render() {
    const { deck, onPress } = this.props;
    const title = deck ? deck[title] : ""
    return (
      <TouchableOpacity style={styles.deck} onPress={() => onPress(title)}>
        <DeckHeader>{title}</DeckHeader>
      </TouchableOpacity>
    );
  }
}

export default Deck;
