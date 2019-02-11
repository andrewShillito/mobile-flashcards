import React from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import DeckHeader from "./DeckHeader";
import { deckStyles as styles } from "../styles";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

class Card extends React.Component {
  state = {
    marginRight: new Animated.Value(0),
    buttonWidth: new Animated.Value(0),
    pannedLeft: false,
  }

  handleTouch = () => {
    if (this.state.pannedLeft) {
      this.closeButtons();
    } else {
      this.openButtons();
    }
  }

  openButtons = () => {
    Animated.parallel([
      Animated.timing(this.state.marginRight, {
        toValue: 20,
        duration: 300,
      }),
      Animated.timing(this.state.buttonWidth, {
        toValue: 40,
        duration: 300,
      })
    ]).start(() => this.setState((prevState) => ({ pannedLeft: !prevState.pannedLeft })));
  }

  closeButtons = () => {
    Animated.parallel([
      Animated.timing(this.state.marginRight, {
        toValue: 0,
        duration: 300,
      }),
      Animated.timing(this.state.buttonWidth, {
        toValue: 0,
        duration: 300,
      })
    ]).start(() => this.setState((prevState) => ({ pannedLeft: !prevState.pannedLeft })));
  }

  render() {
    const { deck } = this.props;
    const { marginRight, buttonWidth } = this.state;

    return (
      <Animated.View style={{flexDirection: "row", flex: 1}}>
        <TouchableOpacity style={styles.deck} onPress={this.handleTouch}>
          <DeckHeader>{deck.title}</DeckHeader>
          <Text style={styles.text}>{`${deck.questions.length} card${deck.questions.length>1 || deck.questions.length === 0 ? "s" : ""}`}</Text>
        </TouchableOpacity>
        <Animated.View style={{justifyContent: "space-between", alignItems: "center", width: buttonWidth, marginRight: marginRight, marginTop: 10}}>
          <TouchableOpacity onPress={() => {
              this.closeButtons();
              }}>
            <FontAwesome name="info" size={40} color="#17a2b8"></FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
              this.closeButtons();
              }}>
            <FontAwesome name="edit" size={40} color="#ffc107"></FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
              this.closeButtons();
              }}>
            <MaterialCommunityIcons name="delete" size={40} color="#28a745"></MaterialCommunityIcons>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}

export default Card;
