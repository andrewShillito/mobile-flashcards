import React from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import DeckHeader from "./DeckHeader";
import { deckStyles as styles } from "../styles";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

class Deck extends React.Component {
  state = {
    marginRight: new Animated.Value(0),

  }

  handleTouch = () => {
    Animated.timing(
      this.state.marginRight,
      {
        toValue: 20,
        duration: 1000,
      }
    ).start();
  }
  render() {
    const { deck, onPress } = this.props;
    const marginRight = this.state.marginRight;

    const rightButtons =
      <View>
        <TouchableOpacity onPress={() => onPress(deck.title)}>
          <FontAwesome name="info" size={30} color="green"></FontAwesome>
        </TouchableOpacity>,
        <TouchableOpacity onPress={() => onPress(deck.title)}>
          <MaterialCommunityIcons name="cards" size={30} color="green"></MaterialCommunityIcons>
        </TouchableOpacity>
      </View>

    return (
      <Animated.View style={{marginRight: marginRight}}>
        <TouchableOpacity style={styles.deck} onPress={this.handleTouch}>
          <DeckHeader>{deck.title}</DeckHeader>
          <Text style={styles.text}>{`${deck.questions.length} card${deck.questions.length>1 || deck.questions.length === 0 ? "s" : ""}`}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default Deck;
