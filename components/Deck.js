import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import DeckHeader from "./DeckHeader";
import { deckStyles as styles } from "../styles";
import Swipeable from "react-native-swipeable";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

class Deck extends React.Component {
  swipeable = null;
  handleUserBeganScrollingParentView() {
    this.swipeable.recenter();
  }
  render() {
    const { deck, onPress } = this.props;

    const rightButtons = [
      <TouchableOpacity onPress={() => onPress(deck.title)}>
        <FontAwesome name="info" size={30} color="green"></FontAwesome>
      </TouchableOpacity>,
      <TouchableOpacity onPress={() => onPress(deck.title)}>
        <MaterialCommunityIcons name="cards" size={30} color="green"></MaterialCommunityIcons>
      </TouchableOpacity>
    ]

    return (
      <Swipeable onRef={ref => this.swipeable = ref} rightButtons={rightButtons}>
        <TouchableOpacity style={styles.deck} onPress={() => onPress(deck.title)}>
          <DeckHeader>{deck.title}</DeckHeader>
          <Text style={styles.text}>{`${deck.questions.length} card${deck.questions.length>1 || deck.questions.length === 0 ? "s" : ""}`}</Text>
        </TouchableOpacity>
      </Swipeable>
    );
  }
}

export default Deck;
