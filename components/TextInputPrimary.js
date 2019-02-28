import React from 'react';
import { View, TextInput } from 'react-native';
import styles from "../styles/textInputPrimary";
import { MAX_SHORT_INPUT_LENGTH, BLUE, BLACK, PINK } from "../styles/shared";

export default class TextInputPrimary extends React.Component {
  state = {
    borderBottomColor: BLACK,
  }
  toggleColor = () => {
    this.setState((prevState) => ({
      borderBottomColor: prevState.borderBottomColor === BLACK ? BLUE : BLACK,
    }));
  }
  render() {
    const { onChangeText, value, placeholder } = this.props;
    const { borderBottomColor } = this.state;
    return (
      <View style={[styles.container, { borderBottomColor, }]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={(title) => onChangeText(title)}
          value={value}
          maxLength={MAX_SHORT_INPUT_LENGTH}
          selectionColor={BLUE}
          onFocus={this.toggleColor}
          onBlur={this.toggleColor}
          />
      </View>
    );
  }
}
