import React from 'react';
import { View, TextInput, Text } from 'react-native';
import styles from "../styles/textInputSecondary";
import { MAX_SHORT_INPUT_LENGTH, BLUE, BLACK } from "../styles/shared";

export default class TextInputSecondary extends React.Component {
  state = {
    borderBottomColor: BLACK,
  }
  toggleColor = () => {
    this.setState((prevState) => ({
      borderBottomColor: prevState.borderBottomColor === BLACK ? BLUE : BLACK,
    }));
  }
  render() {
    const { onChangeText, value, placeholder, label } = this.props;
    const { borderBottomColor } = this.state;

    return (
      <>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.container, { borderBottomColor }]}>
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
      </>
    );
  }
}

// }({ onChangeText, value, placeholder, label }){
