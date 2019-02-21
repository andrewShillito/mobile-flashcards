import React from 'react';
import { View, TextInput } from 'react-native';
import styles from "../styles/textInputPrimary";
import { MAX_SHORT_INPUT_LENGTH, BLUE, BLACK } from "../styles/shared";

export default class TextInputPrimary extends React.Component {
  state = {
    color: BLACK,
  }
  toggleColor = () => {
    this.setState((prevState) => ({
      color: prevState.color === BLACK ? BLUE : BLACK,
    }));
  }
  render() {
    const { onChangeText, value, placeholder } = this.props;
    const color = this.state.color;

    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.input, {borderBottomColor: color}]}
          placeholder={placeholder}
          onChangeText={(title) => onChangeText(title)}
          value={value}
          maxLength={MAX_SHORT_INPUT_LENGTH}
          selectionColor={BLUE}
          onFocus={() => this.toggleColor}
          onEndEditing={() => this.toggleColor}
          />
      </View>
    );
  }
}

// { onChangeText, value, placeholder }
