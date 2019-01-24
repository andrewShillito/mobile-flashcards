import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import DeckHeader from "./DeckHeader";
import { deckStyles as styles } from "../styles";

class Deck extends React.Component {
  render() {
    const { deck, onPress } = this.props;

    return (
      <TouchableOpacity style={styles.deck} onPress={() => onPress(deck.title)}>
        <DeckHeader>{deck.title}</DeckHeader>
        <Text style={styles.text}>{`${deck.questions.length} card${deck.questions.length>1 || deck.questions.length === 0 ? "s" : ""}`}</Text>
      </TouchableOpacity>
    );
  }
}

export default Deck;
