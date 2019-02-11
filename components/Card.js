import React from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
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
    const { question } = this.props;
    const { marginRight, buttonWidth } = this.state;

    return (
      <Animated.View style={{flexDirection: "row", flex: 1}}>
        <TouchableOpacity onPress={this.handleTouch} style={styles.deck}>
          <Text>{question.question}</Text>
          <Text>{question.answer}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default Card;
