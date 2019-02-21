import React from 'react';
import { View, TextInput } from 'react-native';
import styles from "../styles/textInputPrimary";
import { MAX_SHORT_INPUT_LENGTH, BLUE } from "../styles/shared";

export default class TextInputPrimary extends React.Component {
  render() {
    const { onChangeText, value, placeholder } = this.props;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={(title) => onChangeText(title)}
          value={value}
          maxLength={MAX_SHORT_INPUT_LENGTH}
          selectionColor={BLUE}
          />
      </View>
    );
  }
}

// { onChangeText, value, placeholder }
