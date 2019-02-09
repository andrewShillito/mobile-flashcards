import React from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import DeckHeader from "./DeckHeader";
import { deckStyles as styles } from "../styles";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

class Deck extends React.Component {
  state = {
    marginRight: new Animated.Value(0),
    pannedLeft: false,
  }

  handleTouch = () => {
    let finalVal = 60
    if (this.state.pannedLeft) {
      finalVal = 0;
    }
    Animated.timing(
      this.state.marginRight,
      {
        toValue: finalVal,
        duration: 300,
      }
    ).start(() => this.setState((prevState) => ({ pannedLeft: !prevState.pannedLeft })));
  }
  render() {
    const { deck, onPress } = this.props;
    const marginRight = this.state.marginRight;
    const showButtons = this.state.pannedLeft;

    const rightButtons =
      <Animated.View>
        <TouchableOpacity onPress={() => onPress(deck.title)}>
          <FontAwesome name="info" size={30} color="green"></FontAwesome>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress(deck.title)}>
          <MaterialCommunityIcons name="cards" size={30} color="green"></MaterialCommunityIcons>
        </TouchableOpacity>
      </Animated.View>

    return (
      <Animated.View style={{marginRight: marginRight, flexDirection: "row"}}>
        <TouchableOpacity style={styles.deck} onPress={this.handleTouch}>
          <DeckHeader>{deck.title}</DeckHeader>
          <Text style={styles.text}>{`${deck.questions.length} card${deck.questions.length>1 || deck.questions.length === 0 ? "s" : ""}`}</Text>
        </TouchableOpacity>
        {showButtons
          ? <Animated.View style={{justifyContent: "space-evenly", alignItems: "center"}}>
              <TouchableOpacity onPress={() => onPress(deck.title)}>
                <FontAwesome name="info" size={40} color="green"></FontAwesome>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPress(deck.title)}>
                <MaterialCommunityIcons name="cards" size={40} color="green"></MaterialCommunityIcons>
              </TouchableOpacity>
            </Animated.View>
          : null
      }
      </Animated.View>
    );
  }
}

export default Deck;
