import React from 'react';
import { Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import DeckHeader from "./DeckHeader";
import { deckStyles as styles } from "../styles";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

class Deck extends React.Component {
  state = {
    marginRight: new Animated.Value(0),
    pannedLeft: false,
    color: "white",
    width: new Animated.Value(Dimensions.get("window").width),
    buttonWidth: new Animated.Value(0),
  }

  handleTouch = () => {
    let marginRight = 60;
    let color = "green";
    let buttonWidth = 40;
    if (this.state.pannedLeft) {
      marginRight = 0;
      color = "white";
      buttonWidth = 0;
      Animated.parallel([
        Animated.timing(this.state.marginRight, {
          toValue: marginRight,
          duration: 300,
        }),
        Animated.timing(this.state.buttonWidth, {
          toValue: buttonWidth,
          duration: 300,
        })
      ]).start(() => {this.setState((prevState) => ({
        pannedLeft: !prevState.pannedLeft,
        color: color,
      }))});
    }
    else {
      this.setState({ color: color });
      Animated.parallel([
        Animated.timing(this.state.marginRight, {
          toValue: marginRight,
          duration: 300,
        }),
        Animated.timing(this.state.buttonWidth, {
          toValue: buttonWidth,
          duration: 300,
        })
      ]).start(() => this.setState((prevState) => ({ pannedLeft: !prevState.pannedLeft })));
    }
  }
  render() {
    const { deck, onPress } = this.props;
    const { marginRight, color, width, buttonWidth } = this.state;
    console.log("Width:", width);

    return (
      <Animated.View style={{flexDirection: "row", flex: 1, marginRight: marginRight, minWidth: this.state.width}}>
        <TouchableOpacity style={styles.deck} onPress={this.handleTouch}>
          <DeckHeader>{deck.title}</DeckHeader>
          <Text style={styles.text}>{`${deck.questions.length} card${deck.questions.length>1 || deck.questions.length === 0 ? "s" : ""}`}</Text>
        </TouchableOpacity>
        <Animated.View style={{justifyContent: "space-evenly", alignItems: "center", width: buttonWidth}}>
          <TouchableOpacity onPress={() => onPress(deck.title)}>
            <FontAwesome name="info" size={40} color={color}></FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress(deck.title)}>
            <MaterialCommunityIcons name="cards" size={40} color={color}></MaterialCommunityIcons>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}

export default Deck;
